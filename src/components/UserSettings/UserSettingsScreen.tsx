import React, { useState } from "react";
import './UserSettings.scss';
import { Button } from "reactstrap";
import UploadImageForm from "../ImageUploader/ImageUpload";

export const UserSettingsScreen = () => {
    const [showModal, setShowModal] = useState(false)
    const [imageUrl, setImageUrl] = useState('https://i.ibb.co/2gNkvNx/5916b411eb0c.jpg')

    const handleOpenModal = () => {
        setShowModal(true)
    }
    
    return (
        <div className="center-text">
            <div id="userSettingsForm">
                <div className="container">
                    <div className="user-row row">
                        <div className="leftPanel col-12 col-lg-4 panelBox">
                            <div>
                                <h2>Firstname Surname</h2>
                                <h5><a className="bold disabled-link">@</a>username</h5>
                            </div>
                            <div style={{margin: '50px'}}>
                                <img src={imageUrl} className="profileImage disabled-link"/>
                            </div>
                            <div style={{marginLeft: '25px'}}>
                                <div style={{margin: '0px 10px'}}>
                                    <Button onClick={handleOpenModal}>Upload New Photo</Button>
                                    <UploadImageForm onResponse={setImageUrl} isOpen={showModal} onAction={setShowModal}/>
                                    <div className="left-panel-additional-text">
                                        <div className="">Role: <a className="bold disabled-link">ADMIN</a></div>
                                        <div className="">Total orders: <a className="disabled-link">193</a></div>
                                        <hr></hr>
                                        <div>Member Since: <a className="truncate disabled-link">2022-06-01</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rightPanel col-12 col-lg-8 panelBox">
                            <div className="header">
                                <h1 className="bold header-title">Edit Profile</h1>
                                <div className="header-choices">
                                    <div className="choice" style={{borderBottom: '2px solid rgba(34,193,195,1)'}}>User info</div>
                                    <div className="choice">Billing Information</div>
                                </div>
                            </div>
                            <div style={{margin: '20px'}}>
                            <form onSubmit={() => 1 == 1}>
                                <div className="container-float">
                                    <div>
                                        <div className="col-6 float-left">
                                            <label>Name</label>
                                            <input name="name" />
                                        </div>
                                        <div className="col-6">
                                            <label>Email</label>
                                            <input type="email" name="email"  />
                                        </div>
                                        <div className="col-6">
                                            <label>Password</label>
                                            <input type="password" name="password" />
                                        </div>
                                    </div>
                                </div>
                                <div className="update-info-button">
                                    <button>Update info</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
