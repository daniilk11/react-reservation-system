import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateNewMiniService = ({ username }) => {
    const [formData, setFormData] = useState({
        name: '',
        service_alias: 'klub', // Default value set to 'klub'
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/mini_services/create_mini_service?username=${username}`, formData)
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
        <div className="container">
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
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
                    <label htmlFor="service_alias">Service Alias</label>
                    <select
                        className="form-control"
                        id="service_alias"
                        name="service_alias"
                        value={formData.service_alias}
                        onChange={handleChange}
                    >
                        <option value="klub">Klub</option>
                        <option value="stud">Stud</option>
                        <option value="grill">Grill</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
    );
};

export default CreateNewMiniService;
