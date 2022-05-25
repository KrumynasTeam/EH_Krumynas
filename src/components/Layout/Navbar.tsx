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
    
/*
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        })
    }, [])
    <Navbar.Collapse id="basic-navbar-nav"/>
    */

    const scrollTop = () => {
        setIsCollapsed(false);
        window['scrollTo']({ top: 0, behavior: 'smooth' });
    }
    return (
        <Navbar className='navbar navbar-expand-lg navbar-light navDefault' expanded={isCollapsed} expand="lg">
            <Container id="expandedNavbar">
                <Navbar.Toggle onClick={() => setIsCollapsed(!isCollapsed)} className="mr-2" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-center mainNav" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={scrollTop}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/image" className="nav-link" onClick={scrollTop}>Image Upload</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link as={Link} to="/flowers" className="nav-link" onClick={scrollTop} >Flowers</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/blogs" className="nav-link" onClick={scrollTop} >Blogs</Nav.Link>
                        </Nav.Item>

                        <Navbar.Brand as={Link} to="/" className="navBrn">
                            <FontAwesomeIcon icon={faSeedling} className="brnIcon" /> Eh <span className="navHighlight">Krumynas</span>
                        </Navbar.Brand>

                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={scrollTop} >Cart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={scrollTop} >Language</Nav.Link>
                        </Nav.Item>

                        { token == null ? (
                            <>
                            <Nav.Item>
                            {
                                <Link to="/login">
                                    <button className="loginBtn" onClick={scrollTop}>Login</button>
                                </Link>
                            }
                            </Nav.Item>

                            <Nav.Item>
                            {
                                <Link to="/signup">
                                    <button className="loginBtn" onClick={scrollTop}>Sign Up</button>
                                </Link>
                            }
                            </Nav.Item>
                            </>
                        ) : (
                            <>
                            <Nav.Item>
                            {
                                <Link to={`/${window.location}`} onClick={() => {Logout(); scrollTop()}}>
                                    <button className="loginBtn">Log out</button>
                                </Link>
                            }
                            </Nav.Item>
                            
                            <Nav.Item>
                            {
                                <Link to="/account" onClick={scrollTop}>
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