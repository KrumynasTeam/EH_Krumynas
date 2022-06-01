import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { UserContext } from '../contexts/UserContext';
import BlogCard from './BlogCard';
import {Scrollbar} from "react-scrollbars-custom"

export type Blog = {
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    imageUrl: string,
    version: number
}

function BlogsList() {
    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const {user, token} = useContext(UserContext);

    function renderCard (blog : Blog){
        return(
            <BlogCard key={blog.id} blog={blog}/>

        )
    }
  
    function renderBlogsList (blogs : Blog[]){
      return (
        <div style={{ display: "flex", justifyContent:'center', flexDirection:'column', textAlign:'left'}}>
          {blogs.map(renderCard)}
        </div>
      );
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(process.env.REACT_APP_API_URL + 'Blog', {
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

    if(isLoading){
      return(
        <div className='spinner-container d-flex justify-content-center'>
          <div className="spinner-border text-success mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    }

    return (
      <div className="center-text">
        <div id="userSettingsForm">
          <div className="container">
            <div className="user-row row">
              <div className="leftPanel col-12 col-lg-12 panelBox">
                <h1 style={{marginTop:'1rem', marginLeft: '-15px'}}>Our Blogs</h1>
                {user?.role === 1 ? <Link to="createBlog"><button style={{width:'10rem'}} className='loginBtn' id='create-blog-button'>Create New</button></Link> : ''}
                {isLoading ? <div>Loading...</div> : renderBlogsList(blogs)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default BlogsList