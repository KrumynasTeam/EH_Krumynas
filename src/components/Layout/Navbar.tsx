import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {
    const {Logout, token} = useContext(UserContext);
    const [isSticky, setSticky] = useState(true)
    const [isCollapsed, setIsCollapsed] = useState(null);
    

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
        <Navbar className={`navbar navbar-expand-lg navbar-light navDefault`} expanded={isCollapsed} expand="lg">
            <Container id="expandedNavbar">
                <Navbar.Toggle onClick={() => setIsCollapsed(isCollapsed ? false : "expanded")} className="mr-2" />
                <Navbar.Collapse id="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-center mainNav" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/image" className="nav-link" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Image Upload</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link as={Link} to="/flowers" className="nav-link" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Flowers</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/blogs" className="nav-link" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Blogs</Nav.Link>
                        </Nav.Item>

                        <Navbar.Brand as={Link} to="/" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100); }} className="navBrn">
                            <FontAwesomeIcon icon={faSeedling} className="brnIcon" /> Eh <span className="navHighlight">Krumynas</span>
                        </Navbar.Brand>

                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Cart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Language</Nav.Link>
                        </Nav.Item>

                        { token == null ? (
                            <>
                            <Nav.Item>
                            {
                                <Link to="/login">
                                    <button className="loginBtn" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Login</button>
                                </Link>
                            }
                            </Nav.Item>

                            <Nav.Item>
                            {
                                <Link to="/signup">
                                    <button className="loginBtn" onClick={() => setTimeout(() => setIsCollapsed(isCollapsed ? false : "expanded"), 100)}>Sign Up</button>
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