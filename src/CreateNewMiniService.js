import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from "./Config";
import Logout from "./Logout";
import ReservationForm from "./ReservationForm";
import LoginInfo from "./LoginInfo";

const CreateNewMiniService = ({ isLoggedIn ,username }) => {
    const [formData, setFormData] = useState({
        name: '',
        service_alias: [], // Change to an array to handle multiple selections
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "service_alias") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked
                    ? [...prevFormData[name], value]
                    : prevFormData[name].filter((alias) => alias !== value),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${config.domenServer}/mini_services/create_mini_service?username=${username}`, formData)
            .then(response => {
                if (response.status === 201) {
                    console.log(response);
                    setSuccessMessage('Mini service created successfully!');
                    setErrorMessage('');
                } else {
                    console.error('Error:', response);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating mini service. ${response.data.message}`);
                }
            })
            .catch(error => {
                console.error('Error creating mini service:', error);
                setSuccessMessage('');
                setErrorMessage('Error creating mini service, try again later.');
            });
    };

    return (
        <>
            {isLoggedIn ? (
                <div className="container">
                    <h1
                        className="my-4 text-center text-white"
                        style={{
                            background: 'linear-gradient(to right, #00b894, #008e7a)',
                            padding: '20px 0',
                        }}
                    >
                        Create new Mini Service
                    </h1>
                    <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                        <div className="form-group">
                            <label htmlFor="name">Mini Service Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Service Alias</label>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="service_alias"
                                    value="klub"
                                    id="klub"
                                    checked={formData.service_alias.includes("klub")}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="klub">
                                    Klub
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="service_alias"
                                    value="stud"
                                    id="stud"
                                    checked={formData.service_alias.includes("stud")}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="stud">
                                    Stud
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="service_alias"
                                    value="grill"
                                    id="grill"
                                    checked={formData.service_alias.includes("grill")}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="grill">
                                    Grill
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </div> ) : (
                <LoginInfo />
            )}
        </>
    );
};

export default CreateNewMiniService;
