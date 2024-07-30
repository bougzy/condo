import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function BasicExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!token); // Set the state based on whether a token exists
    setUserEmail(email || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail('');
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="#home">
          <Link className="navbar-brand" to="/">
            Property Sharing App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ul className="navbar-nav ml-auto">
              {isLoggedIn && userEmail ? (
                <>
                  <li className="nav-item mt-2 fw-bold">
                    <span className="navbar-text text-light">
                      Welcome, {userEmail}
                    </span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/upload">
                      Upload Property
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
