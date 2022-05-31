import React, { useContext, useEffect, useState } from "react";
import './OrdersAdmin.scss';
import { User, UserContext } from "../contexts/UserContext";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { Spinner } from "../UserSettings/UserSettingsScreen";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
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
    price: number,
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
            .catch(() => {console.log('Could not retrieve user orders.'); setUserOrders([])});
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
                                                    <Row key={row.id} row={row} />
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

export const Row = ((props: { row: Order }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
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
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.createdAt}</TableCell>
          <TableCell align="right">{row.updatedAt}</TableCell>
          <TableCell align="right">{GetStatus(row.status)}</TableCell>
          <TableCell align="right">{GetDelivery(row.delivery)}</TableCell>
          <TableCell align="right">{row.country}</TableCell>
          <TableCell align="right">{row.street}</TableCell>
          <TableCell align="right">{row.addressLine1}</TableCell>
          <TableCell align="right">{row.addressLine2}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Color</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Pcs. price (€)</TableCell>
                      <TableCell align="right">Pcs. price (€)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.cart.plants.map((plant) => (
                      <TableRow key={plant.id}>
                        <TableCell>{plant.name}</TableCell>
                        <TableCell component="th" scope="row">
                          {plant.description ? plant.description : '' }
                        </TableCell>
                        <TableCell>{plant.color}</TableCell>
                        <TableCell>{plant.quantity}</TableCell>
                        <TableCell align="right">{plant.price}</TableCell>
                      </TableRow>
                    ))}
                    {row.cart.pots.map((pot) => (
                      <TableRow key={pot.id}>
                        <TableCell>{pot.name}</TableCell>
                        <TableCell component="th" scope="row">
                          {pot.description ? pot.description : '' }
                        </TableCell>
                        <TableCell>{pot.color}</TableCell>
                        <TableCell>{pot.size}</TableCell>
                        <TableCell>{pot.quantity}</TableCell>
                        <TableCell align="right">{pot.price}</TableCell>
                      </TableRow>
                    ))}
                    {row.cart.bouquets.map((bouquet) => (
                      <TableRow key={bouquet.id}>
                        <TableCell>{bouquet.name}</TableCell>
                        <TableCell component="th" scope="row">
                          {bouquet.description ? bouquet.description : '' }
                        </TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell>{bouquet.quantity}</TableCell>
                        <TableCell align="right">{bouquet.price}</TableCell>
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
