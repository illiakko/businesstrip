import React, { useState } from 'react';
import axios from "axios"
const URL_TRIP = 'http://localhost:5000/trip'


function TripsShortlist({ trips, removeTrip }) {

    const [isOrderAdded, setIsOrderAdded] = useState(false);

    function handleTripPOSTrequest() {
        axios.post(URL_TRIP, { order: trips })
            .then(res => {
                console.log();
                setIsOrderAdded(true)
            })
            .catch(function (error) {
            });
    }


    if (trips.length === 0) {
        return (
            <p>Тут буде відображатись список відряджень прикріплених до наказу.</p>
        )
    } else {
        return (
            <div className="orderMenu__tripShortlist">

                <p>Відрядження прикріплені до наказу № {trips[0].orderNumber}:</p>
                <ul>
                    {trips.map((trip, index) => {
                        return (
                            <li key={index} >
                                <p><span className="deleteBtn" onClick={removeTrip} id={trip.id}>X</span> {trip.tripNumber}. Відрядити {trip.position} {trip.employeNameAbr}  в {trip.location}, {trip.companyTo}   з {trip.tripStartDate} р. по {trip.tripEndDate} р. {trip.tripPurposeShort}.</p>
                            </li>
                        )
                    })}
                </ul>

                <div className="btn__wrapper">
                    <p style={{ width: "300px" }} className="btn__text" onClick={handleTripPOSTrequest}>Додати наказ до бази данних</p>
                </div>

                <p style={{ margin: "auto" }}>або</p>
            </div >
        )
    }


}

export default TripsShortlist