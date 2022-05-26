import React, { useContext, useState } from "react";
import './UserSettings.scss';
import UploadImageForm from "../ImageUploader/ImageUpload";
import { UserContext } from "../contexts/UserContext";
import { Label, Input, Table } from "reactstrap";
import { GetDelivery, GetStatus, Order } from "../Orders/OrdersAdminScreen";

export const UserSettingsScreen = () => {
    const orders = 'Orders';
    const userInfo = 'User Info';
    const billingInfo = 'Billing Info';
    const changePassword = 'Change Password';

    const {user, token, UpdateProfileImage, UpdateUserData} = useContext(UserContext);
    const [userOrders, setUserOrders] = useState<Array<Order>>([]);
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentOption, setCurrentOption] = useState(orders)
    const profileAvatarDefaultImage = require('../../assets/profile-avatar-default.png');

    const [profileFirstLastName, setProfileFirstLastName] = useState(user?.firstName + ` ` + user?.lastName);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [country, setCountry] = useState(user?.country);
    const [street, setStreet] = useState(user?.street);
    const [addressLine1, setAddressLine1] = useState(user?.addressLine1);
    const [addressLine2, setAddressLine2] = useState(user?.addressLine2);

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const setWindowTo = ((to) => {
        if (currentOption !== to) {
            setCurrentOption(to)
            setSuccess(false);
            setError(null);
            setIsLoading(false);
        }
    });

    const RenderCurrentWindow = (() => {
        if (currentOption == userInfo)
        return UserInfo(setProfileFirstLastName, UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, firstName, setFirstName, lastName, setLastName, username, setUsername, email, setEmail);
        if (currentOption == changePassword)
            return ChangePassword(token, success, setSuccess, error, setError, isLoading, setIsLoading, password, setPassword, rePassword, setRePassword);
        if (currentOption == billingInfo)
            return BillingInfo(UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2);
        return Orders(token, success, setSuccess, error, setError, isLoading, setIsLoading, userOrders, setUserOrders);
    });
    
    return (
        <div className="center-text">
            <div id="userSettingsForm">
                <div className="container">
                    <div className="user-row row">
                        <div className="leftPanel col-12 col-lg-4 panelBox">
                            <div>
                                <h2>{profileFirstLastName}</h2>
                                <h5><a className="bold disabled-link">@</a>{user?.username}</h5>
                            </div>
                            <div style={{margin: '50px'}}>
                                <img src={user?.profileImage || profileAvatarDefaultImage} className="profileImage disabled-link"/>
                            </div>
                            <div style={{marginLeft: '25px'}}>
                                <div style={{margin: '0px 10px'}}>
                                    <button onClick={handleOpenModal}>Upload New Photo</button>
                                    <UploadImageForm onResponse={UpdateProfileImage} isOpen={showModal} onAction={setShowModal}/>
                                    <div className="left-panel-additional-text">
                                        <div className="">Role: <a className="bold disabled-link">{user?.role === 1 ? `ADMIN` : 'USER'}</a></div>
                                        <div className="">Total orders: <a className="disabled-link">{userOrders?.length ?? 0}</a></div>
                                        <hr></hr>
                                        <div>Member Since: <a className="truncate disabled-link">{user?.createdAt?.split('T')[0]}</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rightPanel col-12 col-lg-8 panelBox">
                            <div className="header">
                                <h1 className="bold header-title">Account | {currentOption}</h1>
                                <div className="header-choices">
                                    <button onClick={() => setWindowTo(orders)} className="choice" style={{width: '130px', height: '40px', marginTop: '4px', borderBottom: '2px solid rgba(34,193,195,1)'}}>Orders</button>
                                    <button onClick={() => setWindowTo(userInfo)} className="choice" style={{width: '150px', height: '40px', marginTop: '4px', borderBottom: '2px solid rgba(34,193,195,1)'}}>User Info</button>
                                    <button onClick={() => setWindowTo(billingInfo)} className="choice" style={{width: '140px', height: '40px', marginTop: '4px', borderBottom: '2px solid rgba(34,193,195,1)'}}>Billing Info</button>
                                    <button onClick={() => setWindowTo(changePassword)} className="choice" style={{width: '200px', height: '40px', marginTop: '4px', borderBottom: '2px solid rgba(34,193,195,1)'}}>Change Password</button>
                                </div>
                            </div>
                            { RenderCurrentWindow() }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export const Spinner = ((error, isLoading, success) => {
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

const UserInfo = ((setProfileFirstLastName, UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, firstName, setFirstName, lastName, setLastName, username, setUsername, email, setEmail) => {
    const UpdateUserInfo = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await fetch(process.env.REACT_APP_API_URL + 'User', {
          method: 'PUT',
          headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": email
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
            setProfileFirstLastName(firstName + ' ' + lastName);
            UpdateUserData(null, false);
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true); })
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    return (
    <div style={{margin: '20px'}}>
        <form onSubmit={(event) => UpdateUserInfo(event)}>
        <div className="custom-container">
            <div className="input-div">
                <Label>First Name</Label>
                <FormLine type="text" inputValue={firstName} setInputValue={setFirstName} placeholder='Enter your first name' regex="[\s\S]*" onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false} />
            </div>
            <div className="input-div-right">
                <Label>Last Name</Label>
                <FormLine type="text" inputValue={lastName} setInputValue={setLastName} placeholder='Enter your last name' regex="[\s\S]*" onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={false}  />
            </div>
        </div>
        <div className="custom-container">
            <div className="input-div">
                <Label>Username</Label>
                <FormLine type="text" inputValue={username} setInputValue={setUsername} placeholder='Enter username' regex={null} onInvalidMessage={null} isRequired={false} isAutoComplete={"false"} isDisabled={true}  />
            </div>
            <div className="input-div-right">
                <Label>Email</Label>
                <FormLine type="text" inputValue={email} setInputValue={setEmail} placeholder='Enter your email' regex="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onInvalidMessage="Invalid email address." isRequired={true} isAutoComplete={"false"} isDisabled={false}  />
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

const BillingInfo = ((UpdateUserData, token, success, setSuccess, error, setError, isLoading, setIsLoading, country, setCountry, street, setStreet, addressLine1, setAddressLine1, addressLine2, setAddressLine2) => {
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
        <div style={{margin: '20px'}}>
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
            { Spinner(error, isLoading, success) }
            <div className="update-info-button">
                <button type="submit" style={{marginTop: '30px'}}>Update</button>
            </div>
        </form>
    </div>
    );
});

const ChangePassword = ((token, success, setSuccess, error, setError, isLoading, setIsLoading, password, setPassword, rePassword, setRePassword) => {
    const UpdatePassword = async () => {
        setIsLoading(true);
        await fetch(process.env.REACT_APP_API_URL + 'User', {
          method: 'PUT',
          headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "password": password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.isError === true) {
            setSuccess(false);
            setError(data.error.message);
          } else {
            setError(null);
          }
        })
        .then(() => { setIsLoading(false); setSuccess(true) })
        .catch(() => setError("Could not establish connection to server. Please try again!"));
      }

    const PerformValidatedAction = ((event) => {
        event.preventDefault();
        if (password !== rePassword) setError('Passwords must match!')
        else UpdatePassword();
    });

    return (
    <div style={{margin: '20px'}}>
        <form onSubmit={(event) => PerformValidatedAction(event)}>
            <div className="custom-container">
                <div className="input-div">
                    <Label>New password</Label>
                    <FormLine type="text" inputValue={password} setInputValue={setPassword} placeholder='Enter your password'
                        regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$"
                        onInvalidMessage="Password must be between 8-16 characters long and contain one upper letter, lower letter and number."
                        isRequired={true} isAutoComplete={"false"} isDisabled={false}  />
                </div>
                <div className="input-div-right">
                    <Label>Re-enter new password</Label>
                    <FormLine type="text" inputValue={rePassword} setInputValue={setRePassword} placeholder='Enter your password'
                        regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$"
                        onInvalidMessage="Password must be between 8-16 characters long and contain one upper letter, lower letter and number."
                        isRequired={true} isAutoComplete={"false"} isDisabled={false}  />
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

const Orders = ((token, success, setSuccess, error, setError, isLoading, setIsLoading, userOrders, setUserOrders) => {
    const FetchUserOrders = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const mockedList = 
        [
            {
                id: 1,
                price: 20.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(0),
                delivery: GetDelivery(0),
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
                status: GetStatus(1),
                delivery: GetDelivery(2),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 4,
                price: 720.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(2),
                delivery: GetDelivery(3),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 1,
                price: 20.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(0),
                delivery: GetDelivery(0),
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
                status: GetStatus(1),
                delivery: GetDelivery(2),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 4,
                price: 720.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(2),
                delivery: GetDelivery(3),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 1,
                price: 20.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(0),
                delivery: GetDelivery(0),
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
                status: GetStatus(1),
                delivery: GetDelivery(2),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 4,
                price: 720.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(2),
                delivery: GetDelivery(3),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 1,
                price: 20.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(0),
                delivery: GetDelivery(0),
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
                status: GetStatus(1),
                delivery: GetDelivery(2),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 4,
                price: 720.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(2),
                delivery: GetDelivery(3),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 1,
                price: 20.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(0),
                delivery: GetDelivery(0),
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
                status: GetStatus(1),
                delivery: GetDelivery(2),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 4,
                price: 720.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(2),
                delivery: GetDelivery(3),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 1,
                price: 20.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(0),
                delivery: GetDelivery(0),
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
                status: GetStatus(1),
                delivery: GetDelivery(2),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
            {
                id: 4,
                price: 720.00,
                createdAt: "2022-05-22",
                updatedAt: "2022-05-24",
                status: GetStatus(2),
                delivery: GetDelivery(3),
                country: "Lithuania",
                street: "Naugarduko g.",
                addressLine1: "99",
                addressLine2: "",
            },
        ];

        setIsLoading(false);
        setUserOrders(mockedList);
      }

    return (
    <div className="orders-layout">
        <form onSubmit={(event) => FetchUserOrders(event)}>
            <div style={{display: 'flex', marginBottom: '10px'}}>
                <button type="submit" style={{marginTop: '10px'}}>Refresh</button>
                <div className="orders-spinner">{ Spinner(error, isLoading, success) }</div>
            </div>
            <div className="custom-container" style={{display: 'flex', alignItems: 'center', maxHeight: '250px', overflowY: 'auto'}}>
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
                    { !isLoading && userOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{order?.id}</td>
                            <td>{(order?.price ?? 0.00) + '€'}</td>
                            <td>{order?.createdAt}</td>
                            <td>{order?.updatedAt}</td>
                            <td>{order?.status}</td>
                            <td>{order?.delivery}</td>
                            <td>{order?.country}</td>
                            <td>{order?.street}</td>
                            <td>{order?.addressLine1}</td>
                            <td>{order?.addressLine2}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </form>
    </div>
    );
});
