import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedinIn, faGoogle } from '@fortawesome/free-brands-svg-icons'
import FooterCol from './FooterCol';
import './Footer.scss';
import { ourServices, otherLinks} from './FooterData';
import { Link } from 'react-router-dom';
import { scrollUP } from '../ScrollTop';
import { faMapMarkedAlt, faMobileAlt, faMailBulk } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
        <section className='row footer'>
            <div id="footerNew" className="col-md-11 mx-auto">

                <Col md={6} lg={3} className="fAboutUs">
                    <h5>ABOUT US</h5>
                    <span className="animate-border"></span>
                    <p className="aboutUsDes">We offer the best selection of flowers online.</p>
                    <ul className="socialIcons">
                        <li>
                            <Link onClick={scrollUP} to="/" >
                                <FontAwesomeIcon icon={faFacebook}/>
                                </Link>
                        </li>
                        <li>
                            <Link onClick={scrollUP} to="/">
                                <FontAwesomeIcon icon={faInstagram}/>
                                </Link>
                        </li>
                        <li>
                            <Link onClick={scrollUP} to="/">
                                <FontAwesomeIcon icon={faLinkedinIn}/>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={scrollUP} to="/">
                                <FontAwesomeIcon icon={faGoogle}/>
                            </Link>
                        </li>
                    </ul>
                </Col>
                <FooterCol key="3" menuItems={ourServices} title="OUR SERVICES"/>
                <FooterCol key="4" menuItems={otherLinks} title="OTHER LINKS"/>
                <Col >
                <Row className="footer-row">
                    <div className="d-flex fContactInfo fContactInfo3 align-items-center">
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="fContactIcon"/>
                        <a id="link" href = "https://goo.gl/maps/b3kqPtDt8exJUXqC9" target="_blank">
                            <p className="brnName3">Adress Street 123</p>
                            <p>Vilnius, Lithuania</p>
                        </a>
                    </div>
                </Row>
                <Row className="footer-row">
                    <div className="d-flex fContactInfo fContactInfo3 align-items-center">
                        <FontAwesomeIcon icon={faMobileAlt} className="fContactIcon"/>
                        <a>
                            <p className="brnName3">+370 6123456</p>
                        </a>
                    </div>
                </Row>
                <Row className="footer-row">
                    <div className="d-flex fContactInfo fContactInfo3 align-items-center">
                        <FontAwesomeIcon icon={faMailBulk} className="fContactIcon"/>
                        <a>
                            <p className="brnName3">email@example.com</p>
                        </a>
                    </div>
                </Row>
                </Col>
                
                
            </div>
        </section>
    );
};

export default Footer;