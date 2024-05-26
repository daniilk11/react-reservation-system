import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import Logout from "./Logout";
import config from "./Config";

const CreateNewCalendar = ({ isLoggedIn, username, onLogout, roomCalendarLink, selectedZone }) => {
    const [options, setOptions] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [errFetchingAdditionalServices, seterrFetchingAdditionalServices] = useState(true);
    const [errFetchingTypeOfReservations, seterrFetchingTypeOfReservations] = useState(true);
    const [formFields, setFormFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        axios.get(`${config.domenServer}/calendars/alias/${selectedZone}`)
            .then(response => {
                const data = response.data;
                const newOptions = data.map(name => ({ value: name, label: name }));
                setOptions(newOptions);
                seterrFetchingTypeOfReservations(false); // Reset fetch error if successful response
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                seterrFetchingTypeOfReservations(true);
            });
    }, [selectedZone]);

    useEffect(() => {
        if (selectedType) {
            axios.get(`${config.domenServer}/calendars/type/${selectedType}`)
                .then(response => {
                    const data = response.data;
                    const newAdditionalServices = data.map(service => ({ value: service, label: service }));
                    setAdditionalServices(newAdditionalServices);
                    seterrFetchingAdditionalServices(false); // Reset fetch error if successful response
                })
                .catch(error => {
                    console.error("Error fetching additional services:", error);
                    setAdditionalServices([]); // Set additional services to empty array on error
                    seterrFetchingAdditionalServices(true); // Set fetch error flag
                });
        }
    }, [selectedType]);

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption.value);
    };

    useEffect(() => {
        setFormFields([
            {
                name: 'collision_with_itself',
                type: 'checkbox',
                labelText: 'Collision with itself',
                labelColor: 'text-success',
            },
            {
                name: 'club_member_rules.night_time',
                type: 'checkbox',
                labelText: 'Club Member - Night Time',
                labelColor: 'text-success',
            },
            {
                name: 'club_member_rules.reservation_more_24_hours',
                type: 'checkbox',
                labelText: 'Club Member - Reservation More Than 24 Hours',
                labelColor: 'text-success',
            },
            {
                name: 'club_member_rules.in_advance_hours',
                type: 'number',
                labelText: 'Club Member - In Advance Hours',
                labelColor: 'text-success',
            },
            {
                name: 'club_member_rules.in_advance_minutes',
                type: 'number',
                labelText: 'Club Member - In Advance Minutes',
                labelColor: 'text-success',
            },
            {
                name: 'club_member_rules.in_advance_day',
                type: 'number',
                labelText: 'Club Member - In Advance Days',
                labelColor: 'text-success',
            },
            {
                name: 'active_member_rules.night_time',
                type: 'checkbox',
                labelText: 'Active Member - Night Time',
                labelColor: 'text-success',
            },
            {
                name: 'active_member_rules.reservation_more_24_hours',
                type: 'checkbox',
                labelText: 'Active Member - Reservation More Than 24 Hours',
                labelColor: 'text-success',
            },
            {
                name: 'active_member_rules.in_advance_hours',
                type: 'number',
                labelText: 'Active Member - In Advance Hours',
                labelColor: 'text-success',
            },
            {
                name: 'active_member_rules.in_advance_minutes',
                type: 'number',
                labelText: 'Active Member - In Advance Minutes',
                labelColor: 'text-success',
            },
            {
                name: 'active_member_rules.in_advance_day',
                type: 'number',
                labelText: 'Active Member - In Advance Days',
                labelColor: 'text-success',
            },
            {
                name: 'manager_rules.night_time',
                type: 'checkbox',
                labelText: 'Manager - Night Time',
                labelColor: 'text-success',
            },
            {
                name: 'manager_rules.reservation_more_24_hours',
                type: 'checkbox',
                labelText: 'Manager - Reservation More Than 24 Hours',
                labelColor: 'text-success',
            },
            {
                name: 'manager_rules.in_advance_hours',
                type: 'number',
                labelText: 'Manager - In Advance Hours',
                labelColor: 'text-success',
            },
            {
                name: 'manager_rules.in_advance_minutes',
                type: 'number',
                labelText: 'Manager - In Advance Minutes',
                labelColor: 'text-success',
            },
            {
                name: 'manager_rules.in_advance_day',
                type: 'number',
                labelText: 'Manager - In Advance Days',
                labelColor: 'text-success',
            },

            {
                name: 'calendar_id',
                type: 'text',
                labelText: 'Calendar ID (make google calendar first)',
                labelColor: 'text-success',
            },
            // firs choose this
            {
                name: 'service_alias',
                type: 'text',
                labelText: 'Service Alias',
                labelColor: 'text-success',
            },
            // then get reservation type by alias /calenadars/alias/   add here
            {
                name: 'collision_with_calendar',
                type: 'text',
                labelText: 'Collision with calendar',
                labelColor: 'text-success',
                //  может оправить пустой массив
            },
            // then
            {
                name: 'mini_services',
                type: 'text', // check box type
                labelText: 'Mini Services',
                labelColor: 'text-success',
                //  может оправить пустой массив


                // get  to /mini_services/alias/  add here
                // what i get пройти по всем обьектам взять имена от туда .name
            },
            {
                name: 'reservation_type',
                type: 'text',
                labelText: 'Calendar Name',
                labelColor: 'text-success',
            },
            {
                name: 'event_name',
                type: 'text',
                labelText: 'Event Name',
                labelColor: 'text-success',
            },
            {
                name: 'max_people',
                type: 'number',
                labelText: 'Max People',
                labelColor: 'text-success',
            }
        ]);
    }, []);

    const handleSubmit = (formData) => {
        axios.post(config.domenServer + '/calendars/create_calendar?username='  + username, formData)
            .then(response => {
                if (response.status === 201) {
                    console.log('Reservation successful', response);
                    setSuccessMessage('Reservation created successfully!');
                    setErrorMessage('');
                } else {
                    console.error('', response);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating reservation. ${response.data.message}`);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    // 404 not found
                    // 400 bad request
                    console.error('Error making calendar:', error);
                    setSuccessMessage('');
                    setErrorMessage(`401`); // TODO make back end response to 401
                } else {
                    console.error('Error making calendar:', error);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating calendar`);
                }
            });
    };

    return (
        <div>
            {isLoggedIn ? (
                errorMessage === '401' ?
                    (<Logout onLogout={onLogout}/>) :
                    (
                        <>
                            <ReservationForm formFields={formFields} username={username} onSubmit={handleSubmit} onTypeChange={handleTypeChange} />
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </>)
            ) : (
                <LoginInfo />
            )}
        </div>
    );
};

export default CreateNewCalendar
