import React from "react";

export default function Hero() {
  const executeScroll = () =>
    window.scrollTo({
      top: 928,
      left: 0,
      behavior: "smooth",
    });
  return (
    <section id="hero-section" className="hero-container text-light">
      <div className="container justify-content-center align-items-center">
        <div className="row">
          <div className="col-12 col-md-6 ml-sm-5">
            <div className="h4 mt-md-5">Best Flower shop</div>
            <hr className="hr" />
            <div
              className="h1 mt-md-5 mb-md-4"
              style={{ lineHeight: "1.45em", wordSpacing: "0.1em" }}
            >
              We sell flowers{" "}
              <span style={{ fontWeight: "bold" }}>Flowers and pots</span>
            </div>
            <div className="p mt-3 mb-md-4">
              Something something something.
            </div>
            <button id="heroButton"
              type="button"
              className="btn btn-primaryy mt-4 mt-md-2 mr-3 ml-1"
            >
              Learn More
            </button>
            <button id="heroButton" type="button" className="btn btn-secondaryy mt-4 mt-md-2 ml-1">
              Get Started
            </button>
          </div>
          <div className="d-flex justify-content-end">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={"../assets/download-image-240.png"} alt="Hero Image" width="400rem" />
                </div>
                <div className="carousel-item">
                  <img src={"../assets/download-image-240.png"} alt="Hero Image" width="400rem" />
                </div>
                <div className="carousel-item">
                  <img src={"../assets/download-image-240.png"} alt="Hero Image" width="400rem" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
