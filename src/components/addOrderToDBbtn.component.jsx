import React, { useState, useEffect } from 'react';
import axios from "axios"
const URL_TRIP = 'http://localhost:5000/trip'

const AddOrderToDBbtn = (tripsArr) => {


    const [ordersArr, setOrdersArr] = useState([]);
    const [isOrderAdded, setIsOrderAdded] = useState(false);



    const getData = async () => {
        const { data } = await axios.get(URL_TRIP);
        setOrdersArr(data.order);
    };

    useEffect(() => {
        getData();
    }, []);










    function handleTripPOSTrequest() {
        axios.post(URL_TRIP, { order: tripsArr })
            .then(res => {
                console.log(res.data.tripsArr);
                setIsOrderAdded(true)

            })
            .catch(function (error) {
                console.log(error);
            });
    }




    return (
        <div>

            <button onClick={handleTripPOSTrequest}>Додати наказ до бази данних</button>
            <h3>Минулі накази</h3>




        </div>

    )
}

export default AddOrderToDBbtn