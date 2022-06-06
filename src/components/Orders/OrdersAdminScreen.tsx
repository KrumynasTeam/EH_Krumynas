import React, { useContext, useEffect, useState } from "react";
import './OrdersAdmin.scss';
import { User, UserContext } from "../contexts/UserContext";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { Spinner } from "../UserSettings/UserSettingsScreen";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Select, MenuItem, FormControl } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type OrderCart = {
    id: number,
    orderId: number,
    plants: any[],
    pots: any[],
    bouquets: any[]
}

export type Order = {
    id: number,
    total: number,
    createdAt: string,
    updatedAt: string,
    status: number,
    delivery: number,
    country: string,
    street: string,
    addressLine1: string,
    addressLine2?: string,
    cart: OrderCart
}

export type OrderAddDto = {
    CartId: number,
    delivery: string,
    country: string,
    street: string,
    addressLine1: string,
    addressLine2?: string
}

export const OrderStatus = [
    "Ordered",
    "Accepted",
    "Cancelled",
    "Packing",
    "Delivering",
    "Completed"
];

export const OrderDelivery = [
    "Direct",
    "ToMailPost",
    "Courier",
    "SelfPickup"
];

export const GetStatus = ((value: number) => {
    if(OrderStatus[value] == null)
        return "UNDEFINED";
    return OrderStatus[value];
});

export const GetDelivery = ((value: number) => {
    if(OrderDelivery[value] == null)
        return "UNDEFINED";
    return OrderDelivery[value];
});

export const OrdersAdminScreen = () => {
    const {token} = useContext(UserContext);
    const [userOrders, setUserOrders] = useState<Array<Order>>([]);
    const [userList, setUserList] = useState<Array<User>>([]);
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const profileAvatarDefaultImage = require('../../assets/profile-avatar-default.png');
    const [activeSelection, setActiveSelection] = useState<User | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const defaultConnectionError = "Could not establish connection to the server. Please try again!";

    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.REACT_APP_API_URL + `ManageUser/Query/${searchInput}`, {
            method: 'GET',
            headers: { 'Authorization': token },
        })
        .then(response => response.json())
        .then(data => {
            if (data.isError === true) {
                setError(data.error.message);
            } else {
                setError(null);
                setUserList(data.result);
            }
        })
        .then(() => setIsLoading(false))
        .catch(() => setError(defaultConnectionError));
    }, [searchInput]);

    useEffect(() => {
        if (activeSelection != null) {
            fetch(process.env.REACT_APP_API_URL + `Order/User/${activeSelection?.id}`, {
                method: 'GET',
                headers: { 'Authorization': token },
            })
            .then(response => response.json())
            .then(data => {
                if (data.isError === true) {
                    setError(data.error.message);
                } else {
                    setError(null);
                    setUserOrders(data.result);
                }
            })
            .catch(() => {setUserOrders([]);});
        }
    }, [activeSelection]);

    const ClearSearchInput = ((event) => {
        event.preventDefault();
        setSearchInput('');
    });

    return (
        <div className="center-text">
            <div id="userSettingsForm">
                <div className="container">
                    <div className="user-row row">
                        <div className="rightPanel col-12 col-lg-12 panelBox">
                            <div className="header" style={{backgroundColor: 'white'}}>
                                <h1 className="bold header-title">Manage Orders</h1>
                                <hr></hr>
                                <form onSubmit={(event) => ClearSearchInput(event)} style={{maxWidth: '600px'}}>
                                    <div>
                                        <div style={{textAlign: 'left', marginLeft: '25px'}}>
                                            <h4>Search User Orders</h4>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <FormLine type="text" inputValue={searchInput} setInputValue={setSearchInput} placeholder='Enter username' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false} />
                                            <button className="orders-admin" type="submit">Clear</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="leftPanel col-12 col-lg-4 panelBox" style={{maxHeight: '520px', overflowY: 'scroll'}}>
                        <div>
                            <h4 className="orders-search-result">Search Result</h4>
                            { !isLoading ? 
                                <>
                                    <ListGroup className="uselectable" style={{cursor: 'pointer'}}>
                                        { userList.map((singleUser, index) => {
                                            return <ListGroupItem key={index} action onClick={() => setActiveSelection(singleUser)} active={index == (activeSelection || 0)}>
                                                        {singleUser.firstName + ' ' + singleUser.lastName + ' | ' + singleUser.username}
                                                    </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </>
                                : <>{ Spinner(error, isLoading, success) }</>
                            }
                            </div>
                        </div>
                        <div className="leftPanel col-12 col-lg-8 panelBox">
                            <div>
                            { activeSelection != null ?
                                <>
                                    { (activeSelection.firstName + ' ' + activeSelection.lastName).trim() != '' ?
                                        <h2>{activeSelection.firstName + ' ' + activeSelection.lastName}</h2>
                                        :
                                        <h2>&#8205;</h2>
                                    }
                                    <h5><a className="bold disabled-link">@</a>{activeSelection.username}</h5>
                                </>
                            :
                                <><h2>&#8205;</h2><h5 style={{color: 'lightblue', fontStyle: 'italic'}}>Not selected...</h5></>
                            }
                            </div>
                            <div style={{margin: '20px 0px 0px 0px'}}>
                                <img src={activeSelection?.profileImage || profileAvatarDefaultImage} className="profileImage disabled-link"/>
                            </div>
                            <div style={{marginLeft: '20px', marginRight: '20px'}}>
                                <hr></hr>
                                <div style={{margin: '0px -70px 0px 0px'}}>
                                    <div className="custom-container" style={{display: 'flex', alignItems: 'center', maxHeight: '300px', overflowY: 'auto'}}>
                                        <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell />
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Order ID#</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Total</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Created at</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Updated at</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Status</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Delivery</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Country</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Street</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Address Line 1</TableCell>
                                                        <TableCell align="center" style={{fontFamily: 'open sans'}}>Address Line 2</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {userOrders && userOrders.map((row) => (
                                                        <Row key={row.id} row={row} token={token} />
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        { userOrders.length < 1 ? <div>No orders.</div> : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const FormLine = ({ type, setInputValue, inputValue, placeholder, regex, onInvalidMessage, isRequired, isAutoComplete, isDisabled }) => (
    <Input
        className="orders-admin-input"
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

const Row = ((props: { row: Order, token: string }) => {
    const { row, token } = props;
    const [open, setOpen] = React.useState(false);
    const [fetchStatus, setFetchStatus] = React.useState(false);
    const [status, setStatus] = useState<number | string>(row.status);
    
    useEffect(() => {
        if (fetchStatus) {
            fetch(process.env.REACT_APP_API_URL + `Order`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': row.id,
                    'status': OrderStatus.indexOf(status.toString())
                })
            })
            .catch(() => console.log('error'));
        }
    }, [status]);

    const handleStatusSelect = ((e) => {
        const s: number = e.target.value;
        setStatus(OrderStatus[s]);
        setFetchStatus(true);
    });
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.id}
            </TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.total}€</TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.createdAt.split('T')[0]}</TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.updatedAt.split('T')[0]}</TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>
            <FormControl>
            <Select
                value={OrderStatus.indexOf(status.toString())}
                onChange={handleStatusSelect}
            >
                <MenuItem value={0}>{OrderStatus[0]}</MenuItem>
                <MenuItem value={1}>{OrderStatus[1]}</MenuItem>
                <MenuItem value={2}>{OrderStatus[2]}</MenuItem>
                <MenuItem value={3}>{OrderStatus[3]}</MenuItem>
                <MenuItem value={4}>{OrderStatus[4]}</MenuItem>
                <MenuItem value={5}>{OrderStatus[5]}</MenuItem>
            </Select>
            </FormControl>
            </TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.delivery}</TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.country || '-'}</TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.street || '-'}</TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.addressLine1 || '-'}</TableCell>
            <TableCell align="right" style={{textAlign: 'center'}}>{row.addressLine2 || '-'}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" style={{fontFamily: 'open sans'}}>
                  Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontFamily: 'open sans'}}>Product</TableCell>
                      <TableCell style={{fontFamily: 'open sans'}}>Color</TableCell>
                      <TableCell style={{fontFamily: 'open sans'}}>Size</TableCell>
                      <TableCell align="right" style={{fontFamily: 'open sans'}}>Quantity</TableCell>
                      <TableCell align="right" style={{fontFamily: 'open sans'}}>Pcs. price</TableCell>
                      <TableCell align="right" style={{fontFamily: 'open sans'}}>Total price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.cart.plants.map((plant) => (
                      <TableRow key={plant.id}>
                        <TableCell style={{fontFamily: 'open sans'}}>{plant.name}</TableCell>
                        <TableCell style={{fontFamily: 'open sans'}}>{plant.color}</TableCell>
                        <TableCell style={{fontFamily: 'open sans'}}>-</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{plant.quantity}</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{plant.price}€</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{plant.price * plant.quantity}€</TableCell>
                      </TableRow>
                    ))}
                    {row.cart.pots.map((pot) => (
                      <TableRow key={pot.id}>
                        <TableCell style={{fontFamily: 'open sans'}}>{pot.name}</TableCell>
                        <TableCell style={{fontFamily: 'open sans'}}>{pot.color}</TableCell>
                        <TableCell style={{fontFamily: 'open sans'}}>{pot.size}</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{pot.quantity}</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{pot.price}€</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{pot.price * pot.quantity}€</TableCell>
                      </TableRow>
                    ))}
                    {row.cart.bouquets.map((bouquet) => (
                      <TableRow key={bouquet.id}>
                        <TableCell style={{fontFamily: 'open sans'}}>{bouquet.name}</TableCell>
                        <TableCell style={{fontFamily: 'open sans'}}/>
                        <TableCell/>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{bouquet.quantity}</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{bouquet.price}€</TableCell>
                        <TableCell align="right" style={{fontFamily: 'open sans'}}>{bouquet.price * bouquet.quantity}€</TableCell>
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
