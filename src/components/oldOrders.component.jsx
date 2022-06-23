import React from 'react';

const OldOrders = ({ oldOrdersArr, removeOrderFromDB }) => {

    return (
        <div className='oldOrders-wrapper'>
            <h3>Минулі накази</h3>
            <div className='oldOrders-container'>
                <ul>
                    {
                        oldOrdersArr.length !== 0 ?
                            oldOrdersArr.map((order) => {
                                return (
                                    <li key={order._id}>
                                        <div>
                                            <p className="oldOrders-li"><span id={order._id} className="deleteBtn" onClick={removeOrderFromDB} >X</span>{order.order[0].companyName} наказ № {order.order[0].orderNumber} від {order.order[0].orderDate} </p>
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