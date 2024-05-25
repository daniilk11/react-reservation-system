import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservationForm = ({ formFields, onSubmit, onTypeChange }) => {
    const [formData, setFormData] = useState({});

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

        // Call onTypeChange if the changed field is 'type'
        if (field.name === 'type' && onTypeChange) {
            onTypeChange({ value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center text-white" style={{ background: 'linear-gradient(to right, #00b894, #008e7a)', padding: '20px 0' }}>Reservation Form</h1>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                {formFields.map((field) => (
                    <div className="form-group" key={field.name}>
                        <label htmlFor={field.name} className={field.labelColor}>{field.labelText}</label>
                        {field.type === 'select' ? (
                            <select className="form-control" name={field.name} value={formData[field.name] || ''} onChange={(e) => handleChange(e, field)}>
                                <option value="">Select an option</option>
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : field.type === 'checkbox' ? (
                            <div>
                                {field.options.map((option) => (
                                    <div key={option.value} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={field.name}
                                            value={option.value}
                                            id={`${field.name}-${option.value}`}
                                            checked={(formData[field.name] || []).includes(option.value)}
                                            onChange={(e) => handleChange(e, field)}
                                        />
                                        <label className="form-check-label" htmlFor={`${field.name}-${option.value}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                className="form-control"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(e, field)}
                            />
                        )}
                    </div>
                ))}
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </div>
    );
};

export default ReservationForm;
