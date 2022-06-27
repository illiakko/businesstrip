import React, { useState, useEffect } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsDownload } from 'react-icons/bs';
import axios from "axios"
import dwnldBtnHandler from "../handlers/dwnldBtnHandler"
import Modal from './Modal2/modal.component';


const OldOrders = ({ oldOrdersArr, removeOrderFromDB }) => {



    const [orderToDwnld, setOrderToDwnld] = useState([]);
    const [modalActive, setModalActive] = useState(false);

    const removeOrder = (event) => {
        console.log(event.target);
        setModalActive(true)
        removeOrderFromDB(event)
    }

    const getOrderPOSTreqest = function (event) {
        axios.post('http://localhost:5000/order', {
            id: event.currentTarget.id,
        })
            .then((res) => {
                const order = JSON.parse(res.data[0].order)
                setOrderToDwnld(order)
            })
    }

    useEffect(() => {
        dwnldBtnHandler(orderToDwnld)
    }, [orderToDwnld]);



    return (
        <div className='oldOrders__wrapper'>

            <Modal active={modalActive} setActive={setModalActive}>
                <p style={{ color: "limegreen" }} >Наказ видалено</p>
                <div className="btn__wrapper">
                    <p style={{ width: "100px" }} className="btn__text" onClick={() => { setModalActive(false) }}>ОК</p>
                </div>
            </Modal>

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
                                        <div className='icon_wrapper' id={order._id} onClick={removeOrder}>
                                            <RiDeleteBin2Line className='icon' /><p>Видалити</p>
                                        </div>
                                        <div className='icon_wrapper' id={order._id} onClick={getOrderPOSTreqest}>
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