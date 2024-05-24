import React from 'react';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";
import {NavLink} from "react-router-dom";

const ClubRoom = ({isLoggedIn}) => {
    const clubRoomCalendarLink = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FPrague&bgcolor=%23B39DDB&title=Club%20Room&showCalendars=0&showTz=0&showPrint=0&hl=en&src=Y185MGMwNTM1ODNkNGQyYWUxNTY1NTFjNmVjZDMxMWY4N2RhZDYxMGEzMjcyNTQ1YzM2Mzg3OTY0NWY2OTY4Y2VmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18xOTU4NmEzZGE1MGNhMDY1NjZlZjYyMDEyZDY4MjllYmY0ZTMwMjYxMDgyMTJlOWY5ZDBjYzJmYzZiYzdjNDRhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y180ZjNjY2I5YjI1ZTNlMzdiYzFkY2VhODc4NGE4YTExNDQyZDM5ZTcwMDgwOWExMmJlZTIxYmJlZWI2N2FmNzY1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y184ZmM4YzY3NjBmN2UzMmVkNTc3ODVjZjQ3MzlkYzYzZTQwNmI0YTgwMmFlZWM2NWNhMGIxYTNmNTY2OTYyNjNkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19hYzg5MzBiMDAwZTQzODE4NzA3ZDZmZjVlYzRlNDBiN2VmNTI5ZjRkYjc5MDg5Y2Q1YzNlZGFhM2I1OWZiNDFiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23795548&color=%234285F4&color=%234285F4&color=%239E69AF&color=%239E69AF";

    const formFields = [
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
            options: [
                // /calendars/alias/{service_alias}/ TODO  klub stud grill
                // check if in list  is service and then add it to  selecter
                { value: 'entireSpace', label: 'Entire Space' },
                { value: 'projector', label: 'Projector' },
                { value: 'pool', label: 'Pool' },
                { value: 'tableFootball', label: 'Table Football' },
            ],
            // вернуть массив с тем что выбрали
            // /calendars/reservation_type/entireSpace
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

        // { todO
        //     "start_datetime": "string",
        //     "end_datetime": "string",
        //     "purpose": "string",
        //     "guests": 0,
        //     "reservation_type": "string",
        //     "email": "string",
        //     "additional_services": [
        //         "string"
        //     ],
        //     "username": "string"
        // }
    ];


    return (
        <div>
            <GoogleCalendar src={clubRoomCalendarLink}/>
            {isLoggedIn ? ( // if the user is logged in, render the ReservationForm
                <ReservationForm formFields={formFields}/>
            ) : ( // if the user is not logged in, render the LoginInfo
                <LoginInfo/>
            )}
        </div>
    );
};

export default ClubRoom;
