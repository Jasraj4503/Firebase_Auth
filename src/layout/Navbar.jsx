import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaPlus } from "react-icons/fa";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../firebase";
import { useEffect, useState } from "react";

const Navbar = () => {


  const [isAuth, setAuth] = useState(null)
  const redirect = useNavigate()

  const signup = () => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('userId', result.user.uid)
        alert("signup sucessfully")
        // console.log(result)
        redirect('/')

      })
      .catch(err => console.log(err))
  }

  /////get user login or not
  function ShowAuth() {
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      setAuth(user)
    })
  }
  useEffect(() => {
    ShowAuth()
  }, [auth])


  function logout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('userId')
        alert("user logout")
        redirect('/login')
      })
      .catch(err => console.log(err))
  }

  // console.log(isAuth)


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <FaBook size={22} />
          <span>BookStore</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-center gap-3">

            {isAuth ? (
              <>
                {/* Books */}
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/">
                    Books
                  </Link>
                </li>

                {/* Add Book */}
                <li className="nav-item">
                  <Link
                    to="/addBook"
                    className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-1"
                  >
                    <FaPlus size={14} />
                    Add Book
                  </Link>
                </li>

                {/* Profile Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle p-0"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={isAuth.photoURL}
                      alt="profile"
                      className="rounded-circle border"
                      width="38"
                      height="38"
                    />
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end shadow p-3">
                    <li className="fw-semibold">{isAuth.displayName}</li>
                    <li className="text-muted small">{isAuth.email}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        onClick={logout}
                        className="btn btn-outline-danger btn-sm w-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  onClick={signup}
                  className="btn btn-warning fw-semibold px-3"
                >
                  Sign in with Google
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
