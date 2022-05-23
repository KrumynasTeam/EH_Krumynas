import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';
import {NavLink } from 'reactstrap';

const NavBar = () => {
    const {Logout, token} = useContext(UserContext);
    const [isSticky, setSticky] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(true);
    

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        })
    }, [])

    const scrollTop = () => window['scrollTo']({ top: 0, behavior: 'smooth' });
    return (
        <Navbar className={`navbar navbar-expand-lg navbar-light ${isSticky ? "navStyle" : "navDefault"}`} expand="lg">
            <Container id="expandedNavbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-center mainNav" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/image" className="nav-link">Image Upload</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link as={Link} to="/flowers" className="nav-link">Flowers</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/blogs" className="nav-link">Blogs</Nav.Link>
                        </Nav.Item>

                        <Navbar.Brand as={Link} to="/" onClick={scrollTop} className="navBrn">
                            <FontAwesomeIcon icon={faBuffer} className="brnIcon" /> Eh <span className="navHighlight">Krumynas</span>
                        </Navbar.Brand>

                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link">Cart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link">Language</Nav.Link>
                        </Nav.Item>

                        { token == null ? (
                            <>
                            <Nav.Item>
                            {
                                <Link to="/login">
                                    <button className="loginBtn">Login</button>
                                </Link>
                            }
                            </Nav.Item>

                            <Nav.Item>
                            {
                                <Link to="/signup">
                                    <button className="loginBtn">Sign Up</button>
                                </Link>
                            }
                            </Nav.Item>
                            </>
                        ) : (
                            <>
                            <Nav.Item>
                            {
                                <Link to={`/${window.location}`} onClick={() => Logout()}>
                                    <button className="loginBtn">Log out</button>
                                </Link>
                            }
                            </Nav.Item>
                            
                            <Nav.Item>
                            {
                                <Link to="/account">
                                    <button className="loginBtn">My Account</button>
                                </Link>
                            }
                            </Nav.Item>
                            </>
                        )}
                        

                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;