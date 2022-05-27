import './ShoppingCart.scss';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Discount } from "../product/AllProducts";
import { Label, Input, Table } from "reactstrap";
import { Order, OrderDelivery, OrderStatus, OrderAddDto } from '../Orders/OrdersAdminScreen';


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

const CourierTypes = [
    "DPD",
    "Omniva",
    "LP Express"
]

const DeliveryTypes = [
    "Direct",
    "Courier",
    "SelfPickup"
]

export const GetCartById = async (setIsLoading: any, setError: any, setCart: any) => {
    const {cartId, token, UpdateCartId} = useContext(UserContext);

    setIsLoading(true);

    return await fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}`, {
      method: 'GET',
      headers: {
        'Authorization': token || ''
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setError(data.error.message);
      } else {
        setError(null);
      }
      UpdateCartId(data.result.id);
      //setIsLoading(false);
      return data.result;
    }).then(result => {
        setCart(result);
    }).then(() => setIsLoading(false))
    .catch(() => setError("Could not establish connection to server. Please try again!"));
}

export const CreateCart = async (pots: any[], plants: any[], bouquets: any[], setIsLoading: any, setError: any, setSuccess: any) => {
    const {user, token, UpdateCartId} = useContext(UserContext);

    setIsLoading(true);

    return await fetch(process.env.REACT_APP_API_URL + 'ShoppingCart', {
      method: 'POST',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userId': user?.id,
        'pots': pots,
        'plants': plants,
        'bouquets': bouquets
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setSuccess(false);
        setError(data.error.message);
      } else {
        setError(null);
        setSuccess(true);
      }
      UpdateCartId(data.result.id);
      setIsLoading(false);
      return data.result;
    })
    .catch(() => setError("Could not establish connection to server. Please try again!"));
}

export const AddPotToCart = async (id: any, quantity: any, setIsLoading: any, setError: any, setSuccess: any) => {
    const {token, cartId} = useContext(UserContext);

    setIsLoading(true);

    return await fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}/pot`, {
      method: 'PUT',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'potId': id,
        'quantity': quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setSuccess(false);
        setError(data.error.message);
      } else {
        setError(null);
        setSuccess(true);
      }
      setIsLoading(false);
      return data.result;
    })
    .catch(() => setError("Could not establish connection to server. Please try again!"));
}

export const AddPlantToCart = async (id: any, quantity: any, setIsLoading: any, setError: any, setSuccess: any) => {
    const {token, cartId} = useContext(UserContext);

    setIsLoading(true);

    return await fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}/plant`, {
      method: 'PUT',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'plantId': id,
        'quantity': quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setSuccess(false);
        setError(data.error.message);
      } else {
        setError(null);
        setSuccess(true);
      }
      setIsLoading(false);
      return data.result;
    })
    .catch(() => setError("Could not establish connection to server. Please try again!"));
}

export const AddBouquetToCart = async (id: any, quantity: any, items: any, setIsLoading: any, setError: any, setSuccess: any) => {
    const {token, cartId} = useContext(UserContext);

    setIsLoading(true);

    return await fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}/bouquet`, {
      method: 'PUT',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'bouquetId': id,
        'items': items,
        'quantity': quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setSuccess(false);
        setError(data.error.message);
      } else {
        setError(null);
        setSuccess(true);
      }
      setIsLoading(false);
      return data.result;
    })
    .catch(() => setError("Could not establish connection to server. Please try again!"));
}

export const DeleteById = async (setIsLoading: any, setError: any, setSuccess: any) => {
    const {token, cartId} = useContext(UserContext);

    setIsLoading(true);

    return await fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token || ''
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setSuccess(false);
        setError(data.error.message);
      } else {
        setError(null);
        setSuccess(true);
      }
      setIsLoading(false);
      return data.result;
    })
    .catch(() => setError("Could not establish connection to server. Please try again!"));
}

export const DeleteItemById = async (itemId: any, productType: any) => {
    const {token, cartId} = useContext(UserContext);

    return await fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}/${itemId}/${productType}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token || ''
      }
    })
    .then(response => response.json())
    .then(data => {return true;})
    .catch((err) => null);
}

export const ShoppingCart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [cartSuccess, setCartSuccess] = useState(false);
    const {user, token, cartId} = useContext(UserContext);
    
    const [cart, setCart] = useState<Cart>(null);
    const [deliveryType, setDeliveryType] = useState(DeliveryTypes[0]);
    const [courierType, setCourierType] = useState(CourierTypes[0]);

    const [country, setCountry] = useState(user?.country);
    const [street, setStreet] = useState(user?.street);
    const [addressLine1, setAddressLine1] = useState(user?.addressLine1);
    const [addressLine2, setAddressLine2] = useState(user?.addressLine2);
    const [email, setEmail] = useState(null);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [cartError, setCartError] = useState(null);

    const setWindowTo = ((to) => {
        if (deliveryType !== to) {
            setIsLoading(false);
        }
    });


    useEffect(() => {
        setIsCartLoading(true);
        fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}`, {
            method: 'GET',
            headers: {
              'Authorization': token || ''
            }
          })
          .then(response => response.json())
          .then(data => { return data.result; })
          .then(result => {
              setCart(result);
          }).then(() => setIsCartLoading(false))
          .catch(() => setCartError("Could not establish connection to server. Please try again!"));
    }, [cartId]);

    const HandleDeliveryType = (event) => {
        setDeliveryType(DeliveryTypes[event.currentTarget.value]);
        setWindowTo(event.currentTarget.value);
    };

    const RenderDeliveryInfo = (() => {
        if (deliveryType == DeliveryTypes[0])
            return DeliveryInfo(cartId, user, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail);
        else if (deliveryType == DeliveryTypes[1])
            return CourierInfo(cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail);
        else 
            return PickUpInfo(cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail);
    })

    const kk = async (id) => {
        await DeleteItemById(id, 'bouquet');
    };

    return (
        <div className="center-text">
            <div id="shoppingCartItemsList">
                <div className="container">
                    <div className="user-row row">
                        <div className="leftPanel col-12 col-lg-4 panelBox">
                            <div>
                                <h4 style={{marginTop: '20px'}}>Order Information</h4>
                            </div>
                            <div className="custom-container">
                                <Label>Country:</Label>
                            </div>
                            <div className="left-panel-additional-text" style={{marginTop: '-20px'}}>
                                <form>
                                <label>
                                    <input checked={deliveryType == DeliveryTypes[0]} name="EH - direct delivery" type="radio" value={0} onChange={HandleDeliveryType} className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                                        EH - direct delivery
                                </label>
                                <label>
                                    <input checked={deliveryType === DeliveryTypes[1]} name="courier" type="radio" value={1} onChange={HandleDeliveryType} className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                                        Courier
                                </label>
                                <label>
                                    <input checked={deliveryType === DeliveryTypes[2]} name="PickUp" type="radio" value={2} onChange={HandleDeliveryType} className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                                        I'll pick up by myself
                                </label>
                                </form>
                                { RenderDeliveryInfo() }
                            </div>
                        </div>
                        <div className="rightPanel col-12 col-lg-8 panelBox">
                            <h2>Shopping Cart info</h2>
                            <hr style={{marginTop: '30px'}}></hr>
                            <div>
                                { Spinner(cartError, isCartLoading, cartSuccess) }
                                {cart == null ? <h6>Cart is empty!</h6> :
                                <div style={{marginLeft: '20px', marginRight: '20px'}}>
                                    <div style={{margin: '0px -70px 0px 0px'}}>
                                        <h5>Plants</h5>
                                        <div className="custom-container" style={{display: 'flex', alignItems: 'center', overflowY: 'auto'}}>
                                            <Table responsive striped bordered hover>
                                                <thead>
                                                    <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Half Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { cart != null ? cart.plants.map((plant, index) => (
                                                        <tr key={index}>
                                                            <td><button style={{width: '100px'}} onClick={() => console.log(plant.id)}>REMOVE</button></td>
                                                            <td>{plant.id}</td>
                                                            <td>{plant.name}</td>
                                                            <td>{plant.quantity}</td>
                                                            <td>{plant.quantity * 69.33}</td>
                                                        </tr>
                                                    )) : <></>}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div style={{margin: '0px -70px 0px 0px'}}>
                                        <h5>Pots</h5>
                                        <div className="custom-container" style={{display: 'flex', alignItems: 'center', overflowY: 'auto'}}>
                                            <Table responsive striped bordered hover>
                                                <thead>
                                                    <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Half Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { cart != null ? cart.pots.map((pot, index) => (
                                                        <tr key={index}>
                                                            <td><button style={{width: '100px'}} onClick={() => DeleteItemById(pot.id, 'pot')}>REMOVE</button></td>
                                                            <td>{pot.id}</td>
                                                            <td>{pot.name}</td>
                                                            <td>{pot.size}</td>
                                                            <td>{pot.quantity * 12.33}</td>
                                                        </tr>
                                                    )) : <></>}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div style={{margin: '0px -70px 0px 0px'}}>
                                        <h5>Bouquets</h5>
                                        <div className="custom-container" style={{display: 'flex', alignItems: 'center', overflowY: 'auto'}}>
                                            <Table responsive striped bordered hover>
                                                <thead>
                                                    <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Half Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { cart != null ? cart.bouquets.map((bouquet, index) => (
                                                        <tr key={index}>
                                                            <td><button style={{width: '100px'}} onClick={() => kk(bouquet.id)}>REMOVE</button></td>
                                                            <td>{bouquet.id}</td>
                                                            <td>{bouquet.name}</td>
                                                            <td>{bouquet.quantity}</td>
                                                            <td>{bouquet.quantity * 12.33}</td>
                                                        </tr>
                                                    )) : <></>}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DeliveryInfo = ((cartId, user, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail) => {
    const PerformPayment = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await fetch(process.env.REACT_APP_API_URL + 'Order', {
          method: 'POST',
          headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "cartId": cartId,
            "delivery": DeliveryTypes[0],
            "country": user?.country || country || '',
            "street": user?.street || street || '',
            "addressLine1": user?.addressLine1 || addressLine1 || '',
            "addressLine2": user?.addressLine2 || addressLine2 || ''
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            console.log('Delivery');
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true); })
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    return (
        <div style={{margin: '10px'}}>
            <hr />
        <form onSubmit={(event) => PerformPayment(event)}>
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
                    <FormLine type="text" inputValue={addressLine2 || ''} setInputValue={setAddressLine2} placeholder='Enter your address line 2' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
            </div>
            { user?.id != 1 ?
            <div className="custom-container">
                <div className="input-div">
                    <Label>Email Address</Label>
                    <FormLine type="text" inputValue={email || ''} setInputValue={setEmail} placeholder='Enter your email' regex="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onInvalidMessage="Invalid email address." isRequired={true} isAutoComplete={"false"} isDisabled={false} />
                </div>
            </div>
            : <></> }
            <hr />
            { Spinner(error, isLoading, success) }
            <div className="update-info-button">
                { cartId == null ?
                    <button type="submit" style={{marginTop: '30px', background: 'grey'}} disabled={cartId === null}>No Cart</button>
                : <button type="submit" style={{marginTop: '30px'}}>Payment</button>}
            </div>
        </form>
    </div>
    );
});

const CourierInfo = ((cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail) => {
    const PerformPayment = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await fetch(process.env.REACT_APP_API_URL + 'Order', {
          method: 'POST',
          headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "cartId": cartId,
            "delivery": DeliveryTypes[1],
            "country": user?.country || country || '',
            "street": user?.street || street || '',
            "addressLine1": user?.addressLine1 || addressLine1 || '',
            "addressLine2": user?.addressLine2 || addressLine2
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            console.log('Delivery');
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true); })
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    const handleCourierType = (event) => {
        console.log(event.currentTarget.value);
        setCourierType(CourierTypes[event.currentTarget.value]);
    }

    return (
        <div>
        <form onSubmit={(event) => PerformPayment(event)}>
        <hr />
            <div>
                <label>Choose a courier:</label>
                <br/>
                <label>
                    <input value={0} checked={courierType == CourierTypes[0]} onChange={handleCourierType} name="courier" type="radio" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                        DPD
                </label>
                <br/>
                <label>
                    <input value={1} checked={courierType == CourierTypes[1]} onChange={handleCourierType} name="courier" type="radio" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                        Omniva
                </label>
                <label style={{minWidth: '150px'}}>
                    <input value={2} checked={courierType == CourierTypes[2]} onChange={handleCourierType} name="courier" type="radio" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>LP Expres
                </label>
            </div>
            <hr />
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
                    <FormLine type="text" inputValue={addressLine2 || ''} setInputValue={setAddressLine2} placeholder='Enter your address line 2' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
                </div>
            </div>
            { user?.id != 1 ?
            <div className="custom-container">
                <div className="input-div">
                    <Label>Email Address</Label>
                    <FormLine type="text" inputValue={email || ''} setInputValue={setEmail} placeholder='Enter your address line' regex={null} onInvalidMessage="Invalid email address." isRequired={true} isAutoComplete={"false"} isDisabled={false}  />
                </div>
            </div>
            : <></> }
            { Spinner(error, isLoading, success) }
            <div className="update-info-button">
                { cartId == null ?
                    <button type="submit" style={{marginTop: '30px', background: 'grey'}} disabled={cartId === null}>No Cart</button>
                : <button type="submit" style={{marginTop: '30px'}}>Payment</button>}
            </div>
        </form>
    </div>
    );
});

const PickUpInfo = ((cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail) => {
    const PerformPayment = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await fetch(process.env.REACT_APP_API_URL + 'Order', {
          method: 'POST',
          headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "cartId": cartId,
            "delivery": DeliveryTypes[2],
            "country": user?.country || country || '',
            "street": user?.street || street || '',
            "addressLine1": user?.addressLine1 || addressLine1 || '',
            "addressLine2": user?.addressLine2 || addressLine2 || ''
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            console.log('Delivery');
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true); })
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    const handleCourierType = (event) => {
        setCourierType(CourierTypes[event.currentTarget.value]);
    }

    return (
        <div>
        <form onSubmit={(event) => PerformPayment(event)}>
        <hr />
            <div>
                <label>Choose a courier:</label>
                <br/>
                <label>
                    <input value={0} checked={courierType == CourierTypes[0]} onChange={handleCourierType} name="courier" type="radio" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                        DPD
                </label>
                <br/>
                <label>
                    <input value={1} checked={courierType == CourierTypes[1]} onChange={handleCourierType} name="courier" type="radio" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>
                        Omniva
                </label>
                <label style={{minWidth: '150px'}}>
                    <input value={2} checked={courierType == CourierTypes[2]} onChange={handleCourierType} name="courier" type="radio" className="choice" style={{width: '15px', height: '15px', padding: '10px', marginTop: '10px', marginRight: '10px', borderBottom: '10px solid rgba(34,193,195,1)'}}/>LP Expres
                </label>
            </div>
            <hr />
            <div className="custom-container">
                <div className="input-div">
                    <Label>Email</Label>
                    <FormLine type="text" inputValue={email || ''} setInputValue={setEmail} placeholder='Enter your email' regex="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onInvalidMessage="Invalid email address." isRequired={true} isAutoComplete={"false"} isDisabled={false} />
                </div>
            </div>
            { Spinner(error, isLoading, success) }
            <div className="update-info-button">
                { cartId == null ?
                    <button type="submit" style={{marginTop: '30px', background: 'grey'}} disabled={cartId === null}>No Cart</button>
                : <button type="submit" style={{marginTop: '30px'}}>Payment</button>}
            </div>
        </form>
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

function async(arg0: (id: any) => void) {
    throw new Error('Function not implemented.');
}
