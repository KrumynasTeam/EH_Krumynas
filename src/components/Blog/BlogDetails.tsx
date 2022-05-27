import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { UserContext } from '../contexts/UserContext';
import { Blog } from './BlogsList';

function BlogDetails() {
    const {token} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const {id} = useParams();

    function toShortDateString(date : Date)
    {
        return new Date(date).toLocaleDateString('lt-LT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(process.env.REACT_APP_API_URL + 'Blog/' + id, {
            method: 'GET',
            headers: token != null ? {'Authorization': token} : {}
          });
          const data = await response.json();
    
          setBlog(data.result as Blog);
          setIsLoading(false);
        }
    
        setIsLoading(true);
        fetchData();
      },[])

    if(isLoading){
      return(
        <div className='spinner-container d-flex justify-content-center'>
          <div className="spinner-border text-success mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    }

    return  (
      <div className="center-text" style={{minWidth: '400px'}}>
            <div id="userSettingsForm">
                <div className="container">
                    <div className="user-row row">
                        <div className="leftPanel col-12 col-lg-12 panelBox" style={{height: '100%'}}>
                          <h1>{blog.title}</h1>
                          <h4>{toShortDateString(blog.createdAt)}</h4>
                          <img style={{width: '70%', height: '60%'}} src={blog.imageUrl} /><br/><br/>
                          <p>{blog.content}</p>
                          <Link to="/blogs"><button style={{maxWidth:'20rem'}}>Back to blogs</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}

export default BlogDetails