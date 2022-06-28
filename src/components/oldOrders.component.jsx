import React, { useState, useEffect } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsDownload } from 'react-icons/bs';
import axios from "axios"
import dwnldBtnHandler from "../handlers/dwnldBtnHandler"
import Modal from './Modal/modal.component';


const OldOrders = ({ oldOrdersArr, removeOrderFromDB }) => {

    const [orderToDwnld, setOrderToDwnld] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [orderToRemove, setOrderToRemove] = useState();
    const [isDelitionApproved, setDelitionApproved] = useState(false);


    const removeOrder = (event) => {
        setModalActive(true)
        setOrderToRemove(event.currentTarget.id)
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


    const handleApproveModalBtn = () => {
        removeOrderFromDB(orderToRemove)
        setDelitionApproved(true)

    }
    const handleConfirmModalBtn = () => {
        setModalActive(false)
        setDelitionApproved(false)
    }


    const handleDeclineModalBtn = () => {
        setModalActive(false)
    }


    return (
        <div className='oldOrders__wrapper'>

            <Modal active={modalActive} setActive={setModalActive}>
                {
                    isDelitionApproved
                        ?
                        <div className="modalChildren__wrapper">
                            <p style={{ color: "black" }} >Наказ видалено</p>
                            <p style={{ width: "200px" }} className="btn__text" onClick={handleConfirmModalBtn}>Ну, і грець з ним!</p>
                        </div>
                        :
                        <div className="modalChildren__wrapper">
                            <p style={{ color: "red" }} >Видалити наказ?</p>
                            <div className="modalChildren__btns">
                                <p style={{ width: "100px" }} className="btn__text" onClick={handleApproveModalBtn}>Так</p>
                                <p style={{ width: "100px" }} className="btn__text" onClick={handleDeclineModalBtn}>Ні</p>
                            </div>
                        </div>
                }

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