import React, { useContext, useEffect, useState } from "react";
import './OrdersAdmin.scss';
import { User, UserContext } from "../contexts/UserContext";
import { Input, ListGroup, ListGroupItem, Table } from "reactstrap";
import { Spinner } from "../UserSettings/UserSettingsScreen";

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
    addressLine2?: string
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

    const mockedList = 
    [
        {
            id: 1,
            price: 20.00,
            createdAt: "2022-05-22",
            updatedAt: "2022-05-24",
            status: 0,
            delivery: 0,
            country: "Lithuania",
            street: "Naugarduko g.",
            addressLine1: "99",
            addressLine2: "",
        },
        {
            id: 2,
            price: 2.00,
            createdAt: "2022-05-22",
            updatedAt: "2022-05-24",
            status: 1,
            delivery: 2,
            country: "Lithuania",
            street: "Naugarduko g.",
            addressLine1: "99",
            addressLine2: "",
        },
        {
            id: 3,
            price: 720.00,
            createdAt: "2022-05-22",
            updatedAt: "2022-05-24",
            status: 2,
            delivery: 3,
            country: "Lithuania",
            street: "Naugarduko g.",
            addressLine1: "99",
            addressLine2: "",
        },
        {
            id: 4,
            price: 20.00,
            createdAt: "2022-05-22",
            updatedAt: "2022-05-24",
            status: 0,
            delivery: 0,
            country: "Lithuania",
            street: "Naugarduko g.",
            addressLine1: "99",
            addressLine2: "",
        },
        {
            id: 5,
            price: 2.00,
            createdAt: "2022-05-22",
            updatedAt: "2022-05-24",
            status: 1,
            delivery: 2,
            country: "Lithuania",
            street: "Naugarduko g.",
            addressLine1: "99",
            addressLine2: "",
        },
        {
            id: 6,
            price: 720.00,
            createdAt: "2022-05-22",
            updatedAt: "2022-05-24",
            status: 2,
            delivery: 3,
            country: "Lithuania",
            street: "Naugarduko g.",
            addressLine1: "99",
            addressLine2: "",
        }
    ];

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const ClearSearchInput = ((event) => {
        event.preventDefault();
        setSearchInput('');
    });

    const UpdateOrderState = ((value, index) => {
        if (userOrders[index] != null) {
            userOrders[index].status = value;
            setUserOrders(userOrders);
        }
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
                                        <Table responsive striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>Order ID#</th>
                                                <th>Price</th>
                                                <th>CreatedAt</th>
                                                <th>UpdatedAt</th>
                                                <th>Status</th>
                                                <th>Delivery</th>
                                                <th>Country</th>
                                                <th>Street</th>
                                                <th>Address Line 1</th>
                                                <th>Address Line 2</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { activeSelection != null ? mockedList.map((order, index) => (
                                                    <tr key={index}>
                                                        <td>{order.id}</td>
                                                        <td>{(order?.price ?? 0.00) + '€'}</td>
                                                        <td>{order?.createdAt}</td>
                                                        <td>{order?.updatedAt}</td>
                                                        <td>
                                                            <select value={order.status || 0} onChange={(event) => { UpdateOrderState(event.target.value, index) }}>
                                                                {OrderStatus.map((s, i) => <option key={i} value={i}>{s}</option>)}
                                                            </select>
                                                        </td>
                                                        <td>{order?.delivery}</td>
                                                        <td>{order?.country}</td>
                                                        <td>{order?.street}</td>
                                                        <td>{order?.addressLine1}</td>
                                                        <td>{order?.addressLine2}</td>
                                                    </tr>
                                                )) : <></>}
                                            </tbody>
                                        </Table>
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