import React from 'react';
import { useHistory } from 'react-router-dom';

function CreateBlog(props) {
    let history = useHistory()

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
                'Content-Type': 'application/json'
            }
        }).then(() => history.push("/blogs")
        ).catch(err => err);
      }


    return (
        <div>
            <h1>Creating a new blog post</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:
                    <input type="text" name="title"/><br/>
                </label>
                <br/>
                <label>Content:
                    <textarea type="text" name="content"/><br/>
                </label><br/>
                <div className="align-right">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlog