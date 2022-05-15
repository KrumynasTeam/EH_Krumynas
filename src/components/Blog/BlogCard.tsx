import React, { useContext } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardFooter } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import { Blog } from './BlogsList';
import { Trash3Fill } from 'react-bootstrap-icons';
import { UserContext } from '../contexts/UserContext';


function BlogCard({blog} : {blog: Blog}) {
    const {GetRole, GetToken} = useContext(UserContext);
    const role = GetRole();
    const token = GetToken();

    function toShortDateString(date : Date){
        return new Date(date).toLocaleDateString('lt-LT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
      }
    
    async function handleDeleteClick(blogId : number){
        await fetch(process.env.REACT_APP_API_URL + 'Blog/' + blogId, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        window.location.reload();
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
        <MDBCardFooter className='text-muted'>
            <div>
                {toShortDateString(blog.createdAt)}
                {role === 1 ? 
                <button style={{float: 'right'}}><Trash3Fill onClick={() => handleDeleteClick(blog.id)} /></button> : 
                ''}
            </div>
        </MDBCardFooter>
    </MDBCard>;
}

export default BlogCard