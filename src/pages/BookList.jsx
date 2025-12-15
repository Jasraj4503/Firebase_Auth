import { useEffect } from "react";
import { FaBook, FaPen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { deleteBook, viewBook } from "../features/bookSlice";
import { NavLink } from "react-router-dom";
import "../assets/css/card.css"


const BookList = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewBook())
  }, [dispatch])

  const { bookList } = useSelector(state => state)
  console.log(bookList)

  function trash(id) {
    // alert(id)
    if (confirm("do you want to delete this book?")) {
      dispatch(deleteBook(id))
    }
  }

  return (
    <>
      <div className="container my-5">

        {/* Header */}
        <div className="mb-4">
          <h3 className="fw-bold d-flex align-items-center gap-2">
            <FaBook className="text-primary" />
            Book Collection
          </h3>
          <p className="text-muted mb-0">
            {bookList.length} books available
          </p>
        </div>

        {/* Empty State */}
        {bookList.length === 0 ? (
          <div className="text-center py-5">
            <FaBook size={48} className="text-secondary mb-3" />
            <h5>No books yet</h5>
            <p className="text-muted">Add your first book to get started</p>
          </div>
        ) : (

          <div className="row g-4">
            {bookList.map((book) => (
              <div className="col-lg-4 col-md-6" key={book.id}>
                <div className="feature-card position-relative h-100">

                  {/* Floating Actions */}
                  <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                    <NavLink
                      to={`/updateBook/${book.id}`}
                      className="btn btn-sm btn-light shadow"
                    >
                      <FaPen />
                    </NavLink>
                    <button
                      onClick={() => trash(book.id)}
                      className="btn btn-sm btn-light shadow text-danger"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="card-body p-4">
                    <span className="badge rounded-pill bg-primary mb-2">
                      {book.category}
                    </span>

                    <h4 className="fw-bold mt-2">{book.title}</h4>

                    <p className="text-muted mt-3">
                      {book.description.length > 100
                        ? book.description.substring(0, 100) + "..."
                        : book.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  )
}

export default BookList
