import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
// import './Navbar.css';

 const Navbar = () => {
  const { isLoggedIn } = useAuth();
  console.log('login or not', isLoggedIn);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink to="/" className="navbar-brand">
            ThapaTechnical
          </NavLink>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className="nav-link" activeclassname="active">
                Category
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/admin" className="dropdown-item" activeclassname="active">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/logout" className="dropdown-item" activeclassname="active">
                      Logout
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings" className="dropdown-item" activeclassname="active">
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/reports" className="dropdown-item" activeclassname="active">
                      Reports
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" activeclassname="active">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" activeclassname="active">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" activeclassname="active">
                Cart (0)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;