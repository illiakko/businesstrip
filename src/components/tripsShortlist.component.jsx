function TripsShortlist({ trips, removeTrip }) {


    if (trips.length === 0) {
        return (
            <p>Тут буде відображатись список відряджень прикріплених до наказу.</p>
        )
    } else {
        return (
            trips.map((trip, index) => {
                return (
                    <li key={index} >
                        <p>{trip.tripNumber}. Відрядити {trip.position} {trip.employeNameAbr}  в {trip.location}, {trip.companyTo}   з {trip.tripStartDate} р. по {trip.tripEndDate} р. <span className="deleteBtn" onClick={removeTrip} id={trip.id}>X</span></p>

                    </li>
                )
            })
        )
    }


}

export default TripsShortlist