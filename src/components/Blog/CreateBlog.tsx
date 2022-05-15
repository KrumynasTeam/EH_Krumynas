import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { UserContext } from '../contexts/UserContext';

function CreateBlog() {
    let navigate = useNavigate()
    const {GetToken} = useContext(UserContext);
    const token = GetToken();

    function handleSubmit(e){
        e.preventDefault();
        let blog = {
        title: e.target.title.value,
        content: e.target.content.value
        }
    
        fetch(process.env.REACT_APP_API_URL + 'Blog', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(() => navigate("/blogs")
        ).catch(err => err);
      }


    return (
        <div style={{margin: '2rem'}}>
            <h1>Creating a new blog post</h1>
            <Link to="/blogs"><Button>Back to blogs</Button></Link>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <Label>Title:
                        <Input style={{width:'20rem'}} type="text" name="title"/>
                    </Label>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Content:
                        <Input style={{width:'50rem'}} type="textarea" name="content"/>
                    </Label>
                </FormGroup>
                <Button type="submit">Create</Button>
            </Form>
        </div>
    )
}

export default CreateBlog