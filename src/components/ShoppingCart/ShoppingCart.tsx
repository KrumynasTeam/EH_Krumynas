import './ShoppingCart.scss';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Discount, Product } from "../product/AllProducts";
import { Label, Input } from "reactstrap";
import { Order, OrderDelivery, OrderStatus, OrderAddDto } from '../Orders/OrdersAdminScreen';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export type Cart = {
    id: number,
    status: string,
    pots: Array<Pot>,
    plants: Array<Plant>,
    bouquets: Array<Bouquet>
}

export type Pot = {
    id: number;
    quantity: number;
    pot: {
      id: number;
      color: string;
      size: string;
      price: number,
      stock: number
    },
    product: Product
}

export type Plant = {
  id: number;
  quantity: number;
  plant: {
    id: number;
    color: string;
    price: number,
    stock: number
  },
  product: Product
}

export type Bouquet = {
  id: number;
  quantity: number;
  bouquet: {
    id: number;
    price: number,
    stock: number
  },
  product: Product
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
      return data.result;
    })
    .then(result => setCart(result))
    .then(() => setIsLoading(false))
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

const scrollTop = () => window['scrollTo']({ top: 0, behavior: 'smooth' });

export const ShoppingCart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [cartSuccess, setCartSuccess] = useState(false);
    const [fetchCart, setFetchCart] = useState(false);
    const {user, token, cartId, UpdateCartId} = useContext(UserContext);
    
    const [cart, setCart] = useState<Cart>(null);
    const [deliveryType, setDeliveryType] = useState(DeliveryTypes[0]);
    const [courierType, setCourierType] = useState(CourierTypes[0]);

    const [country, setCountry] = useState(user?.country);
    const [street, setStreet] = useState(user?.street);
    const [addressLine1, setAddressLine1] = useState(user?.addressLine1);
    const [addressLine2, setAddressLine2] = useState(user?.addressLine2);
    const [email, setEmail] = useState(user?.email);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [cartError, setCartError] = useState(null);

    const setWindowTo = ((to) => {
        if (deliveryType !== to) {
            setIsLoading(false);
        }
    });

    useEffect(() => {
      setFetchCart(false);
      //if(cartId === null || cartId === 0) return;

      setIsCartLoading(true);
      fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}`, {
          method: 'GET',
          headers: {
            'Authorization': token || ''
          }
        })
        .then(response => response.json())
        .then(data => { 
          setIsCartLoading(false);
          if(data.isError){
            if(data.status === 404){
              setCart(null);
              UpdateCartId(0);
              setIsCartLoading(false);
            }
          }else{
            setCart(data.result);
            setIsCartLoading(false)
          }
        })
        .catch(() => {
          setIsCartLoading(false);
          setCart(null);
          setCartError("Could not establish connection to server. Please try again!");
        });
    }, [cartId, fetchCart]);

    const HandleDeliveryType = (event) => {
        setDeliveryType(DeliveryTypes[event.currentTarget.value]);
        setWindowTo(event.currentTarget.value);
    };

    const RenderDeliveryInfo = (() => {
        if (deliveryType == DeliveryTypes[0])
            return DeliveryInfo(cartId, user, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail, UpdateCartId, setFetchCart);
        else if (deliveryType == DeliveryTypes[1])
            return CourierInfo(cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail, UpdateCartId, setFetchCart);
        else 
            return PickUpInfo(cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail, UpdateCartId, setFetchCart);
    });

    const DeleteItemById = async (itemId: number, productType: string) => {

      return await fetch(process.env.REACT_APP_API_URL + `ShoppingCart/${cartId}/${itemId}/${productType}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token || ''
        }
      })
      .then(response => response.json())
      .then(data => {
        if(!data.isError){
          setFetchCart(true);
        }
      })
      .catch((err) => null);
  }

  const Row = ((props: { row: Cart }) => {
    const { row } = props;
    
    return (
        <React.Fragment>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={true} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table size="medium" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell/>
                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Product</TableCell>
                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Quantity</TableCell>
                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Pcs. price (€)</TableCell>
                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Color</TableCell>
                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Size</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.plants.map((plant) => (
                        <TableRow key={plant.id}>
                          <TableCell>
                            <button onClick={() => DeleteItemById(plant.id, 'Plant')} style={{background: 'rgb(209, 26, 42)', maxWidth: '80px', fontFamily: 'open sans', fontSize: '12pt'}}>Remove</button>
                          </TableCell>
                          <TableCell align="center">{plant.product.name}</TableCell>
                          <TableCell align="center">{plant.quantity}</TableCell>
                          <TableCell align="center">{plant.plant.price + '€'}</TableCell>
                          <TableCell align="center">{plant.plant.color}</TableCell>
                          <TableCell align="center">-</TableCell>
                        </TableRow>
                      ))}
                      {row.pots.map((pot) => (
                        <TableRow key={pot.id}>
                          <TableCell>
                            <button onClick={() => DeleteItemById(pot.id, 'Pot')} style={{background: 'rgb(209, 26, 42)', maxWidth: '80px', fontFamily: 'open sans', fontSize: '12pt'}}>Remove</button>
                          </TableCell>
                          <TableCell align="center">{pot.product.name}</TableCell>
                          <TableCell align="center">{pot.quantity}</TableCell>
                          <TableCell align="center">{pot.pot.price}€</TableCell>
                          <TableCell align="center">{pot.pot.color}</TableCell>
                          <TableCell align="center">{pot.pot.size}</TableCell>
                        </TableRow>
                      ))}
                      {row.bouquets.map((bouquet) => (
                        <TableRow key={bouquet.id}>
                          <TableCell>
                            <button onClick={() => DeleteItemById(bouquet.id, 'Bouquet')} style={{background: 'rgb(209, 26, 42)', maxWidth: '80px', fontFamily: 'open sans', fontSize: '12pt'}}>Remove</button>
                          </TableCell>
                          <TableCell align="center">{bouquet.product.name}</TableCell>
                          <TableCell align="center">{bouquet.quantity}</TableCell>
                          <TableCell align="center">{bouquet.bouquet.price}€</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    });    

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
                            <h2 className='shopping-cart-h2'>Shopping Cart info</h2>
                            <hr style={{marginTop: '30px'}}></hr>
                            <div>
                                { Spinner("", isCartLoading, cartSuccess) }
                                {cart == null && !isCartLoading ? <h6>Cart is empty!</h6> :
                                <div style={{marginLeft: '20px', marginRight: '20px'}}>
                                    <div style={{margin: '-50px -70px 0px 0px'}}>
                                        <div className="custom-container" style={{display: 'flex', alignItems: 'center', overflowY: 'auto'}}>
                                          <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table">
                                                <TableBody>
                                                {cart && <Row key={cart.id} row={cart} />}
                                                </TableBody>
                                            </Table>
                                          </TableContainer>
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

const DeliveryInfo = ((cartId, user, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail, updateCartId, setFetchCart) => {
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
            "country": country || user?.country || '',
            "street": street || user?.street || '',
            "addressLine1": addressLine1 || user?.addressLine1 || '',
            "addressLine2": addressLine2 || user?.addressLine2 || ''
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            updateCartId(0);
            setFetchCart(true);
            scrollTop();
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

const CourierInfo = ((cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail, updateCartId, setFetchCart) => {
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
            "country": country || user?.country || '',
            "street": street || user?.street || '',
            "addressLine1": addressLine1 || user?.addressLine1 || '',
            "addressLine2": addressLine2 || user?.addressLine2 || ''
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            updateCartId(0);
            setFetchCart(true);
            scrollTop();
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

const PickUpInfo = ((cartId, user, token, courierType, setCourierType, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2, email, setEmail, updateCartId, setFetchCart) => {
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
            "country": country || user?.country || '',
            "street": street || user?.street || '',
            "addressLine1": addressLine1 || user?.addressLine1 || '',
            "addressLine2": addressLine2 || user?.addressLine2 || ''
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            updateCartId(0);
            setFetchCart(true);
            scrollTop();
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true);})
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    return (
        <div>
        <form onSubmit={(event) => PerformPayment(event)}>
            <hr />
            <div className="custom-container">
                <div className="input-div">
                    <Label>Email</Label>
                    <FormLine type="text" inputValue={email} setInputValue={setEmail} placeholder='Enter your email' regex="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onInvalidMessage="Invalid email address." isRequired={true} isAutoComplete={"false"} isDisabled={false} />
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
                <div style={{height: '10px', margin: '10px', textDecoration: 'underline', color: 'green', textAlign: 'center'}}>Successfully updated!</div>
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
