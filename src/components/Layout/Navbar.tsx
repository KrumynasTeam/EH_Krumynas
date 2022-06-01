import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar, Overlay } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {
    const {user, Logout, token} = useContext(UserContext);
    const [isCollapsed, setIsCollapsed] = useState(null);
    const profileAvatarDefaultImage = require('../../assets/profile-avatar-default.png');
    const logoImg = require('../../assets/Logo.png');


    const scrollTop = () => window['scrollTo']({ top: 0, behavior: 'smooth' });
    return (
        <Navbar className="navbar navbar-expand-lg navbar-light navDefault" expanded={isCollapsed} expand="lg" id="navbar">
            <Container id="expandedNavbar">
                <Navbar.Toggle onClick={() => setIsCollapsed(isCollapsed ? false : "expanded")} className="mr-2" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-center mainNav">
                        <Nav.Item id="Logo">
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }}>Home</Nav.Link>
                        </Nav.Item>

                        <Nav.Item id="Logo">
                            <Nav.Link as={Link} to="/flowers" className="nav-link" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }}>Flowers</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="Logo">
                            <Nav.Link as={Link} to="/blogs" className="nav-link" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }}>Blogs</Nav.Link>
                        </Nav.Item>

                        <Nav.Item id="Logo">
                            <Nav.Link as={Link} to="/cart" className="nav-link" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }}>Cart</Nav.Link>
                        </Nav.Item>

                        <Navbar.Brand id="Logo" as={Link} to="/" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }} className="navBrn ">
                            <FontAwesomeIcon icon={faSeedling} className="brnIcon" /> Eh <span className="navHighlight">Krumynas</span>
                        </Navbar.Brand>
                        { user?.role === 1 ?
                            <Nav.Item id="Logo">
                                <Nav.Link as={Link} to="/orders" className="nav-link" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }}>Manage Orders</Nav.Link>
                            </Nav.Item>
                        : <></> }
                        { token == null ? (
                            <>
                            <Nav.Item id="Logo">
                                <Link to="/login"><button className="loginBtn" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100);}}>Login</button></Link>
                            </Nav.Item>
                            <Nav.Item id="Logo">
                                <Link to="/signup"><button className="loginBtn" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100);}}>SignUp</button>
                                </Link></Nav.Item>
                            </>
                        ) : (
                            <>
                            <Nav.Item id="Logo">
                                <Link to={`/${window.location}`} onClick={() => Logout()}><button className="loginBtn" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }}>LogOut</button></Link>
                            </Nav.Item>

                            <Nav.Item id="Logo">
                                <Link to="/account"><button className="loginBtn" onClick={() => { scrollTop(); setTimeout(() => setIsCollapsed(false), 100); }}>MyAccount</button></Link>
                            </Nav.Item>
                            <div id="Logo">
                                <img id="popImg" src={user?.profileImage || profileAvatarDefaultImage}/>
                            </div>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;