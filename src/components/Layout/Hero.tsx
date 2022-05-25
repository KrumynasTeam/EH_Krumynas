import React from "react";

export default function Hero() {
  const profileAvatarDefaultImage = require('../../assets/profile-avatar-default.png');
  const executeScroll = () =>
    window.scrollTo({
      top: 928,
      left: 0,
      behavior: "smooth",
    });
  return (
    <div className="center-text">
            <div id="userSettingsForm">
                <div className="container">
                    <div className="hero-row row">
                        <div className="leftPanelHero col-12 col-lg-8 panelBox">
                            <div>
                                <h2 style={{paddingTop: '10px'}}>Blog of the month</h2>
                                
                            </div>
                            <div style={{margin: '50px'}}>
                                <img src={profileAvatarDefaultImage} className="profileImage disabled-link"/>
                            </div>
                            <div style={{padding: '20px'}}>
                              <button className="heroButton">Blog</button>
                              <button className="heroButton">News</button>
                              <button className="heroButton">Flowers</button>
                            </div>
                            
                            <div className="panelBox">
                            </div>  
                        </div>
                            
                        <div className="rightPanelHero col-12 col-lg-4 panelBox">
                            <h2>Short title</h2>
                            <div>Story lksafn lkasng lknldnalk; sdgl;kmld s;kgnl;kls d.akgnm l;kdsna l;mnsdalk;gm</div>
                          
                            <button className="heroButton">Read more</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
  );
}
