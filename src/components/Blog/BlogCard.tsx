import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Blog } from './BlogsList';
import { CardImage, PencilFill, Trash3Fill } from 'react-bootstrap-icons';
import { UserContext } from '../contexts/UserContext';
import { Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle } from 'reactstrap';


function BlogCard({blog} : {blog: Blog}) {
    const {user, token} = useContext(UserContext);

    function toShortDateString(date : Date){
        return new Date(date).toLocaleDateString('lt-LT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
      }
    
    async function handleDeleteClick(blogId : number){
        console.log('in handle delete click')
        await fetch(process.env.REACT_APP_API_URL + 'Blog/' + blogId, {
            method: 'DELETE',
            headers: token != null ? {'Authorization': token} : {}
        });
        window.location.reload();
    }

    return <Card style={{ width: '60rem', marginTop: '1rem', marginRight: '1rem', borderRadius: '20px'}}>
    <CardBody>
        <CardTitle><h3>{blog.title}</h3></CardTitle>
        <CardImg alt="Blog Image"
                src={blog.imageUrl}
                top
                style={{objectFit: 'cover', borderRadius: '10px', marginTop:'5px'}}
                />
        <CardText style={{marginTop:'1rem'}}>
            {blog.content.substring(0, 350)}...
        </CardText>
        <Link to={`/blog/${blog.id}`}>
            <Button>Read more</Button>
        </Link>
        </CardBody>
        <CardFooter className='text-muted' style={{display: 'flex', alignItems: 'center'}}>
                <div style={{fontSize:'24px'}}>
                    {toShortDateString(blog.createdAt)}
                </div>
                {user?.role === 1 ? 
                <div style={{marginLeft: 'auto'}}>
                <button style={{height:'48px', width: '48px', borderRadius: '5px'}}><Trash3Fill onClick={() => handleDeleteClick(blog.id)} /></button>
                <Link to={`/editBlog/${blog.id}`}><button style={{marginInline:'3px', height:'48px', width: '48px', borderRadius: '5px'}}><PencilFill /></button></Link>
                </div> : 
                ''}
        </CardFooter>
    </Card>;
}

export default BlogCard