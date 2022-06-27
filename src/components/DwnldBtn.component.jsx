import React, { useState } from 'react';
import dwnldBtnHandler from "../handlers/dwnldBtnHandler"


const DwnldBtn = ({ tripsArr }) => {

    const [isTripsArr, setIsTripsArr] = useState(true);

    const generateDocument = () => {
        if (tripsArr.length !== 0) {
            setIsTripsArr(true)
            dwnldBtnHandler(tripsArr)
        } else {
            setIsTripsArr(false)
        }
    };


    return (
        <div className="btn__wrapper">
            <p style={{ width: "300px" }} className="btn__text" onClick={generateDocument} >
                Скачати документ
            </p>
            <div className="warning__wrapper" style={{ minHeight: "25px" }}>
                {!isTripsArr ?
                    <p style={{ color: "rgb(251, 103, 103)", margin: "0px" }}>Додайте відрядження до наказу</p>
                    : ""}
            </div>
        </div >
    );
};

export default DwnldBtn