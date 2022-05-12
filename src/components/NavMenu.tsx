import React, { useContext, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { UserContext } from './contexts/UserContext';

export const NavMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {Logout, GetToken} = useContext(UserContext);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" light>
        <Container>
          <NavbarBrand tag={Link} to="/">EKrumynas</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!isCollapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/image" onClick={() => setTimeout(() => setIsCollapsed(true), 50)}>Image Upload</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/" onClick={() => setTimeout(() => setIsCollapsed(true), 50)}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/flowers" onClick={() => setTimeout(() => setIsCollapsed(true), 50)}>Flowers</NavLink>
              </NavItem>
              { GetToken() == null ? (
              <>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/login" onClick={() => setTimeout(() => setIsCollapsed(true), 50)}>Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/signup" onClick={() => setTimeout(() => setIsCollapsed(true), 50)}>Sign Up</NavLink>
              </NavItem>
              </>
              ) : (
              <NavItem>
                <NavLink className="text-dark" style={{cursor: 'pointer'}} onClick={() => setTimeout(() => {setIsCollapsed(true); Logout()}, 50)}>Log out</NavLink>
              </NavItem>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
