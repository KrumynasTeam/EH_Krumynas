import React, { useContext, useEffect, useState } from "react";
import './OrdersAdmin.scss';
import { User, UserContext } from "../contexts/UserContext";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { Spinner } from "../UserSettings/UserSettingsScreen";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
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
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
    

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
                                                    <TableCell>Dessert (100g serving)</TableCell>
                                                    <TableCell align="right">Calories</TableCell>
                                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((row) => (
                                                    <Row key={row.name} row={row} />
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
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