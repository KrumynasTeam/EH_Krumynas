import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Blog } from './BlogsList';

function BlogDetails() {
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
          const response = await fetch(process.env.REACT_APP_API_URL + 'Blog/' + id);
          const data = await response.json();
    
          setBlog(data.result as Blog);
          setIsLoading(false);
        }
    
        setIsLoading(true);
        fetchData();
      },[])

    if(isLoading){
        return <div>Loading...</div>
    }

    return  (
                <div style={{margin: '2rem'}}>
                    <h1>{blog.title}</h1>
                    <h4>{toShortDateString(blog.createdAt)}</h4>
                    <p>{blog.content}</p>
                    <Link to="/blogs"><Button>Back to blogs</Button></Link>
                </div>
            )
}

export default BlogDetails