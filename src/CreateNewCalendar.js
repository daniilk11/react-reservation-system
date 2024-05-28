import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginInfo from "./LoginInfo";

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
            // axios.get(`${config.domenServer}/calendars/alias/${selectedType}`)
            axios.get(`${config.domenServer}/calendars/`)
                .then(response => {
                    const data = response.data;
                    const newOptions = data.map((calendar) => ( calendar.service_alias === selectedType ?
                        { value: calendar.calendar_id, label: calendar.event_name } : null));
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
                validation: (value) => value,
            },
            errFetchingAdditionalServices ? { type: "empty" } : {
                name: 'mini_services',
                type: 'checkbox',
                labelText: 'Mini Services',
                labelColor: 'text-success',
                options: additionalServices,
            },
            {
                name: 'collision_with_itself',
                type: 'checkbox',
                sybType: 'oneCheckbox',
                labelText: 'Collision With Itself',
                labelColor: 'text-success',
                options: [{ value: 'true', label: 'True' }],
                validation: (value) => value,
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
                        sybType: 'oneCheckbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'club_reservation_more_24_hours',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
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
                        sybType: 'oneCheckbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'active_reservation_more_24_hours',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
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
                        sybType: 'oneCheckbox',
                        labelText: 'Night Time',
                        labelColor: 'text-success',
                        options: [{ value: 'true', label: 'True' }],
                    },
                    {
                        name: 'manager_reservation_more_24_hours',
                        type: 'checkbox',
                        sybType: 'oneCheckbox',
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

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleChange = (e, field) => {
        const { name, value, type, checked } = e.target;

        setFormData(prevData => {
            if (type === 'checkbox') {
                const currentValues = prevData[name] || [];
                if (checked) {
                    return {
                        ...prevData,
                        [name]: [...currentValues, value],
                    };
                } else {
                    return {
                        ...prevData,
                        [name]: currentValues.filter(item => item !== value),
                    };
                }
            } else {
                return {
                    ...prevData,
                    [name]: value,
                };
            }
        });

        if (field.name === 'service_alias') {
            setSelectedType(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            ...formData,
            club_member_rules: {
                night_time: !!formData.club_night_time,
                reservation_more_24_hours: !!formData.club_reservation_more_24_hours,
                in_advance_hours: Number(formData.club_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.club_in_advance_minutes) || 0,
                in_advance_day: Number(formData.club_in_advance_day) || 0
            },
            active_member_rules: {
                night_time: !!formData.active_night_time,
                reservation_more_24_hours: !!formData.active_reservation_more_24_hours,
                in_advance_hours: Number(formData.active_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.active_in_advance_minutes) || 0,
                in_advance_day: Number(formData.active_in_advance_day) || 0
            },
            manager_rules: {
                night_time: !!formData.manager_night_time,
                reservation_more_24_hours: !!formData.manager_reservation_more_24_hours,
                in_advance_hours: Number(formData.manager_in_advance_hours) || 0,
                in_advance_minutes: Number(formData.manager_in_advance_minutes) || 0,
                in_advance_day: Number(formData.manager_in_advance_day) || 0
            },
            collision_with_calendar: formData.collision_with_calendar || [],
            mini_services: formData.mini_services || []
        };

        axios.post(`${config.domenServer}/calendars/create_calendar?username=${username}`, requestData)
            .then((response) => {
                setSuccessMessage('Calendar created successfully!');
                setErrorMessage('');
            })
            .catch((error) => {
                console.error('Error making reservation:', error);
                setSuccessMessage('');
                setErrorMessage('Error creating calendar.');
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
                                    checked={
                                        Array.isArray(formData[field.name])
                                            ? formData[field.name].includes(option.value)
                                            : formData[field.name] === option.value
                                    }

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
        <div className="container mt-5">
            <LoginInfo isLoggedIn={isLoggedIn} onLogout={onLogout} username={username} />
            <h2>Create New Calendar</h2>
            <form onSubmit={handleSubmit}>
                {formFields.map((field, index) => (
                    field.type === 'group' ? (
                        <div key={index}>
                            <label className={`form-label ${field.labelColor}`}>{field.labelText}</label>
                            <div className="form-group">
                                {field.fields.map((subField, subIndex) => (
                                    subField.type === 'checkbox' ? (
                                        subField.sybType === 'oneCheckbox' ? (
                                            <div className="form-check" key={subIndex}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name={subField.name}
                                                    checked={!!formData[subField.name]}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="form-check-label">{subField.labelText}</label>
                                            </div>
                                        ) : (
                                            subField.options.map(option => (
                                                <div className="form-check" key={option.value}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name={subField.name}
                                                        value={option.value}
                                                        checked={formData[subField.name]?.includes(option.value) || false}
                                                        onChange={(e) => {
                                                            const { name, value } = e.target;
                                                            setFormData(prevData => {
                                                                const currentValues = prevData[name] || [];
                                                                if (e.target.checked) {
                                                                    return {
                                                                        ...prevData,
                                                                        [name]: [...currentValues, value],
                                                                    };
                                                                } else {
                                                                    return {
                                                                        ...prevData,
                                                                        [name]: currentValues.filter(v => v !== value),
                                                                    };
                                                                }
                                                            });
                                                        }}
                                                    />
                                                    <label className="form-check-label">{option.label}</label>
                                                </div>
                                            ))
                                        )
                                    ) : (
                                        <div className="mb-3" key={subIndex}>
                                            <label className={`form-label ${subField.labelColor}`}>{subField.labelText}</label>
                                            <input
                                                className="form-control"
                                                type={subField.type}
                                                name={subField.name}
                                                value={formData[subField.name] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ) : field.type === 'checkbox' ? (
                        <div key={index}>
                            <label className={`form-label ${field.labelColor}`}>{field.labelText}</label>
                            {field.options.map(option => (
                                <div className="form-check" key={option.value}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={field.name}
                                        value={option.value}
                                        checked={formData[field.name]?.includes(option.value) || false}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setFormData(prevData => {
                                                const currentValues = prevData[name] || [];
                                                if (e.target.checked) {
                                                    return {
                                                        ...prevData,
                                                        [name]: [...currentValues, value],
                                                    };
                                                } else {
                                                    return {
                                                        ...prevData,
                                                        [name]: currentValues.filter(v => v !== value),
                                                    };
                                                }
                                            });
                                        }}
                                    />
                                    <label className="form-check-label">{option.label}</label>
                                </div>
                            ))}
                        </div>
                    ) : field.type === 'select' ? (
                        <div className="mb-3" key={index}>
                            <label className={`form-label ${field.labelColor}`}>{field.labelText}</label>
                            <select
                                className="form-select"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => {
                                    setFormData({ ...formData, [field.name]: e.target.value });
                                    setSelectedType(e.target.value);
                                }}
                            >
                                <option value="">Select an option</option>
                                {field.options.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="mb-3" key={index}>
                            <label className={`form-label ${field.labelColor}`}>{field.labelText}</label>
                            <input
                                className="form-control"
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    )
                ))}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
    );
};

export default CreateNewCalendar;
