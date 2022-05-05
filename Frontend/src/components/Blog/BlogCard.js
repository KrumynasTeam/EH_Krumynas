import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardFooter } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'


function BlogCard({blog}) {

    function toShortDateString(date){
        return new Date(date).toLocaleDateString('lt-LT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
      }

    return <MDBCard style={{ maxWidth: '22rem', marginTop: '1rem', marginRight: '1rem'}}>
    <MDBCardBody>
        <MDBCardTitle>{blog.title}</MDBCardTitle>
        <MDBCardText>
            {blog.content.substring(0, 100)}...
        </MDBCardText>
        <Link to={`/blog/${blog.id}`}>
            <MDBBtn>Read more</MDBBtn>
        </Link>
        </MDBCardBody>
        <MDBCardFooter className='text-muted'>{toShortDateString(blog.createdAt)}</MDBCardFooter>
    </MDBCard>;
}

export default BlogCard