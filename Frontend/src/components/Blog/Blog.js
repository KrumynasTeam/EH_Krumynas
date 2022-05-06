import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class Blog extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = { blogId: props.match.params.id, blog: null, loading: true };
  }

  componentDidMount() {
    this.fetchBlog();
  }

  toShortDateString = (date) => {
    return new Date(date).toLocaleDateString('lt-LT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
  }

  renderBlog = (blog) =>
  {
    return(
      <div>
        <h1>{blog.title}</h1>
        <h4>{this.toShortDateString(blog.createdAt)}</h4>
        <p>{blog.content}</p>
        <Link to="/blogs"><Button>Back to blogs</Button></Link>
      </div>
    )
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderBlog(this.state.blog);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async fetchBlog() {
    const response = await fetch(process.env.REACT_APP_API_URL + 'Blog/' + this.state.blogId);
    const data = await response.json();
    this.setState({ blog: data, loading: false });
    console.log(data)
  }
}
