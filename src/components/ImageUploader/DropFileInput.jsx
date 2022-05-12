import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';
import uploadImg from '../../assets/download-image-240.png';

const DropFileInput = props => {
    const wrapperRef = useRef(null);

    const[file, setFile] = useState(null)
    const[preview, setPreview] = useState('')

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        const objectUrl = URL.createObjectURL(newFile)

        if (newFile) {
            const updatedFile = [newFile];
            setFile(updatedFile);
            setPreview(objectUrl)
            props.onFileChange(newFile);
        }
    }

    const fileRemove = () => {
        setFile(null);
        props.onFileChange(null);
    }

    return (
        <>
            <div className='drop-file-main'>
                <div
                    ref={wrapperRef}
                    className='drop-file-input'
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className='drop-file-input__label'>
                        <img src={uploadImg} style={{backgroundColor: 'grey', borderRadius: '10px'}} alt='' />
                        <p>Drag & Drop your image here</p>
                    </div>
                    <input type="file" value="" onChange={onFileDrop}/>
                </div>
            </div>
            {
                file != null && file.length > 0 ? (
                    <div className='drop-file-preview'>
                        <p className='drop-file-preview__title'>
                            Selected Image
                        </p>
                        {
                            <div className='drop-file-preview__item'>
                                <button className="container_upload" onClick={fileRemove}>
                                    <img src={preview} alt="Uploaded image preview" className="image_upload" />
                                    <div className="overlay_upload">
                                        <div className="text_upload">X</div>
                                    </div>
                                </button>
                            </div>
                        }
                    </div>
                ) : null
            }
        </>
    )
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
    onCancel: PropTypes.func
}

export default DropFileInput
