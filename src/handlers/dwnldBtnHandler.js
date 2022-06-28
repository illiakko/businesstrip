import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";// for Docxtemplater
import PizZipUtils from "pizzip/utils/index.js";//part of pizzip
import { saveAs } from "file-saver";


const dwnldBtnHandler = (tripsArr) => {

    const orderTripListArr = tripsArr.map(
        (trip, index) => {
            const listItem = `${index + 1}.	Відрядити ${trip.employeNameAbrWho} в ${trip.location}, ${trip.companyTo} з ${trip.tripStartDate} р. по ${trip.tripEndDate} р. ${trip.tripPurposeShort}.\r\n`
            return { employeTrip: listItem }
        }
    );

    const orderTripList = tripsArr.reduce(
        (tripsList, trip, index) => (
            tripsList + `${index + 1}.	Відрядити ${trip.employeNameAbr} в ${trip.location}, ${trip.companyTo} з ${trip.tripStartDate} р. по ${trip.tripEndDate} р. ${trip.tripPurposeShort}.\r\n`
        ), ''
    );

    const giveTripDocumentTo = tripsArr.reduce(
        (recipientList, tripEmploye) => (
            recipientList + ` ${tripEmploye.employeNameAbr} - № ${tripEmploye.tripNumber},`
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


    //temolate part from Docxtemplater
    if (tripsArr.length > 0) {
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

                    company_nameFull: tripsArr[0].companyNameFull,
                    order_date: tripsArr[0].orderDate,
                    order_number: tripsArr[0].orderNumber,
                    order_list: orderTripListArr,
                    give_trip_documetnTo: giveTripDocumentTo,
                    sign_list: signList,
                    trips_arr: tripsArr,
                });
                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                }); //Output the document using Data-URI
                saveAs(out, `Наказ ${tripsArr[0].orderNumber}.docx`);
            }
        );
    }
};

export default dwnldBtnHandler