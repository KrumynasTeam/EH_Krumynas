import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../contexts/UserContext';
import { Blog } from '../Blog/BlogsList';
import { Link } from "react-router-dom";

type BlogIndex = {
    index: number;
}

export default function Hero() {
  const profileAvatarDefaultImage = require('../../assets/profile-avatar-default.png');
  const {token} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  var [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + 'Blog/GetNewestBlogs', {
        method: 'GET',
        headers: token != null ? {'Authorization': token} : {}
      });
      const data = await response.json();

      setBlogs(data.result as Blog[]);
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchData();
  },[])
  
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
                                <h2 style={{paddingTop: '10px'}}>Most Recent</h2>
                                
                            </div>
                            <div style={{margin: '35px', backgroundColor: 'rgba(159, 169, 156, 0.442)'}}>
                                <img src={blogs[currentIndex]?.imageUrl} className=" disabled-link"/>
                            </div>
                            <div style={{padding: '20px'}}>
                              <button className="blogButton" onClick={() => setCurrentIndex(currentIndex = 0)}></button>
                              <button className="blogButton" onClick={() => setCurrentIndex(currentIndex = 1)}></button>
                              <button className="blogButton" onClick={() => setCurrentIndex(currentIndex = 2)}></button>
                            </div>
                            
                            <div className="panelBox">
                            </div>  
                        </div>
                            
                        <div className="rightPanelHero col-12 col-lg-4 panelBox">
                            <h2>{blogs[currentIndex]?.title}</h2>
                            <h5>{blogs[currentIndex]?.content}</h5>
                          
                            <Link to={`/blog/${blogs[currentIndex]?.id}`}><button className="heroButton" >Read more</button></Link>
                        </div>
                        
                    </div>
                </div>

              <div></div>

            </div>
        </div>
  );
}
