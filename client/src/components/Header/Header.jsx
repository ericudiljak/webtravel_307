import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import './header.css';
import { useNavigate } from "react-router-dom";

const nav__links = [
  {
    path: '/travel',
    display: 'TravelTales'
  },
  {
    path: '/travel',
    display: 'Home',
  },
  {
    path: '/trips',
    display: 'Trips',
  },
  {
    path: '/booked',
    display: 'Booked',
    role: 'user', 
  },
  {
    path: '/admin',
    display: 'Admin',
    role: 'admin', 
  }
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };

    window.addEventListener('scroll', stickyHeaderFunc);
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex">
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => {
                  if (item.role && (!currentUser || currentUser.role !== item.role)) {
                    // If the link has a role and the user does not match the role, skip rendering the link
                    return null;
                  }
                  return (
                    <li className="nav__item" key={index}>
                      <NavLink 
                        to={item.path}
                        className={({ isActive }) => isActive ? 'active__link' : ""}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
              {currentUser ? (
                <div className="user-info d-flex align-items-center gap-2">
                  <span>{currentUser.username}</span>
                  <Button className="btn primary__btn" onClick={handleLogout}>Log out</Button>
                </div>
              ) : (
                <div className="nav__btns d-flex align-items-center gap-4">
                  <Button className="btn secondary__btn">
                    <Link to='/login'>Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to='/register'>Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
