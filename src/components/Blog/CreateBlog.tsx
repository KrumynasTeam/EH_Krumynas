import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { UserContext } from '../contexts/UserContext';
import UploadImageForm from '../ImageUploader/ImageUpload';

function CreateBlog() {
    const {token} = useContext(UserContext);
    let navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    function handleSubmit(e){
        e.preventDefault();
        let blog = {
            title: e.target.title.value,
            content: e.target.content.value,
            imageUrl: imageUrl
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

    const handleOpenModal = () => {
        setShowModal(true)
    }

    return (
        <div style={{background: 'linear-gradient(135deg, rgba(34,193,195,1) 0%,rgba(253,187,45,1) 100%', padding:'2rem', height: '100%'}}>
                <h1>Creating a new blog post</h1>
                <Link to="/blogs"><button style={{width:'20rem'}}>Back to blogs</button></Link>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <Label>Title:
                            <Input style={{width:'35rem'}} type="text" name="title"/>
                        </Label>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label>Content:
                            <Input style={{width:'50rem', height:'20rem'}} type="textarea" name="content"/>
                        </Label>
                    </FormGroup>
                    <button style={{width:'20rem'}} onClick={handleOpenModal}>Open Image Upload</button><br/>
                    <UploadImageForm onResponse={setImageUrl} isOpen={showModal} onAction={setShowModal}/>
                    <img src={imageUrl} /><br/>
                    <button style={{width:'10rem', marginTop: '10px'}} type="submit">Save</button>
                </Form>
            </div>
    )
}

export default CreateBlog