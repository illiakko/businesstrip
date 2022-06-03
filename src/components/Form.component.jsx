import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import DwnldBtn from './DwnldBtn.component'
import './form.css';
import places from "../db/db-places";
import purposes from "../db/db-purposes"
import employes from "../db/db-employe"
import SelectEmploye from "./selectEmploye.component";
import TripsShortlist from './tripsShortlist.component'



class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmployeMenuOpen: false,
            tripNumber: '',
            employeObj: '',
            location: '',
            companyTo: '',
            locationPromptCounter: 0,
            tripStartDate: '',
            tripEndDate: '',
            tripBasis: '',
            tripPurposeTask: '',
            tripPurposeShort: '',
            tripPurposeDone: '',
            purposePromptCounter: 0,
            orderDate: '',
            orderNumber: '',
            companyName: '',
            companyNameFull: '',
            tripsArr: []
        }
        this.handleCompanyInput = this.handleCompanyInput.bind(this);
        this.handleTripNumber = this.handleTripNumber.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleLocationInput = this.handleLocationInput.bind(this);
        this.handleCompanyToInput = this.handleCompanyToInput.bind(this);
        this.handlePlaceBtn = this.handlePlaceBtn.bind(this);
        this.handleLoopPromptCheck = this.handleLoopPromptCheck.bind(this);
        this.handlePlaceState = this.handlePlaceState.bind(this);
        this.handleTripStartDate = this.handleTripStartDate.bind(this);
        this.handleTripEndDate = this.handleTripEndDate.bind(this);
        this.handlePurposeInput = this.handlePurposeInput.bind(this);
        this.handlePurposeBtn = this.handlePurposeBtn.bind(this);
        this.handleLoopPromptPurposeCheck = this.handleLoopPromptPurposeCheck.bind(this);
        this.handlePurposeState = this.handlePurposeState.bind(this);
        this.showEmployeMenu = this.showEmployeMenu.bind(this);
        this.handleOrdertDate = this.handleOrdertDate.bind(this);
        this.handleOrdertNumber = this.handleOrdertNumber.bind(this);
        this.handleBasisInput = this.handleBasisInput.bind(this);
        this.addTripToOrder = this.addTripToOrder.bind(this);
        this.removeTripFromArr = this.removeTripFromArr.bind(this);


    };


    handleTripNumber(event) {
        this.setState({ tripNumber: event.target.value })
    }
    handleBasisInput(event) {
        this.setState({ tripBasis: event.target.value })
    }


    handleNameInput(event) {
        const currentEmploye = employes.find(employe => {
            return employe.id === event.target.value
        })

        this.setState({ employeObj: currentEmploye })
    }


    handleLocationInput(event) {
        this.setState({ location: event.target.value })
    }
    handleCompanyToInput(event) {
        this.setState({ companyTo: event.target.value })
    }
    handleTripStartDate(event) {
        this.setState({ tripStartDate: event.target.valueAsNumber })
    }
    handleTripEndDate(event) {
        this.setState({ tripEndDate: event.target.valueAsNumber })
    }
    handlePurposeInput(event) {
        this.setState({ tripPurpose: event.target.value })
    }


    //===============================================place prompt
    handlePlaceState() {
        const counter = this.state.locationPromptCounter
        this.setState({
            location: places[counter].location,
            companyTo: places[counter].name
        });
    }

    handleLoopPromptCheck() {
        const counter = this.state.locationPromptCounter

        if (counter < 0) {
            this.setState({
                locationPromptCounter: places.length - 1,
            }, this.handlePlaceState);
        }

        if (counter === places.length) {
            this.setState({
                locationPromptCounter: 0,
            }, this.handlePlaceState);
        }

        if (counter >= 0 && counter < places.length) {
            this.handlePlaceState()
        }
    }

    handlePlaceBtn = (event) => {
        if (event.target.id === 'prevPlace') {
            this.setState((prev) => {
                return { locationPromptCounter: prev.locationPromptCounter + 1 };
            }, this.handleLoopPromptCheck);
        } else if (event.target.id === 'nextPlace') {
            this.setState((prev) => {
                return { locationPromptCounter: prev.locationPromptCounter - 1 };
            }, this.handleLoopPromptCheck);
        }
    }

    //===============================================place prompt
    //===============================================purpose prompt

    handlePurposeState() {
        const counter = this.state.purposePromptCounter

        this.setState({
            tripPurposeTask: purposes[counter].task,
            tripPurposeShort: purposes[counter].short,
            tripPurposeDone: purposes[counter].done,
        });
    }


    handleLoopPromptPurposeCheck() {
        const counter = this.state.purposePromptCounter

        if (counter < 0) {
            this.setState({
                purposePromptCounter: purposes.length - 1,
            }, this.handlePurposeState);
        }

        if (counter === purposes.length) {
            this.setState({
                purposePromptCounter: 0,
            }, this.handlePurposeState);
        }

        if (counter >= 0 && counter < purposes.length) {
            this.handlePurposeState()
        }
    }

    handlePurposeBtn = (event) => {
        if (event.target.id === 'prevPurpose') {
            this.setState((prev) => {
                return { purposePromptCounter: prev.purposePromptCounter - 1 };
            }, this.handleLoopPromptPurposeCheck);
        } else if (event.target.id === 'nextPurpose') {
            this.setState((prev) => {
                return { purposePromptCounter: prev.purposePromptCounter + 1 };
            }, this.handleLoopPromptPurposeCheck);
        }
    }

    addTripToOrder() {
        this.showEmployeMenu();
        const tripDurationDays = Math.ceil((this.state.tripEndDate - this.state.tripStartDate) / (1000 * 60 * 60 * 24));

        const newTrip = {
            id: uuidv4(),
            companyName: this.state.companyName,
            companyNameFull: this.state.companyNameFull,
            orderNumber: this.state.orderNumber,
            orderDate: this.state.orderDate,
            tripNumber: this.state.tripNumber,
            employeName: this.state.employeObj.name,
            employeNameTo: this.state.employeObj.nameTo,
            employeNameWho: this.state.employeObj.nameWho,
            employeNameAbr: this.state.employeObj.nameAbbrev,
            employeNameAbrWho: this.state.employeObj.nameAbbrevWho,
            employePosition: this.state.employeObj.position,
            location: this.state.location,
            companyTo: this.state.companyTo,
            tripStartDate: new Date(this.state.tripStartDate).toLocaleDateString(),
            tripEndDate: new Date(this.state.tripEndDate).toLocaleDateString(),
            tripDuration: tripDurationDays,
            tripBasis: this.state.tripBasis,
            tripPurposeShort: this.state.tripPurposeShort,
            tripPurposeTask: this.state.tripPurposeTask,
            tripPurposeDone: this.state.tripPurposeDone,
            tripDoneDate: new Date(this.state.tripEndDate).toLocaleDateString(),
        }

        const newTripArr = this.state.tripsArr.concat(newTrip);
        this.setState({ tripsArr: newTripArr })

    }
    //===============================================purpose prompt
    //===============================================order logic

    handleCompanyInput(event) {
        if (event.target.value === 'yuz') {
            this.setState({
                companyName: 'ТОВ "ЮЖ-Холод"',
                companyNameFull: 'Товариство з обмеженою відповідальністю "ЮЖ-Холод"'
            })
        } else if (event.target.value === 'nio') {
            this.setState({
                companyName: 'ТОВ "НІО "Холод"',
                companyNameFull: 'ТОВ "Науково-інженерне об\'єднання "ХОЛОД"'
            })
        }

    }
    handleOrdertDate(event) {
        this.setState({
            orderDate: event.target.value
        })
    }
    handleOrdertNumber(event) {
        this.setState({
            orderNumber: event.target.value
        })
    }

    showEmployeMenu() {
        this.setState({
            isEmployeMenuOpen: !this.state.isEmployeMenuOpen

        })
    }


    removeTripFromArr(event) {
        const newTripsArr = this.state.tripsArr.filter(trip => trip.id !== event.target.id)

        this.setState({
            tripsArr: newTripsArr
        })

    }
    //===============================================order logic


    render() {
        return (
            <div>
                <div className="orderMenu">
                    <label >
                        Від компанії
                        <select name="companyName" id="companySelect" onChange={this.handleCompanyInput}>
                            <option value="">Обрати</option>
                            <option value="nio">НІО "ХОЛОД"</option>
                            <option value="yuz">ЮЖ "ХОЛОД"</option>
                        </select>
                    </label>
                    <label >
                        Дата наказу
                        <input type="date" onChange={this.handleOrdertDate} />
                    </label>
                    <label >
                        Номер наказу
                        <input type="text" onChange={this.handleOrdertNumber} />
                    </label>
                    <ul>

                        <TripsShortlist trips={this.state.tripsArr} removeTrip={this.removeTripFromArr} />

                    </ul>
                    {!this.state.isEmployeMenuOpen
                        ? <button onClick={this.showEmployeMenu}>Сформувати нове відрядження</button>
                        : ''
                    }

                </div>

                <hr />
                {this.state.isEmployeMenuOpen
                    ? <div className="employeMenu">
                        <div>
                            <label>
                                Номер посвідчення
                                <input onChange={this.handleTripNumber} type="text" />
                            </label>
                        </div>

                        <div>
                            <SelectEmploye handleChange={this.handleNameInput} />
                        </div>

                        <hr />

                        <div>
                            <label>
                                Місце призначення
                                <input onChange={this.handleLocationInput} type="text" value={this.state.location} />
                            </label>
                            <label>
                                Підприємство
                                <input onChange={this.handleCompanyToInput} type="text" value={this.state.companyTo} />
                            </label>
                            Приклади
                            <button id="prevPlace" onClick={this.handlePlaceBtn}> {'<<'} </button>
                            <button id="nextPlace" onClick={this.handlePlaceBtn}> {'>>'} </button>
                        </div>

                        <hr />

                        <div>
                            <label>
                                Початок відрядження
                                <input type="date" onChange={this.handleTripStartDate} />
                            </label>
                            <label>
                                Кінець відрядження
                                <input type="date" onChange={this.handleTripEndDate} />
                            </label>
                        </div>
                        <hr />
                        <div>
                            <label>
                                Підстава на відряждення (Договір)
                                <input type="basis" onChange={this.handleBasisInput} defaultValue={'НИОХ/12-22'} />
                            </label>
                            <label>
                                Мета відрядження
                                <textarea
                                    onChange={this.handlePurposeInput}
                                    rows={4}
                                    cols={50}
                                    value={this.state.tripPurposeTask}
                                />
                            </label>
                            <label>
                                Мета відрядження скорочено
                                <textarea
                                    onChange={this.handlePurposeInput}
                                    rows={2}
                                    cols={50}
                                    value={this.state.tripPurposeShort}
                                />
                            </label>
                            <label>
                                Виконано
                                <textarea
                                    onChange={this.handlePurposeInput}
                                    rows={4}
                                    cols={50}
                                    value={this.state.tripPurposeDone}
                                />
                            </label>
                            <button id="prevPurpose" onClick={this.handlePurposeBtn}> {'<<'} </button>
                            <button id="nextPurpose" onClick={this.handlePurposeBtn}> {'>>'} </button>
                        </div>


                        <button onClick={this.addTripToOrder}>
                            Додати відрядження до наказу
                        </button>

                    </div>

                    : ''}
                <DwnldBtn tripsArr={this.state.tripsArr} />
            </div>
        );
    }
};

export default FormComponent