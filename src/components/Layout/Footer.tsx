import React from "react";
import { Link } from "react-router-dom";
import './layout.scss';


export default function Footer() {
  return (
    <footer id="footer" className="footer-container">

        <div className="d-flex justify-content-center">

            <div className="p-2 bd-highlight col-example">
               <hr className="hr-4" />
                <ul className="list-unstyled">
                  <li>Contact</li>
                  <li>email@example.com</li>
                  <li>+370 6123456</li>
                  <li>Adress Street 123, Vilnius, Lithuania</li>
                </ul>
            </div>
           

            <div className="p-2 bd-highlight col-example">
            <hr className="hr-4" />
              <ul className="list-unstyled">
                <li>Links</li>
                <li>
                  <Link to="/" className="footer-link">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/" className="footer-link">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/" className="footer-link">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            

            <div className="d-flex justify-content-end">
              <div id="button" className="align-self-center p-2 bd-highlight col-example">
                    <button type="button" className="btn btn-secondaryy mt-4 mt-md-2 ml-1">
                      GoogleMaps
                    </button>
              </div>
            </div>

        </div>

    </footer>
  );
}