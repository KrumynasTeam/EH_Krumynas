import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';

export class Blogs extends Component {

  constructor(props) {
    super(props);
    this.state = { blogs: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  renderCard = (blog) => {
      return(
    <BlogCard blog={blog}/>
      )
  }

  renderBlogsList = (blogs) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {blogs.map(this.renderCard)}
        </div>
        
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderBlogsList(this.state.blogs);

    return (
      <div>
        <h1>Our Blogs</h1>
          <Link to="createBlog"><Button>Create New</Button></Link>
        {contents}
      </div>
    );
  }

  async populateData() {
    const response = await fetch(process.env.REACT_APP_API_URL + 'Blog');
    const data = await response.json();
    this.setState({ blogs: data, loading: false });
  }
}
