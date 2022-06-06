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

    const scrollTop = () => window['scrollTo']({ top: 0, behavior: 'smooth' });

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
        })
        .then(() => { navigate("/blogs"); scrollTop(); })
        .catch(err => err);
      }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    return (
        <div className="center-text" style={{minWidth: '400px'}}>
            <div id="userSettingsForm">
                <div className="container">
                    <div className="user-row row">
                        <div className="leftPanel col-12 col-lg-12 panelBox">
                            <h1>Creating a new blog post</h1>
                            <Link to="/blogs"><button onClick={() => scrollTop()} style={{width:'20rem'}}>Back to blogs</button></Link>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="mb-3">
                                    <Label style={{marginLeft: '-30px'}}>Title
                                        <Input style={{width:'35rem'}} type="text" name="title"/>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label style={{marginLeft: '-30px'}}>Content
                                        <Input style={{width:'50rem', height:'20rem'}} type="textarea" name="content"/>
                                    </Label>
                                </FormGroup>
                                <button type="button" style={{width:'20rem'}} onClick={handleOpenModal}>Open Image Upload</button><br/>
                                <UploadImageForm onResponse={setImageUrl} isOpen={showModal} onAction={setShowModal}/>
                                <img src={imageUrl} /><br/>
                                <button style={{width:'10rem', marginTop: '10px'}} type="submit">Save</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog