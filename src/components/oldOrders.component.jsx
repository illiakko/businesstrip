import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsDownload } from 'react-icons/bs';

const OldOrders = ({ oldOrdersArr, removeOrderFromDB }) => {


    return (
        <div className='oldOrders__wrapper'>
            <h3>Минулі накази</h3>



            <div className='oldOrders__container'>
                {
                    oldOrdersArr.length !== 0 ?
                        oldOrdersArr.map((order) => {
                            return (
                                <div key={order._id} className="oldOrders__orderSection">
                                    <div>
                                        <p className="oldOrders__orderCaption">{order.order[0].companyName} наказ № {order.order[0].orderNumber} від {order.order[0].orderDate} </p>
                                        {order.order.map((trip, index) => {
                                            return (
                                                <div key={index} className="oldOrders__tripSection">
                                                    <p>{trip.tripNumber}. Відрядити {trip.position} {trip.employeNameAbr}  в {trip.location}, {trip.companyTo}   з {trip.tripStartDate} р. по {trip.tripEndDate} р. </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="oldOrders__iconSection">
                                        <div className='icon_wrapper' id={order._id} onClick={removeOrderFromDB}>
                                            <RiDeleteBin2Line className='icon' id={order._id} /><p>Видалити</p>
                                        </div>
                                        <div className='icon_wrapper'>
                                            <BsDownload className='icon' /><p>Завантажити</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : ""
                }
            </div>
        </div >

    )
}

export default OldOrders