import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import dateFormat, { masks } from "dateformat";
import DwnldBtn from './dwnldBtn.component'
import places from "../db/db-places";
import purposes from "../db/db-purposes"
import employes from "../db/db-employe"
import SelectEmploye from "./selectEmploye.component";
import TripsShortlist from './tripsShortlist.component';
import AddOrderToDBbtn from './addOrderToDBbtn.component';



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
        this.handlePurposeBtn = this.handlePurposeBtn.bind(this);
        this.handleLoopPromptPurposeCheck = this.handleLoopPromptPurposeCheck.bind(this);
        this.handlePurposeState = this.handlePurposeState.bind(this);
        this.showEmployeMenu = this.showEmployeMenu.bind(this);
        this.handleOrdertDate = this.handleOrdertDate.bind(this);
        this.handleOrdertNumber = this.handleOrdertNumber.bind(this);
        this.handleBasisInput = this.handleBasisInput.bind(this);
        this.addTripToOrder = this.addTripToOrder.bind(this);
        this.removeTripFromArr = this.removeTripFromArr.bind(this);
        this.handlePurposeTaskInput = this.handlePurposeTaskInput.bind(this);
        this.handlePurposeShortInput = this.handlePurposeShortInput.bind(this);
        this.handlePurposeDoneInput = this.handlePurposeDoneInput.bind(this);


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
    handlePurposeTaskInput(event) {
        this.setState({ tripPurposeTask: event.target.value })
    }
    handlePurposeShortInput(event) {
        this.setState({ tripPurposeShort: event.target.value })
    }
    handlePurposeDoneInput(event) {
        this.setState({ tripPurposeDone: event.target.value })
    }


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
        const tripDurationDays = Math.ceil((this.state.tripEndDate - this.state.tripStartDate + 1) / (1000 * 60 * 60 * 24));
        const startDate = dateFormat(this.state.tripStartDate, "dd.mm.yyyy")
        const endDate = dateFormat(this.state.tripEndDate, "dd.mm.yyyy")
        const doneDate = dateFormat(this.state.tripEndDate, "dd.mm.yyyy")
        const orderDate = dateFormat(this.state.orderDate, "dd.mm.yyyy")

        const newTrip = {
            id: uuidv4(),
            companyName: this.state.companyName,
            companyNameFull: this.state.companyNameFull,
            orderNumber: this.state.orderNumber,
            orderDate: orderDate,
            tripNumber: this.state.tripNumber,
            employeName: this.state.employeObj.name,
            employeNameTo: this.state.employeObj.nameTo,
            employeNameWho: this.state.employeObj.nameWho,
            employeNameAbr: this.state.employeObj.nameAbbrev,
            employeNameAbrWho: this.state.employeObj.nameAbbrevWho,
            employePosition: this.state.employeObj.position,
            location: this.state.location,
            companyTo: this.state.companyTo,
            tripStartDate: startDate,
            tripEndDate: endDate,
            tripDuration: tripDurationDays,
            tripBasis: this.state.tripBasis,
            tripPurposeShort: this.state.tripPurposeShort,
            tripPurposeTask: this.state.tripPurposeTask,
            tripPurposeDone: this.state.tripPurposeDone,
            tripDoneDate: doneDate,
        }

        const newTripArr = this.state.tripsArr.concat(newTrip);
        this.setState({ tripsArr: newTripArr })

    }

    handleCompanyInput(event) {

        if (event.target.value === 'nio') {
            this.setState({
                companyName: 'ТОВ "НІО "Холод"',
                companyNameFull: 'ТОВ "Науково-інженерне об\'єднання "ХОЛОД"'
            })
        } else {
            this.setState({
                companyName: 'ТОВ "ЮЖ-Холод"',
                companyNameFull: 'Товариство з обмеженою відповідальністю "ЮЖ-Холод"'
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








    render() {
        return (
            <div>

                <div className="orderMenu">
                    <div>
                        <label >
                            <p>Від компанії</p>

                            <select name="companyName" id="companySelect" onChange={this.handleCompanyInput}>
                                <option value=""></option>
                                <option value="nio">НІО Холод</option>
                                <option value="yuz">ЮЖ Холод</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Дата наказу</p>

                            <input type="date" onChange={this.handleOrdertDate} />
                        </label>
                    </div>
                    <div>
                        <label >
                            <p>Номер наказу</p>

                            <input type="text" onChange={this.handleOrdertNumber} />
                        </label>
                    </div>
                    <div className="tripShortlist">
                        <ul>
                            <TripsShortlist trips={this.state.tripsArr} removeTrip={this.removeTripFromArr} />
                        </ul>
                    </div>



                </div>

                <div className="btnWrapper">
                    {!this.state.isEmployeMenuOpen
                        ? <p onClick={this.showEmployeMenu}>Нове відрядження</p>
                        : ''
                    }
                </div>

                <AddOrderToDBbtn tripsArr={this.state.tripsArr} />

                {this.state.isEmployeMenuOpen
                    ? <div className="tripMenu">

                        <div className="tripMenuSections">
                            <div className="tripNumberBasisDateWrapper" >
                                <div className="tripNumberBasis">
                                    <div>
                                        <label>
                                            <p>Номер посвідчення</p>
                                            <input onChange={this.handleTripNumber} type="text" />
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <p>Підстава на відряждення (Договір)</p>
                                            <input type="basis" onChange={this.handleBasisInput} />
                                        </label>
                                    </div>

                                </div>

                                <div className="tripEmploye">
                                    <SelectEmploye handleChange={this.handleNameInput} />
                                </div>

                                <div className="tripLocationCompany">



                                    <div className="tripLocationCompany">
                                        <div>
                                            <label>
                                                <p>Місце призначення</p>
                                                <input onChange={this.handleLocationInput} type="text" value={this.state.location} />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <p>Підприємство</p>
                                                <input onChange={this.handleCompanyToInput} type="text" value={this.state.companyTo} />
                                            </label>
                                        </div>
                                        <div className="navigationBtn">
                                            <p id="prevPlace" onClick={this.handlePlaceBtn}> {'<<'} </p>
                                            <p id="nextPlace" onClick={this.handlePlaceBtn}> {'>>'} </p>
                                        </div>
                                    </div>

                                </div>


                                <div className="tripDate">
                                    <div>
                                        <label>
                                            <p>Початок відрядження</p>
                                            <input type="date" onChange={this.handleTripStartDate} />
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <p>Кінець відрядження</p>
                                            <input type="date" onChange={this.handleTripEndDate} />
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div className="tripPurposeWrapper">

                                <div>
                                    <label>
                                        <p>Мета відрядження</p>
                                        <textarea
                                            onChange={this.handlePurposeTaskInput}
                                            rows={5}
                                            cols={40}
                                            value={this.state.tripPurposeTask}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <p>Мета відрядження скорочено</p>
                                        <textarea
                                            onChange={this.handlePurposeShortInput}
                                            rows={5}
                                            cols={40}
                                            value={this.state.tripPurposeShort}
                                        />
                                    </label>
                                </div>


                                <div>
                                    <label>
                                        <p>Виконано</p>

                                        <textarea
                                            onChange={this.handlePurposeDoneInput}
                                            rows={5}
                                            cols={40}
                                            value={this.state.tripPurposeDone}
                                        />
                                    </label>
                                </div>

                                <div className="btnWrapper">
                                    <p id="prevPurpose" onClick={this.handlePurposeBtn}> {'<<'} </p>
                                    <p id="nextPurpose" onClick={this.handlePurposeBtn}> {'>>'} </p>
                                </div>


                            </div>

                        </div>










                        <div className="btnWrapper">
                            <p onClick={this.addTripToOrder}>
                                Додати відрядження до наказу
                            </p>
                        </div>

                    </div>

                    : ''}

                {this.state.tripsArr.length
                    ? <DwnldBtn tripsArr={this.state.tripsArr} />
                    : ''
                }




            </div>
        );
    }
};

export default FormComponent