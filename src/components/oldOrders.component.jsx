import React, { useState, useEffect } from 'react';
import axios from "axios"
const URL_TRIP = 'http://localhost:5000/trip'

const OldOrders = (tripsArr) => {

    const [ordersArr, setOrdersArr] = useState([]);
    const [isOrderAdded, setIsOrderAdded] = useState(false);

    const getOldOrders = async () => {
        const { data } = await axios.get(URL_TRIP);
        const parsedData = data.map((orderFromDB) => {
            return (
                {
                    _id: orderFromDB._id,
                    order: JSON.parse(orderFromDB.order)
                }
            )
        })
        setOrdersArr(parsedData);
    };

    useEffect(() => {
        getOldOrders();
    }, []);






    return (
        <div className='oldOrders-wrapper'>
            <h3>Минулі накази</h3>
            <div className='oldOrders-container'>
                <ul>
                    {
                        ordersArr ?
                            ordersArr.map((order) => {
                                return (
                                    <li key={order._id}>
                                        <div>
                                            <p className="oldOrders-li"><span className="deleteBtn">X</span>{order.order[0].companyName} наказ № {order.order[0].orderNumber} від {order.order[0].orderDate} </p>
                                            <ul>
                                                {order.order.map((trip, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <p>{trip.tripNumber}. Відрядити {trip.position} {trip.employeNameAbr}  в {trip.location}, {trip.companyTo}   з {trip.tripStartDate} р. по {trip.tripEndDate} р. </p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </li>
                                )
                            })
                            : ""
                    }
                </ul>
            </div>
        </div>

    )
}

export default OldOrders