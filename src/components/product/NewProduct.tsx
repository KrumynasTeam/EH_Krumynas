import React, { useState, useContext, useEffect } from "react";
import { UserContext } from '../contexts/UserContext';
import 'react-dropzone-uploader/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/spinner-loader.scss';
import './newProduct.scss';
import UploadImageForm from "../ImageUploader/ImageUpload";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from 'prop-types';

const CreateProductForm = props => {

    const {token} = useContext(UserContext);

    const [productName, setProductName] = useState<string>("");
    const [productType, setProductType] = useState<string>("None");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productImage, setProductImage] = useState(null);

    const [plantVariants, setPlantVariants] = useState([])
    const [potVariants, setPotVariants] = useState([])
    const [bouquetVariants, setBouquetVariants] = useState([])
    const [varientColor, setVarientColor] = useState("White")
    const [varientSize, setVarientSize] = useState("Small")
    const [varientPrice, setVarientPrice] = useState(0)

    const [showImageUpload, setShowImageUpload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const defaultConnectionError = "Could not establish connection to the server. Please try again!";

    const colors = ['White', 'Black', 'Red', 'Green', 'Blue', 'Pink', 'Purple'];
    const sizes = ['Small', 'Medium', 'Large'];

    useEffect(() => {
        if(props.Product !== null){
            setProductName(props.Product.item.name)
            setProductType(props.Product.item.type)
            setProductDescription(props.Product.item.description)
            setProductImage(props.Product.item.images[0].imagePath)

            switch(props.Product.item.type){
                case 'Plant':
                    setPlantVariants(props.Product.variants);
                    break;
                case 'Pot':
                    setPotVariants(props.Product.variants);
                    break;
                case 'Bouquet':
                    setBouquetVariants(props.Product.variants);
                    break;
            }
        }else{
            clearProductInfo();
        }
    }, [props.Product])

    const handleCloseModal = () => {
        props.onAction();
    }

    const addImage = (image: string) => {
        setProductImage(image);
    }

    const addVarient = () => {
        if(varientPrice <= 0){ return; }
        switch(productType){
            case 'Plant':
                if(plantVariants.find(v => v.color === varientColor)) return;
                var newPlant = {color: varientColor, price: varientPrice};
                var newPlants = [...plantVariants, newPlant];
                setPlantVariants(newPlants);
                break;
            case 'Pot':
                if(potVariants.find(v => v.color === varientColor && v.size === varientSize)) return;
                var newPot = {color: varientColor, size: varientSize, price: varientPrice};
                var newPots = [...potVariants, newPot];
                setPotVariants(newPots);
                break;
            case 'Bouquet':
                if(plantVariants.find(v => v.color === varientColor)) return;
                var newBouquet = {color: varientColor, price: varientPrice};
                var newBouquets = [...bouquetVariants, newBouquet];
                setBouquetVariants(newBouquets);
                break;
            default: return;
        }
    }

    const removeVarient = (index: number) => {
        switch(productType){
            case 'Plant':
                var newPlants = []
                for (var i = 0; i < plantVariants.length; i++) {
                    if(i !== index) newPlants = [...newPlants, plantVariants[i]]
                }
                setPlantVariants(newPlants);
                break;
            case 'Pot':
                var newPots = []
                for (var j = 0; j < potVariants.length; j++) {
                    if(j !== index) newPots = [...newPots, potVariants[j]]
                }
                setPotVariants(newPots);
                break;
            case 'Bouquet':
                var newBouquets = []
                for (var k = 0; k < bouquetVariants.length; k++) {
                    if(k !== index) newBouquets = [...newBouquets, bouquetVariants[k]]
                }
                setBouquetVariants(newBouquets);
                break;
            default: return;
        }
    }

    const validateProductData = () => {
        if(productType === 'None' || productType === null) {
            setErrorMessage('Product has to be either a plant, pot or bouquet.');
            return false;
        }
        if(productName.length < 1) {
            setErrorMessage('Product must have a name.');
            return false;
        }
        if(productDescription.length < 1) {
            setErrorMessage('Product must have a description.');
            return false;
        }
        if(productImage === null || productImage.length < 1) {
            setErrorMessage('Product must have an image.');
            return false;
        }

        setErrorMessage("");
        return true;
    }

    const handleCancel = () => {
        clearProductInfo();
        handleCloseModal();
    }

    const clearProductInfo = () => {
        setProductName('')
        setProductType('None')
        setProductDescription('')
        setProductImage(null)

        setPlantVariants([]);
        setPotVariants([]);
        setBouquetVariants([]);
        setErrorMessage("");
    }

    const handleConfirm = async () => {
        if(!validateProductData()) return;
        setIsLoading(true);

        var body = {
            Item: {
                name: productName,
                description: productDescription,
                discountId: null,
                images: [
                    {
                        color: "Red",
                        imagePath: productImage
                    }
                ]
            }
        }

        switch(productType){
            case 'Plant':
                body['Variants'] = plantVariants;
                break;
            case 'Pot':
                body['Variants'] = potVariants;
                break;
            case 'Bouquet':
                body['Variants'] = bouquetVariants;
                break;
        }
        
        var endpoint = process.env.REACT_APP_API_URL + productType;
        var endpoint = props.Product ? endpoint + '/' + props.Product.item.id : endpoint;
        var method = props.Product ? 'PUT' : 'POST';
        await fetch(endpoint,
        {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
          body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            if(data.isError){
                setErrorMessage(data.error.message);
            }else{
                setErrorMessage("");
                props.onResponse();
            }

        }).catch(() => {
            setIsLoading(false);
            setErrorMessage(defaultConnectionError);
        })
    }

    const canConfirm = () => {
        if(productType === 'None' || productType === null) return false;
        if(productName.length < 1) return false;
        if(productDescription.length < 1) return false;
        if(productImage === null || productImage.length < 1) return false;

        switch(productType){
            case 'Plant':
                return plantVariants !== null && plantVariants.length > 0;
            case 'Pot':
                return potVariants !== null && potVariants.length > 0;
            case 'Bouquet':
                return bouquetVariants !== null && bouquetVariants.length > 0;
        }
    }

    const handleDelete = async () => {
        setIsLoading(true);  
        
        var endpoint = productType;
        
        await fetch(process.env.REACT_APP_API_URL + endpoint + '/' + props.Product.item.id,
        {
            method: 'DELETE',
            headers: { 
                'Authorization': token
            }
        }).then(() => {
            setIsLoading(false);
            props.onResponse();

        }).catch(() => {
            setIsLoading(false);
        })
        
    }

    return (
        <Modal isOpen={props.isOpen} toggle={handleCloseModal}>
            {props.Product ? 
                <ModalHeader>Update Product Form</ModalHeader>
                :
                <ModalHeader>New Product Form</ModalHeader>
            }
            <ModalBody>
                <div className="create-product-form-container">
                    <div className="create-product-basic-information-container">
                        <div className="create-product-basic-information-container-grid">
                            <h2>Basic Information</h2>
                            <div id="basic-info-a">
                                <label>Name</label>
                                <textarea style={{resize: 'none'}} id="product-name-input" value={productName} onChange={(e) => setProductName(e.target.value)}/>
                                <div id="type-select-container">
                                    <label>Product Type:</label>
                                    <select id="product-type-select" value={productType} onChange={(e) => setProductType(e.target.value)}>
                                        <option>None</option>
                                        <option>Plant</option>
                                        <option>Pot</option>
                                        <option>Bouquet</option>
                                    </select>
                                </div>
                            </div>
                            <div id="basic-info-b">
                                <label>Description</label>
                                <textarea style={{resize: 'none'}} id="product-description-input" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}/>
                            </div>
                            <div id="basic-info-c">
                                <img src={productImage} alt='New product'/>
                                <Button onClick={() => {setShowImageUpload(true)}}>Upload an image</Button>
                                <UploadImageForm onResponse={addImage} isOpen={showImageUpload} onAction={setShowImageUpload}/>
                            </div>
                        </div>
                    </div>

                    {productType === 'Pot' ? 
                        <div className="create-product-variants-container">
                            <div className="create-product-container">
                                <h2>Add plant variant</h2>
                                <div id="add-variant-section">
                                    <div style={{float: 'left'}}>
                                        <div>
                                            <label style={{display: 'block'}}>Color</label>
                                            <select style={{display: 'block', width: '100%', height: '30px'}} id="product-color-select" value={varientColor} onChange={(e) => setVarientColor(e.target.value)}>
                                                {colors.map(c => (
                                                    <option key={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{float: 'left', marginLeft: '30px', marginRight: '10px'}}>
                                        <div>
                                            <label style={{display: 'block'}}>Size</label>
                                            <select style={{display: 'block', width: '100%', height: '30px'}} id="product-color-select" value={varientSize} onChange={(e) => setVarientSize(e.target.value)}>
                                                {sizes.map(s => (
                                                    <option key={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{float: 'left', marginLeft: '30px', marginRight: '10px'}}>
                                        <div>
                                            <label style={{display: 'block'}}>Price</label>
                                            <input style={{display: 'block'}} type="number" id="product-color-select" value={varientPrice} onChange={(e) => setVarientPrice(Number(e.target.value))}/>
                                        </div>
                                    </div>
                                    <div>
                                        <Button onClick={addVarient} className="add-variant-button">Add</Button>
                                    </div>
                                </div>
                                <div className="product-variant-list">
                                    <div className="product-variant-row">
                                        <div className="product-variant-row-cell">Nr.</div>
                                        <div className="product-variant-row-cell">Color</div>
                                        <div className="product-variant-row-cell">Size</div>
                                        <div className="product-variant-row-cell">Price</div>
                                        <div className="product-variant-row-cell">Delete</div>
                                    </div>
                                    {potVariants.map((v, index) => (
                                        <div key={index} className="product-variant-row">
                                            <div className="product-variant-row-cell">{index + 1}</div>
                                            <div className="product-variant-row-cell">{v.color}</div>
                                            <div className="product-variant-row-cell">{v.size}</div>
                                            <div className="product-variant-row-cell">{v.price}</div>
                                            <div className="product-variant-row-cell">
                                                <Button onClick={() => removeVarient(index)}>-</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                     : productType === 'Bouquet' ? 
                        <div>Not implemented :(</div>
                     : productType === 'Plant' ?
                        <div className="create-product-variants-container">
                            <div className="create-product-container">
                                <h2>Add plant variant</h2>
                                <div id="add-variant-section">
                                    <div style={{float: 'left'}}>
                                        <div>
                                            <label style={{display: 'block'}}>Color</label>
                                            <select style={{display: 'block', width: '100%', height: '30px'}} id="product-color-select" value={varientColor} onChange={(e) => setVarientColor(e.target.value)}>
                                                {colors.map(c => (
                                                    <option key={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{float: 'left', marginLeft: '30px', marginRight: '10px'}}>
                                        <div>
                                            <label style={{display: 'block'}}>Price</label>
                                            <input style={{display: 'block'}} type="number" id="product-color-select" value={varientPrice} onChange={(e) => setVarientPrice(Number(e.target.value))}/>
                                        </div>
                                    </div>
                                    <div>
                                        <Button onClick={addVarient} className="add-variant-button">Add</Button>
                                    </div>
                                </div>
                                <div className="product-variant-list">
                                    <div className="product-variant-row">
                                        <div className="product-variant-row-cell">Nr.</div>
                                        <div className="product-variant-row-cell">Color</div>
                                        <div className="product-variant-row-cell">Price</div>
                                        <div className="product-variant-row-cell">Delete</div>
                                    </div>
                                    {plantVariants.map((v, index) => (
                                        <div key={index} className="product-variant-row">
                                            <div className="product-variant-row-cell">{index + 1}</div>
                                            <div className="product-variant-row-cell">{v.color}</div>
                                            <div className="product-variant-row-cell">{v.price}</div>
                                            <div className="product-variant-row-cell">
                                                <Button onClick={() => removeVarient(index)}>-</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                     :
                     <></>
                    }
                    {errorMessage !== "" ?
                        <div id='product-form-error-message'>
                            {errorMessage}
                        </div>
                    :
                    isLoading ? (
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <div className='lds-default' style={{alignSelf: "center"}}>
                            {[...Array(12)].map((_, index) => (
                                <div key={index} style={{ background: `#fdbb2d`, width: '6', height: '6' }} />
                            ))}
                            </div>
                        </div>
                      ) : (
                          <div className='lds-default'></div>
                      )
                    }
                    <div className="create-product-actions-container">
                        {props.Product ? <Button id='delete-product-button' type="reset" onClick={handleDelete}>Delete</Button> : <div id='delete-product-button-div'/>}
                        <Button className="product-form-action-button" onClick={handleCancel}>Cancel</Button>
                        <Button className="product-form-action-button" onClick={handleConfirm} disabled={!canConfirm()}>{props.Product ? 'Update' : 'Create'}</Button>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                
            </ModalFooter>
        </Modal>
    );
}

CreateProductForm.propTypes = {
    onResponse: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    onAction: PropTypes.func,
    Product: PropTypes.object
  }
  
  export default CreateProductForm;