import React, { useState } from "react";
import { Button } from "reactstrap";
import UploadImageForm from "./ImageUploader/ImageUpload";

export const UploadImageExample = () => {
    const [showModal, setShowModal] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    const handleOpenModal = () => {
        setShowModal(true)
    }
    
    return (
        <div>
            <Button onClick={handleOpenModal}>Open Image Upload</Button>
            <UploadImageForm onResponse={setImageUrl} isOpen={showModal} onAction={setShowModal}/>
            { imageUrl !== null ? (<h1>{imageUrl}</h1>) : (<></>) }
        </div>
    );
}
