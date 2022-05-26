import React, { Component } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";// for Docxtemplater
import PizZipUtils from "pizzip/utils/index.js";//part of pizzip
import { saveAs } from "file-saver";




class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Illia' }
        this.handleNameInput = this.handleNameInput.bind(this);
        this.generateDocument = this.generateDocument.bind(this);
        this.loadFile = this.loadFile.bind(this);
    };

    handleNameInput(event) {
        this.setState({ name: event.target.value })
        console.log(event.target.value);
    }

    loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }

    generateDocument() {
        const userName = this.state.name

        this.loadFile(
            "./hello.docx",
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
                    first_name: userName,
                    last_name: "Doe",
                    phone: "0652455478",
                    description: "New Website",
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

    render() {
        return (
            <div>
                <label>
                    Name input
                    <input type="text" onChange={this.handleNameInput} />
                </label>

                <button onClick={this.generateDocument}>Generate main</button>
            </div>
        );
    }
};

export default FormComponent