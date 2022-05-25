import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { UserContext } from '../contexts/UserContext';
import UploadImageForm from '../ImageUploader/ImageUpload';
import { Blog } from './BlogsList';

function EditBlog() {
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate()
    const {token} = useContext(UserContext);
    const {id} = useParams();
    const [blog, setBlog] = useState<Blog>({id: parseInt(id), title: '', content: '', createdAt: null, imageUrl: ''});
    const [showModal, setShowModal] = useState(false)

    function handleSubmit(e){
        e.preventDefault();
    
        fetch(process.env.REACT_APP_API_URL + 'Blog', {
                method: 'PUT',
                body: JSON.stringify(blog),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(() => navigate("/blogs")
            ).catch(err => err);
        }

        function handleTitleChange(event: { target: { value: string; }; }){
            setBlog({...blog, title: event.target.value});
        }

        function handleContentChange(event: { target: { value: string; }; }){
            setBlog({...blog, content: event.target.value});
        }

        const handleOpenModal = () => {
            setShowModal(true)
        }

        const handleImageUpload = (imgUrl) => {
            setBlog({...blog, imageUrl: imgUrl});
        }

        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(process.env.REACT_APP_API_URL + 'Blog/' + id);
                const data = await response.json();
            
                setBlog(data.result as Blog);
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
            <div style={{background: 'linear-gradient(135deg, rgba(34,193,195,1) 0%,rgba(253,187,45,1) 100%', padding:'2rem', height:'100%'}}>
            <h1>Editing blog</h1>
                <Link to="/blogs"><button style={{width:'20rem'}}>Back to blogs</button></Link>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <Label>Title:
                            <Input style={{width:'35rem'}} type="text" name="title" value={blog.title} readOnly={false} onChange={(e) => handleTitleChange(e)}/>
                        </Label>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label>Content:
                            <Input style={{width:'50rem', height:'20rem'}} type="textarea" name="content" value={blog.content} readOnly={false} onChange={(e) => handleContentChange(e)}/>
                        </Label>
                    </FormGroup>
                    <button style={{width:'20rem'}} onClick={handleOpenModal}>Open Image Upload</button><br/><br/>
                    <UploadImageForm onResponse={handleImageUpload} isOpen={showModal} onAction={setShowModal}/>
                    <img src={blog.imageUrl} /><br/><br/>
                    <button style={{width:'10rem'}} type="submit">Save</button>
                </Form>
            </div>
        )
}

export default EditBlog