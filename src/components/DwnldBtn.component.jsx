import React from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";// for Docxtemplater
import PizZipUtils from "pizzip/utils/index.js";//part of pizzip
import { saveAs } from "file-saver";



const DwnldBtn = ({ orderData }) => {

    function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }

    const generateDocument = () => {
        console.log(orderData.orderDate);
        loadFile(
            "./orderTemplate.docx",
            function (error, content) {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)

                const orderTripList = `1.	Відрядити ${orderData.tripsArr[0].tripPurposeShort} ${orderData.tripsArr[0].employeNameAbr} в ${orderData.tripsArr[0].location} , ${orderData.tripsArr[0].companyTo}   з ${orderData.tripsArr[0].tripStartDate} р. по ${orderData.tripsArr[0].tripEndDate} р. ${orderData.tripsArr[0].tripPurposeShort}`

                doc.render({
                    company_name: orderData.tripsArr[0].companyName,
                    order_date: orderData.tripsArr[0].orderDate,
                    order_number: orderData.tripsArr[0].orderNumber,
                    order_list: orderData.tripsArr[0].orderTripList,
                    employe_nameTo: orderData.tripsArr[0].employeNameTo,
                    employe_nameAbr: orderData.tripsArr[0].employeNameAbr,
                    employe_position: orderData.tripsArr[0].employePosition,
                    location: orderData.tripsArr[0].location,
                    companyTo: orderData.tripsArr[0].companyTo,
                    trip_purposeTask: orderData.tripsArr[0].tripPurposeTask,
                    trip_duration: orderData.tripsArr[0].tripDuration,
                    trip_start: orderData.tripsArr[0].tripStartDate,
                    trip_end: orderData.tripsArr[0].tripEndDate,
                    trip_number: orderData.tripsArr[0].tripNumber,
                    employe_name: orderData.tripsArr[0].employeName,
                    trip_purposeTask: orderData.tripsArr[0].tripPurposeTask,
                    trip_purposeDone: orderData.tripsArr[0].tripPurposeTask,
                    trip_doneDate: orderData.tripsArr[0].tripDoneDate,

                });
                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                }); //Output the document using Data-URI
                saveAs(out, "output.docx");
            }
        );
    };

    return (
        <button onClick={generateDocument}>
            Скачати документи
        </button>
    );

};

export default DwnldBtn