import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import Logout from "./Logout";
import config from "./Config";

// const CreateNewMiniService = ({ isLoggedIn, username, onLogout, roomCalendarLink, selectedZone }) => {
//     const [options, setOptions] = useState([]);
//     const [additionalServices, setAdditionalServices] = useState([]);
//     const [selectedType, setSelectedType] = useState(null);
//     const [errFetchingAdditionalServices, seterrFetchingAdditionalServices] = useState(true);
//     const [errFetchingTypeOfReservations, seterrFetchingTypeOfReservations] = useState(true);
//     const [formFields, setFormFields] = useState([]);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//
//
//
//     useEffect(() => {
//         axios.get(`${config.domenServer}/calendars/alias/${selectedZone}`)
//             .then(response => {
//                 const data = response.data;
//                 const newOptions = data.map(name => ({ value: name, label: name }));
//                 setOptions(newOptions);
//                 seterrFetchingTypeOfReservations(false); // Reset fetch error if successful response
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 seterrFetchingTypeOfReservations(true);
//             });
//     }, [selectedZone]);
//
//     useEffect(() => {
//         if (selectedType) {
//             axios.get(`${config.domenServer}/calendars/type/${selectedType}`)
//                 .then(response => {
//                     const data = response.data;
//                     const newAdditionalServices = data.map(service => ({ value: service, label: service }));
//                     setAdditionalServices(newAdditionalServices);
//                     seterrFetchingAdditionalServices(false); // Reset fetch error if successful response
//                 })
//                 .catch(error => {
//                     console.error("Error fetching additional services:", error);
//                     setAdditionalServices([]); // Set additional services to empty array on error
//                     seterrFetchingAdditionalServices(true); // Set fetch error flag
//                 });
//         }
//     }, [selectedType]);
//
//     const handleTypeChange = (selectedOption) => {
//         setSelectedType(selectedOption.value);
//     };


//     return (
//         <div>
//             {isLoggedIn ? (
//                 errorMessage === '401' ?
//                     (<Logout onLogout={onLogout}/>) :
//                     (
//                         <>
//                             <ReservationForm formFields={formFields} username={username} onSubmit={handleSubmit} onTypeChange={handleTypeChange} />
//                             {successMessage && <div className="alert alert-success">{successMessage}</div>}
//                             {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//                         </>)
//             ) : (
//                 <LoginInfo />
//             )}
//         </div>
//     );
// };


const CreateNewMiniService = ({ username }) => {
    const [formData, setFormData] = useState({
        name: '',
        service_alias: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState('klub');


    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        // const { name, value } = e.target;
        // setFormData({
        //     ...formData,
        //     [name]: value
        // });
    };




    const handleSubmit = (formData) => {
        axios.post(config.domenServer + '/mini_services/create_mini_service?username='+ username, formData)
            .then(response => {
                if (response.status === 201) {
                    console.log( response);
                    setSuccessMessage('Mini service created successfully!');
                    setErrorMessage('');
                } else {
                    console.error('', response);
                    setSuccessMessage('');
                    setErrorMessage(`Error creating mini service. ${response.data.message}`);
                }
            })
            .catch(error => {
                console.error('Error making mini service :', error);
                setSuccessMessage('');
                setErrorMessage(`Error creating mini service, try again later.`);

            });
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    {/*setFormFields([*/}
                    {/*// name mini services*/}
                    {/*// harcode selector klub stud griil*/}

                    <label htmlFor="service_alias">Service Alias</label>
                    <select
                        id="reservationType"
                        value={selectedOption}
                        onChange={handleChange}
                    >
                        <option value="klub">Klub</option>
                        <option value="stud">Stud</option>
                        <option value="grill">Grill</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>
    );
};


export default CreateNewMiniService
