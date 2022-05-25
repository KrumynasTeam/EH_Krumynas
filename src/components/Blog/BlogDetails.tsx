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
        <div style={{background: 'linear-gradient(135deg, rgba(34,193,195,1) 0%,rgba(253,187,45,1) 100%', padding:'2rem', height:'100%'}}>
        <h1>{blog.title}</h1>
        <h4>{toShortDateString(blog.createdAt)}</h4>
        <p>{blog.content}</p>
        <img src={blog.imageUrl} /><br/><br/>
        <Link to="/blogs"><Button>Back to blogs</Button></Link>
    </div>
)
}

export default BlogDetails