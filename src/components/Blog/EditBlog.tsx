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
    const [blog, setBlog] = useState<Blog>({id: parseInt(id), title: '', content: '', createdAt: null, imageUrl: '', version: null});
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState(null);
    const defaultConnectionError = "Could not establish connection to the server. Please try again!";

    const UpdateBlog = async (blog) => {
        await fetch(process.env.REACT_APP_API_URL + 'Blog', {
            method: 'PUT',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(response => response.json())
        .then(data => {
            if (data.isError === true) {
                setError(data.error.message);
            } else {
                setError(null);
                navigate("/blogs");
            }
        })
        .catch(err => setError(defaultConnectionError));
    };

    const handleSubmit = (async (event, override) => {
        event.preventDefault();

        let _blog = blog;
        
        if (override === true) {
            await fetch(process.env.REACT_APP_API_URL + 'Blog/' + id)
            .then(response => response.json())
            .then(data => {
                if (data.isError == true) {
                    setError(data.error.message);
                } else {
                    _blog = data.result;
                }
            })
            .then(() => {return UpdateBlog(_blog)})
            .catch(err => setError(true));
        } else {
            await UpdateBlog(_blog);
        }
    });

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
        <div className="center-text" style={{minWidth: '400px'}}>
            <div id="userSettingsForm">
                <div className="container">
                    <div className="user-row row">
                        <div className="leftPanel col-12 col-lg-12 panelBox">
                            <h1>Editing blog</h1>
                            <Link to="/blogs"><button style={{width:'20rem'}}>Back to blogs</button></Link>
                            <form onSubmit={(event) => handleSubmit(event, false)}>
                            <div>
                                <FormGroup>
                                    <Label style={{marginLeft: '-30px'}}>Title
                                        <Input style={{marginLeft: '-0.9rem'}} type="text" name="title" value={blog.title} readOnly={false} onChange={(e) => handleTitleChange(e)}/>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginLeft: '-30px'}}>Content
                                        <Input style={{width: '50vw'}} type="textarea" name="content" value={blog.content} readOnly={false} onChange={(e) => handleContentChange(e)}/>
                                    </Label>
                                </FormGroup>
                                <button style={{width:'20rem'}} onClick={handleOpenModal}>Open Image Upload</button><br/><br/>
                                <UploadImageForm onResponse={handleImageUpload} isOpen={showModal} onAction={setShowModal}/>
                                <img style={{maxWidth: '100%'}} src={blog.imageUrl} /><br/><br/>
                                <button style={{width:'10rem'}} type="submit">Save</button>
                                <div></div>
                                { error ?
                                <>
                                    <hr></hr>
                                    <Label style={{marginLeft: '-30px', marginTop: '10px', color: 'darkred'}}>{error}</Label>
                                    <br></br>
                                    <Label style={{marginLeft: '-30px', color: 'green'}}>Do you want to save changes anyway?</Label>
                                    <br></br>
                                    <button style={{width:'10rem'}} onClick={(event) => handleSubmit(event, true)}>Yes</button>
                                </>
                                : <>&#8205;</> }
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBlog