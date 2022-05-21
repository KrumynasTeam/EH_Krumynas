import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { UserContext } from '../contexts/UserContext';
import BlogCard from './BlogCard';

export type Blog = {
    id: number,
    title: string,
    content: string,
    createdAt: Date
}

function BlogsList() {
    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const {GetRole} = useContext(UserContext);
    const role = GetRole();

    function renderCard (blog : Blog){
        return(
            <BlogCard key={blog.id} blog={blog}/>
        )
    }
  
    function renderBlogsList (blogs : Blog[]){
      return (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
              {blogs.map(renderCard)}
          </div>
          
      );
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(process.env.REACT_APP_API_URL + 'Blog');
          const data = await response.json();
    
          setBlogs(data.result as Blog[]);
          setIsLoading(false);
        }
    
        setIsLoading(true);
        fetchData();
      },[])

    if(isLoading){
        return <div>Loading...</div>
    }

    return  <div style={{margin: '2rem'}}>
                <h1>Our Blogs</h1>
                {role === 1 ? <Link to="createBlog"><Button>Create New</Button></Link> : ''}
                {isLoading ? <div>Loading...</div> : renderBlogsList(blogs)}
            </div>
}

export default BlogsList