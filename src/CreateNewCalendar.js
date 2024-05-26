import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateNewCalendar = ({ isLoggedIn, onLogout, username }) => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedType, setSelectedType] = useState(null);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [collisionWithCalendarOptions, setCollisionWithCalendarOptions] = useState([]);
    const [errFetchingAdditionalServices, setErrFetchingAdditionalServices] = useState(true);
    const [errFetchingTypeOfReservations, setErrFetchingTypeOfReservations] = useState(true);

    useEffect(() => {
        if (selectedType) {
            axios.get(`${config.domenServer}/mini_services/alias/${selectedType}`)
                .then(response => {
                    const data = response.data;
                    const newAdditionalServices = data.map(service => ({ value: service.name, label: service.name }));
                    setAdditionalServices(newAdditionalServices);
                    setErrFetchingAdditionalServices(false);
                })
                .catch(error => {
                    console.error("Error fetching additional services:", error);
                    setAdditionalServices([]);
                    setErrFetchingAdditionalServices(true);
                });
        }
    }, [selectedType]);

    useEffect(() => {
        if (selectedType) {
            axios.get(`${config.domenServer}/calendars/alias/${selectedType}`)
                .then(response => {
                    const data = response.data;
                    const newOptions = data.map(name => ({ value: name, label: name }));
                    setCollisionWithCalendarOptions(newOptions);
                    setErrFetchingTypeOfReservations(false);
                })
                .catch(error => {
                    console.error("Error fetching reservation types:", error);
                    setErrFetchingTypeOfReservations(true);
                });
        }
    }, [selectedType]);

    useEffect(() => {
        setFormFields([
            {
                name: 'calendar_id',
                type: 'text',
                labelText: 'Calendar ID (make google calendar first)',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'service_alias',
                type: 'select',
                labelText: 'Service Alias',
                labelColor: 'text-success',
                options: [
                    { value: 'klub', label: 'Klub' },
                    { value: 'stud', label: 'Stud' },
                    { value: 'grill', label: 'Grill' },
                ],
                validation: (value) => !!value,
            },
            errFetchingTypeOfReservations ? { type: "empty" } : {
                name: 'collision_with_calendar',
                type: 'checkbox',
                labelText: 'Collision With Calendar',
                labelColor: 'text-success',
                options: collisionWithCalendarOptions,
                validation: (value) => value === 'true',
            },
            errFetchingAdditionalServices ? { type: "empty" } : {
                name: 'mini_services',
                type: 'select',
                labelText: 'Mini Services',
                labelColor: 'text-success',
                options: additionalServices,
            },
            {
                name: 'collision_with_itself',
                type: 'checkbox',
                labelText: 'Collision With Itself',
                labelColor: 'text-success',
                options: [{ value: 'true', label: 'True' }],
                validation: (value) => value === 'true',
            },
            {
                name: 'reservation_type',
                type: 'text',
                labelText: 'Reservation Type',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'event_name',
                type: 'text',
                labelText: 'Event Name',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'max_people',
                type: 'number',
                labelText: 'Max People',
                labelColor: 'text-success',
                validation: (value) => value >= 0,
            },
            {
                name: 'club_member_rules',
                type: 'group',
                labelText: 'Club Member Rules',
                fields: [
                    {
                        name: 'club_night_time',
                        type: 'checkbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'club_reservation_more_24_hours',
                        type: 'checkbox',
                        labelText: 'Reservation More Than 24 Hours',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'club_in_advance_hours',
                        type: 'number',
                        labelText: 'In Advance Hours',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'club_in_advance_minutes',
                        type: 'number',
                        labelText: 'In Advance Minutes',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'club_in_advance_day',
                        type: 'number',
                        labelText: 'In Advance Day',
                        labelColor: 'text-success',
                    },
                ],
            },
            {
                name: 'active_member_rules',
                type: 'group',
                labelText: 'Active Member Rules',
                fields: [
                    {
                        name: 'active_night_time',
                        type: 'checkbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'active_reservation_more_24_hours',
                        type: 'checkbox',
                        labelText: 'Reservation More Than 24 Hours',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'active_in_advance_hours',
                        type: 'number',
                        labelText: 'In Advance Hours',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'active_in_advance_minutes',
                        type: 'number',
                        labelText: 'In Advance Minutes',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'active_in_advance_day',
                        type: 'number',
                        labelText: 'In Advance Day',
                        labelColor: 'text-success',
                    },
                ],
            },
            {
                name: 'manager_rules',
                type: 'group',
                labelText: 'Manager Rules',
                fields: [
                    {
                        name: 'manager_night_time',
                        type: 'checkbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'manager_reservation_more_24_hours',
                        type: 'checkbox',
                        labelText: 'Reservation More Than 24 Hours',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'manager_in_advance_hours',
                        type: 'number',
                        labelText: 'In Advance Hours',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'manager_in_advance_minutes',
                        type: 'number',
                        labelText: 'In Advance Minutes',
                        labelColor: 'text-success',
                    },
                    {
                        name: 'manager_in_advance_day',
                        type: 'number',
                        labelText: 'In Advance Day',
                        labelColor: 'text-success',
                    },
                ],
            },
        ]);
    }, [collisionWithCalendarOptions, additionalServices, errFetchingAdditionalServices, errFetchingTypeOfReservations]);

    const handleChange = (e, field) => {
        const { name, value, type, checked } = e.target;
        let updatedValue = value;

        if (field.type === 'checkbox') {
            updatedValue = checked ? 'true' : 'false';
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));

        if (field.name === 'service_alias') {
            setSelectedType(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${config.domenServer}/calendars/create_calendar?username=${username}`, formData)
            .then(response => {
                if (response.status === 201) {
                    console.log('Reservation successful', response);
                    setSuccessMessage('Reservation created successfully!');
                    setErrorMessage('');
                } else {
                    console.error('Error creating reservation', response);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating reservation. ${response.data.message}`);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.error('Error making reservation:', error);
                    setSuccessMessage('');
                    setErrorMessage(`401`);
                } else {
                    console.error('Error making reservation:', error);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating reservation, try again later.`);
                }
            });
    };

    const renderFormFields = (fields) =>
        fields.map((field) => {
            if (field.type === 'group') {
                return (
                    <div key={field.name} className="bg-light p-3 rounded mt-3">
                        <h5 className={field.labelColor}>{field.labelText}</h5>
                        {renderFormFields(field.fields)}
                    </div>
                );
            }
            if (field.type === 'empty') {
                return null;
            }
            return (
                <div className="form-group" key={field.name}>
                    <label htmlFor={field.name} className={field.labelColor}>
                        {field.labelText}
                    </label>
                    {field.type === 'checkbox' ? (
                        field.options.map((option) => (
                            <div key={option.value} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name={field.name}
                                    value={option.value}
                                    id={`${field.name}-${option.value}`}
                                    checked={formData[field.name] === 'true'}
                                    onChange={(e) => handleChange(e, field)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`${field.name}-${option.value}`}
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))
                    ) : field.type === 'select' ? (
                        <select
                            className="form-control"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(e, field)}
                        >
                            <option value="">Select an option</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            className="form-control"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(e, field)}
                        />
                    )}
                    {errors[field.name] && (
                        <div className="text-danger">{errors[field.name]}</div>
                    )}
                </div>
            );
        });

    return (
        <div>
            {isLoggedIn ? (
                errorMessage === '401' ? (
                    <Logout onLogout={onLogout} />
                ) : (
                    <>
                        <div className="container">
                            <h1
                                className="my-4 text-center text-white"
                                style={{
                                    background: 'linear-gradient(to right, #00b894, #008e7a)',
                                    padding: '20px 0',
                                }}
                            >
                                Create new Calendar
                            </h1>
                            <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                                {renderFormFields(formFields)}
                                <button type="submit" className="btn btn-secondary">
                                    Submit
                                </button>
                                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                            </form>
                        </div>
                    </>
                )
            ) : (
                <LoginInfo />
            )}
            <GoogleCalendar src="roomCalendarLink" />
        </div>
    );
};

export default CreateNewCalendar;
