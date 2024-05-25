import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";

const ClubRoom = ({ isLoggedIn }) => {
    const [options, setOptions] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [fetchError, setFetchError] = useState(false);
    const [formFields, setFormFields] = useState([]);

    const domenServer =  "https://rezervace.buk.cvut.cz:8000"
    useEffect(() => {
        axios.get(domenServer+"/calendars/alias/klub")
            .then(response => {
                const data = response.data;
                const newOptions = data.map(name => ({ value: name, label: name }));
                setOptions(newOptions);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const clubRoomCalendarLink = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FPrague&bgcolor=%23B39DDB&title=Club%20Room&showCalendars=0&showTz=0&showPrint=0&hl=en&src=Y185MGMwNTM1ODNkNGQyYWUxNTY1NTFjNmVjZDMxMWY4N2RhZDYxMGEzMjcyNTQ1YzM2Mzg3OTY0NWY2OTY4Y2VmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18xOTU4NmEzZGE1MGNhMDY1NjZlZjYyMDEyZDY4MjllYmY0ZTMwMjYxMDgyMTJlOWY5ZDBjYzJmYzZiYzdjNDRhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y180ZjNjY2I5YjI1ZTNlMzdiYzFkY2VhODc4NGE4YTExNDQyZDM5ZTcwMDgwOWExMmJlZTIxYmJlZWI2N2FmNzY1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y184ZmM4YzY3NjBmN2UzMmVkNTc3ODVjZjQ3MzlkYzYzZTQwNmI0YTgwMmFlZWM2NWNhMGIxYTNmNTY2OTYyNjNkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19hYzg5MzBiMDAwZTQzODE4NzA3ZDZmZjVlYzRlNDBiN2VmNTI5ZjRkYjc5MDg5Y2Q1YzNlZGFhM2I1OWZiNDFiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23795548&color=%234285F4&color=%234285F4&color=%239E69AF&color=%239E69AF";

    useEffect(() => {
        if (selectedType) {
            axios.get(`/calendars/type/${selectedType}`)
                .then(response => {
                    const data = response.data;
                    const newAdditionalServices = data.map(service => ({ value: service, label: service }));
                    setAdditionalServices(newAdditionalServices);
                    setFetchError(false); // Reset fetch error if successful response
                })
                .catch(error => {
                    console.error("Error fetching additional services:", error);
                    setAdditionalServices([]); // Set additional services to empty array on error
                    setFetchError(true); // Set fetch error flag
                });
        }
    }, [selectedType]);

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption.value);
    };

    useEffect(() => {
        setFormFields([
            {
                name: 'date',
                type: 'date',
                labelText: 'Date',
                labelColor: 'text-warning',
            },
            {
                name: 'startTime',
                type: 'time',
                labelText: 'Start Time',
                labelColor: 'text-danger',
                validation: (value) => {
                    const startTime = new Date();
                    startTime.setHours(8, 0, 0, 0);
                    return value >= startTime;
                },
            },
            {
                name: 'endTime',
                type: 'time',
                labelText: 'End Time',
                labelColor: 'text-danger',
                validation: (value) => {
                    const endTime = new Date();
                    endTime.setHours(22, 0, 0, 0);
                    return value <= endTime;
                },
            },
            {
                name: 'type',
                type: 'select',
                labelText: 'Type of Reservation',
                labelColor: 'text-primary',
                options: options,
            },
            {
                name: 'additionalServices',
                type: 'checkbox',
                labelText: 'Additional Services',
                labelColor: 'text-primary',
                options: fetchError ? [] : additionalServices, // Render empty array if there's a fetch error
            },
            {
                name: 'purpose',
                type: 'text',
                labelText: 'Purpose',
                labelColor: 'text-success',
            },
            {
                name: 'guests',
                type: 'number',
                labelText: 'Number of Guests',
                labelColor: 'text-success',
                validation: (value) => value < 40,
            },
            {
                name: 'comment',
                type: 'text',
                labelText: 'Comment',
                labelColor: 'text-success',
            },
        ]);
    }, [options, additionalServices, fetchError]);

    const handleSubmit = (formData) => {
        axios.post('/calendars/reservation_type/', formData)
            .then(response => {
                console.log('Reservation successful', response);
            })
            .catch(error => {
                console.error('Error making reservation:', error);
            });
    };

    return (
        <div>
            {isLoggedIn ? (
                <ReservationForm formFields={formFields} onSubmit={handleSubmit} onTypeChange={handleTypeChange} />
            ) : (
                <LoginInfo />
            )}
            <GoogleCalendar src={clubRoomCalendarLink} />
        </div>
    );
};

export default ClubRoom;
