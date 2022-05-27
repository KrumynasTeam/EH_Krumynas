import './ShoppingCart.scss';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Discount } from "../product/AllProducts";
import { Label, Input, Table } from "reactstrap";


export type Cart = {
    id: number,
    status: string,
    pots: Array<Pot>,
    plants: Array<Plant>,
    bouquets: Array<Bouquet>
}

export type Pot = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    size: number;
    discount: Discount;
  }

  export type Plant = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    discount: Discount;
  }

  export type Bouquet = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    discount: Discount;
  }

export const ShoppingCart = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState<Cart>();
    const {user, token, UpdateUserData} = useContext(UserContext);
    const [deliveryType, setDeliveryType] = useState('pick-up');
    const [CartItems, setCartItems] = useState<Cart[]>([])
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [country, setCountry] = useState(user?.country);
    const [street, setStreet] = useState(user?.street);
    const [addressLine1, setAddressLine1] = useState(user?.addressLine1);
    const [addressLine2, setAddressLine2] = useState(user?.addressLine2);
    const pickUp = 'pick-up';
    const delivery = 'direct-delivery';
    const courier = 'courier';

    const setWindowTo = ((to) => {
        if (deliveryType !== to) {
            setDeliveryType(to)
            setIsLoading(false);
        }
    });

    const RenderDeliveryInfo = (() => {
        if (deliveryType == delivery)
            return DeliveryInfo(UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2);
        else if(deliveryType == courier)
            return CourierInfo(UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2);
        else 
            return PickUpInfo(UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading);
    })

    return (
        <div className="center-text">
            <div id="shoppingCartItemsList">
                <div className="container">
                    <div className="user-row row">
                        <div className="leftPanel col-12 col-lg-4 panelBox">
                            <div>
                                <h5><a className="bold disabled-link">Select delivery method</a></h5>
                            </div>
                            <div className="left-panel-additional-text">
                                <form>
                                <label>
                                    <input name="delivery" type="radio" value="direct-delivery" onChange={() => setWindowTo(delivery)} className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                                        EH - direct delivery
                                </label>
                                <label>
                                    <input name="delivery" type="radio" value="direct-delivery" onChange={() => setWindowTo(courier)} className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                                        Courier
                                </label>
                                <label>
                                    <input name="delivery" type="radio" value="direct-delivery" onChange={() => setWindowTo(pickUp)} className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                                        I'll pick up by myself
                                </label>
                                </form>
                                { RenderDeliveryInfo() }
                            </div>
                        </div>
                        <div className="rightPanel col-12 col-lg-8 panelBox">
                            <h2>Shopping Cart info</h2>
                            <div>
                                Cart Items :)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DeliveryInfo = ((UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2) => {
    const UpdateBillingInfo = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await fetch(process.env.REACT_APP_API_URL + 'User', {
          method: 'PUT',
          headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "country": country,
            "street": street,
            "addressLine1": addressLine1,
            "addressLine2": addressLine2
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            UpdateUserData(null, false);
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true); })
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    return (
        <div style={{margin: '10px'}}>
        <form onSubmit={(event) => UpdateBillingInfo(event)}>
            <div className="custom-container">
                <div className="input-div">
                    <Label>Country</Label>
                    <FormLine type="text" inputValue={country || ''} setInputValue={setCountry} placeholder='Enter your country' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false} />
                </div>
                <div className="input-div-right">
                    <Label>Street</Label>
                    <FormLine type="text" inputValue={street || ''} setInputValue={setStreet} placeholder='Enter your street' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
            </div>
            <div className="custom-container">
                <div className="input-div">
                    <Label>Address Line 1</Label>
                    <FormLine type="text" inputValue={addressLine1 || ''} setInputValue={setAddressLine1} placeholder='Enter your address line' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
                <div className="input-div-right">
                    <Label>Address Line 2 (Optional)</Label>
                    <FormLine type="text" inputValue={addressLine2 || ''} setInputValue={setAddressLine2} placeholder='Enter your address line' regex={null} onInvalidMessage="Invalid email address." isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
            </div>
            <hr />
            { Spinner(error, isLoading, success) }
            <div className="update-info-button">
                <button type="submit" style={{marginTop: '30px'}}>Payment</button>
            </div>
        </form>
    </div>
    );
});

const CourierInfo = ((UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2) => {
    const UpdateBillingInfo = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await fetch(process.env.REACT_APP_API_URL + 'User', {
          method: 'PUT',
          headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "country": country,
            "street": street,
            "addressLine1": addressLine1,
            "addressLine2": addressLine2
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            UpdateUserData(null, false);
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true); })
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    return (
        <div>
        <form onSubmit={(event) => UpdateBillingInfo(event)}>
            <label>Choose a courier:</label>
            <br/>
            <label>
                <input name="courier" type="radio" value="dpd" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                    Dpd
            </label>
            <br/>
            <label>
                <input name="courier" type="radio" value="omniva" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                    Omniva
            </label>
            <label>
                <input name="courier" type="radio" value="lp" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                    Lietuvos paštas
            </label>
            <div className="custom-container">
                <div className="input-div">
                    <Label>Country</Label>
                    <FormLine type="text" inputValue={country || ''} setInputValue={setCountry} placeholder='Enter your country' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false} />
                </div>
                <div className="input-div-right">
                    <Label>Street</Label>
                    <FormLine type="text" inputValue={street || ''} setInputValue={setStreet} placeholder='Enter your street' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
            </div>
            <div className="custom-container">
                <div className="input-div">
                    <Label>Address Line 1</Label>
                    <FormLine type="text" inputValue={addressLine1 || ''} setInputValue={setAddressLine1} placeholder='Enter your address line' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
                <div className="input-div-right">
                    <Label>Address Line 2 (Optional)</Label>
                    <FormLine type="text" inputValue={addressLine2 || ''} setInputValue={setAddressLine2} placeholder='Enter your address line' regex={null} onInvalidMessage="Invalid email address." isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
            </div>
            { Spinner(error, isLoading, success) }
            <div className="update-info-button">
                <button type="submit" style={{marginTop: '30px'}}>Update</button>
            </div>
        </form>
    </div>
    );
});

const PickUpInfo = ((UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading) => {

    return (
        <div style={{margin: '20px'}}>
            <button>Payment</button>
        </div>
    );
});

export const FormLine = ({ type, setInputValue, inputValue, placeholder, regex, onInvalidMessage, isRequired, isAutoComplete, isDisabled }) => (
    <Input
        pattern={regex}
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(onInvalidMessage)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('') }
        onChange={e => setInputValue(e.target.value)}
        required={isRequired}
        autoComplete={isAutoComplete}
        disabled={isDisabled}
    />
);

const Spinner = ((error, isLoading, success) => {
    return (
        <div className="spinner-loader" style={{alignItems: 'center'}}>
            { error || success ? (
                error ?
                <div style={{height: '10px', margin: '10px', textDecoration: 'underline', color: 'darkred', textAlign: 'center'}}>{error}</div>
                :
                <div style={{height: '10px', margin: '10px', textDecoration: 'underline', color: 'green', textAlign: 'center'}}>Successfuly updated!</div>
            ) : (
                isLoading ? (
                    <div className='lds-default' style={{alignSelf: "center", margin: '-10px'}}>
                    {[...Array(12)].map((_, index) => (
                        <div key={index} style={{ background: `#fdbb2d`, width: '6', height: '6' }} />
                    ))}
                    </div>
                ) : (
                    <div className='lds-default' style={{height: '10px', margin: '10px'}}></div>
                )
            )
            }
        </div>
    );
}); 