import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../layout/Api";

let userId = localStorage.getItem('userId')
export const addBook = createAsyncThunk('/addBook', async(data)=>{
    try {
        const res = await Api.post('/book',{userId,...data})
        return res.data 
    } catch (error) {
        console.log(error)
    }
})

export const viewBook = createAsyncThunk('/viewBook',async()=>{
    try {
        const res = await Api.get('/book')
        const arr = res.data
        const filterData = arr.filter((ele)=>ele.userId==userId)
        return filterData
    } catch (error) {
        console.log(error)
        
    }
})

export const deleteBook = createAsyncThunk('/deleteBook', async(id)=>{
    // console.log(id)
    const res = await Api.delete(`/book/${id}`)
    return res.data
})

export const updateBook = createAsyncThunk('/updateBook', async(data)=>{
    const {id} = data
    const res = await Api.put(`/book/${id}`, data)
    return res.data
})

const bookSlice = createSlice({
    name:'books',
    initialState:{
        bookList:[],
        taskList: 0
    },

    ///// for local data or localStorage
    reducers:{},

    ///// for api or third party data
    extraReducers: (res)=>{
        res
        .addCase(addBook.fulfilled,(state,action)=>{
            // console.log(action.payload)
            state.bookList.push(action.payload) 
        })
        .addCase(viewBook.fulfilled,(state,action)=>{
            state.bookList = action.payload
        })
        .addCase(deleteBook.fulfilled,(state,action)=>{
            const {id} = action.payload
            const filterData = state.bookList.filter(ele=>ele.id!==id)
            state.bookList = filterData
        })
        .addCase(updateBook.fulfilled,(state,action)=>{
            const {id} = action.payload
            const index = state.bookList.findIndex(book=>book.id==id)
            if(index!=-1){
                state.bookList[index] = action.payload
            }
        })
        
    }
})

export default bookSlice.reducer