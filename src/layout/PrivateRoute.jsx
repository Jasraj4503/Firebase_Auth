import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import auth from "../../firebase"


const PrivateRoute = () => {
    // const [isAuth, setAuth] = useState(null)
    const [isAuth, setAuth] = useState({})
    console.log(isAuth)
    function ShowAuth() {
        onAuthStateChanged(auth, (user) => {
            // console.log(user)
            setAuth(user)
        })
    }
    useEffect(() => {
        ShowAuth()
    }, [])

    // useEffect(() => {
    //     onAuthStateChanged(auth)
    //         .then((user) => setAuth(user))
    //         .catch(err => console.log(err))
    // }, [])

    return isAuth !== null ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
