import React, { useState } from "react";
import 'react-dropzone-uploader/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import '../../assets/spinner-loader.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DropFileInput from './DropFileInput';
import axios from 'axios';
import PropTypes from 'prop-types';

const UploadImageForm = props => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCloseModal = () => {
    props.onAction(false);
    setSelectedImage(null);
  }

  const toBase64 = (file: any) => {
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }

  async function handleImageUpload() {
    if (selectedImage != null) {
      toBase64(selectedImage)
        .then(async (base:string) => {
            let body = new FormData()
            body.set('key', process.env.REACT_APP_IMAGE_UPLOAD_TOKEN !== null ? process.env.REACT_APP_IMAGE_UPLOAD_TOKEN : '')
            body.append('image', base.split(',').pop())
            setIsLoading(true)
            await axios({
              method: 'post',
              url: 'https://api.imgbb.com/1/upload',
              data: body
            })
            .then((response) => response.data.data.url)
            .then(imageUrl => {
              setIsLoading(false);
              props.onAction(false);
              setSelectedImage(null);
              return props.onResponse(imageUrl);
            })
            .catch((e) => setError(e))
        });
    }
  }

  return (
      <Modal isOpen={props.isOpen} toggle={handleCloseModal} contentClassName="model-dialog">
        <ModalHeader>Upload Image</ModalHeader>
        <ModalBody>
          <DropFileInput
            onFileChange={(file) => setSelectedImage(file)}
            onCancel={() => setSelectedImage(null)}
          />
          <div className="spinner-loader">
            { error ? (
                  <div style={{height: '57px', textDecoration: 'underline', color: 'darkred'}}>{error}</div>
              ) : (
                  isLoading ? (
                    <div className='lds-default' style={{alignSelf: "center"}}>
                    {[...Array(12)].map((_, index) => (
                        <div key={index} style={{ background: `#fdbb2d`, width: '6', height: '6' }} />
                    ))}
                    </div>
                  ) : (
                      <div className='lds-default'></div>
                  )
              )
            }
          </div>
        </ModalBody>
        <ModalFooter>
            <Button style={{backgroundColor: "#3399FF"}} onClick={handleImageUpload} disabled={selectedImage === null}>
              Upload
            </Button>
            <Button style={{backgroundColor: "#fff", color: 'grey'}} onClick={handleCloseModal}>
              Cancel
            </Button>
        </ModalFooter>
      </Modal>
  );
}

UploadImageForm.propTypes = {
  onResponse: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onAction: PropTypes.func
}

export default UploadImageForm;
