import React from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";// for Docxtemplater
import PizZipUtils from "pizzip/utils/index.js";//part of pizzip
import { saveAs } from "file-saver";



const DwnldBtn = ({ tripsArr }) => {



    const orderTripList = tripsArr.reduce(
        (tripsList, trip, index) => (
            tripsList + `${index + 1}.	Відрядити ${trip.employeNameAbr} в ${trip.location}, ${trip.companyTo} з ${trip.tripStartDate} р. по ${trip.tripEndDate} р. ${trip.tripPurposeShort}.\r\n`
        ), ''
    );

    const giveTripDocumentTo = tripsArr.reduce(
        (recipientList, tripEmploye) => (
            recipientList + ` ${tripEmploye.employeNameAbr} № ${tripEmploye.tripNumber},`
        ), ''
    ).slice(0, -1);

    const signList = tripsArr.reduce(
        (singsList, employe) => (
            singsList + `${employe.employeNameAbr}................\r\n`
        ), ''
    );







    function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }

    const generateDocument = () => {

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



                doc.render({
                    company_name: tripsArr[0].companyName,
                    company_nameFull: tripsArr[0].companyNameFull,
                    order_date: tripsArr[0].orderDate,
                    order_number: tripsArr[0].orderNumber,
                    order_list: orderTripList,
                    employe_nameTo: tripsArr[0].employeNameTo,
                    employe_nameAbr: tripsArr[0].employeNameAbr,
                    employe_position: tripsArr[0].employePosition,
                    location: tripsArr[0].location,
                    companyTo: tripsArr[0].companyTo,
                    trip_purposeTask: tripsArr[0].tripPurposeTask,
                    trip_duration: tripsArr[0].tripDuration,
                    trip_start: tripsArr[0].tripStartDate,
                    trip_end: tripsArr[0].tripEndDate,
                    trip_number: tripsArr[0].tripNumber,
                    trip_basis: tripsArr[0].tripBasis,
                    employe_name: tripsArr[0].employeName,
                    trip_purposeDone: tripsArr[0].tripPurposeTask,
                    trip_doneDate: tripsArr[0].tripDoneDate,
                    give_trip_documetnTo: giveTripDocumentTo,
                    sign_list: signList,

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