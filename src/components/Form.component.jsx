import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { RiDeleteBin2Line } from 'react-icons/ri';

import DwnldBtn from './dwnldBtn.component';
import places from "../db/db-places";
import purposes from "../db/db-purposes";
import employes from "../db/db-employe";
import SelectEmploye from "./selectEmploye.component";
import OldOrders from './oldOrders.component';
import Modal from './Modal/modal.component';



class FormComponent extends Component {


    constructor(props) {
        super(props);


        this.state = {
            isModalActive: false,
            isEmployeMenuOpen: false,
            isOrderInputEmpty: true,
            isTripInputEmpty: true,
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
            tripsArr: [],
            oldOrdersArr: [],
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
        this.handleTripPOSTrequest = this.handleTripPOSTrequest.bind(this);
        this.getOldOrders = this.getOldOrders.bind(this);
        this.removeOrderFromDB = this.removeOrderFromDB.bind(this);
        this.setModalActive = this.setModalActive.bind(this);


    };


    handleTripNumber(event) {
        this.setState({ tripNumber: event.target.value })
    }
    handleBasisInput(event) {
        this.setState({ tripBasis: event.target.value })
    }
    setModalActive(boolean) {
        this.setState({ isModalActive: boolean });
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
        if (this.state.tripNumber !== ''
            && this.state.tripBasis !== ''
            && this.state.orderDate !== ''
            && this.state.employeObj !== ''
            && this.state.location !== ''
            && this.state.companyTo !== ''
            && this.state.tripStartDate !== ''
            && this.state.tripEndDate !== ''
            && this.state.tripPurposeTask !== ''
            && this.state.tripPurposeShort !== ''
            && this.state.tripPurposeDone !== ''
        ) {

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

            this.showEmployeMenu();

            this.setState({
                isEmployeMenuOpen: !this.state.isEmployeMenuOpen,
                isTripInputEmpty: true,
                tripNumber: '',
                companyTo: '',
                tripsArr: newTripArr
            })


        } else {
            this.setState({
                isTripInputEmpty: false,
            })
        }

    }




    handleCompanyInput(event) {

        if (event.target.value === 'nio') {
            this.setState({
                companyName: '?????? "?????? "??????????"',
                companyNameFull: '?????? "??????????????-?????????????????? ????\'?????????????? "??????????"'
            })
        } else {
            this.setState({
                companyName: '?????? "????-??????????"',
                companyNameFull: '???????????????????? ?? ?????????????????? ???????????????????????????????? "????-??????????"'
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
        if (this.state.companyName !== ''
            && this.state.orderNumber !== ''
            && this.state.orderDate !== '') {

            this.setState({
                isEmployeMenuOpen: !this.state.isEmployeMenuOpen,
                isOrderInputEmpty: true
            })

        } else {
            this.setState({
                isOrderInputEmpty: false
            })
        }
    }


    removeTripFromArr(event) {
        const newTripsArr = this.state.tripsArr.filter(trip => trip.id !== event.currentTarget.id)

        this.setState({
            tripsArr: newTripsArr
        })
    }

    removeOrderFromDB(id) {
        axios.delete(`https://businesstrip-doc.herokuapp.com/trip/${id}`)
            .then(res => {
                this.getOldOrders()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleTripPOSTrequest() {
        axios.post('https://businesstrip-doc.herokuapp.com/trip', { order: this.state.tripsArr })
            .then(res => {
                this.setModalActive(true)
                this.getOldOrders()
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    getOldOrders = async () => {

        const { data } = await axios.get('https://businesstrip-doc.herokuapp.com/trip');
        const parsedData = data.map((orderFromDB) => {
            return (
                {
                    _id: orderFromDB._id,
                    order: JSON.parse(orderFromDB.order)
                }
            )
        })
        this.setState({ oldOrdersArr: parsedData })

    };

    componentDidMount() {
        this.getOldOrders()
    }































    render() {
        return (
            <div className="root__wrapper">

                <Modal active={this.state.isModalActive} setActive={this.setModalActive}>
                    <p style={{ color: "limegreen" }}>?????????? ???????????? ???? ???????? ????????????</p>
                    <div className="btn__wrapper">
                        <p style={{ width: "100px" }} className="btn__text" onClick={() => this.setModalActive(false)}>????</p>
                    </div>
                </Modal>

                <div>
                    <h3>?????????? ??????????</h3>
                    <i className="fa-light fa-trash-can"></i>
                    <div className="orderMenu__wrapper">
                        <div className="orderMenu__sectionWrapper">
                            <div className="orderMenu__inputsSection">
                                <div className="orderMenu__inputWrapper">
                                    <label >
                                        <p >?????? ????????????????</p>
                                        <select name="companyName" id="companySelect" onChange={this.handleCompanyInput}>
                                            <option value=""></option>
                                            <option value="nio">?????? ??????????</option>
                                            <option value="yuz">???? ??????????</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="orderMenu__inputWrapper">
                                    <label >
                                        <p>???????? ????????????</p>

                                        <input type="date" onChange={this.handleOrdertDate} />
                                    </label>
                                </div>

                                <div className="orderMenu__inputWrapper">
                                    <label >
                                        <p>?????????? ????????????</p>

                                        <input type="text" onChange={this.handleOrdertNumber} />
                                    </label>
                                </div>
                            </div>

                            <DwnldBtn tripsArr={this.state.tripsArr} />

                        </div>

                        <div className="orderMenu__tripShortlistWrapper">
                            {
                                this.state.tripsArr.length === 0
                                    ?
                                    <p>?????? ???????? ?????????????????????????? ???????????? ???????????????????? ???????????????????????? ???? ????????????.</p>
                                    :
                                    <div className="orderMenu__tripShortlist">

                                        <p>?????????????????????? ?????????????????????? ???? ???????????? ??? {this.state.tripsArr[0].orderNumber}:</p>
                                        <ul>
                                            {this.state.tripsArr.map((trip, index) => {
                                                return (
                                                    <li key={index} >



                                                        <p className="tripShortlist__trip">
                                                            <div>
                                                                <p>
                                                                    {trip.tripNumber}. ?????????????????? {trip.position} {trip.employeNameAbr}  ?? {trip.location}, {trip.companyTo}   ?? {trip.tripStartDate} ??. ???? {trip.tripEndDate} ??. {trip.tripPurposeShort}.
                                                                </p>
                                                            </div>
                                                            <div className='icon_wrapper' id={trip.id} onClick={this.removeTripFromArr}>
                                                                <RiDeleteBin2Line className='icon' /><p>????????????????</p>
                                                            </div>

                                                        </p>
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                        <div className="btn__wrapper">
                                            <p style={{ width: "300px" }} className="btn__text" onClick={this.handleTripPOSTrequest}>???????????? ?????????? ???? ???????? ????????????</p>
                                        </div>

                                        <p style={{ margin: "auto" }}>??????</p>
                                    </div >
                            }

                            {!this.state.isEmployeMenuOpen
                                ?
                                <div className="btn__wrapper">
                                    <p style={{ width: "300px" }} className="btn__text" onClick={this.showEmployeMenu}>???????????????? ???????? ??????????????????????</p>
                                    <div className="warning__wrapper" style={{ minHeight: "25px" }}>
                                        {!this.state.isOrderInputEmpty ?
                                            <p style={{ color: "rgb(251, 103, 103)", margin: "0px" }}>?????????????? ?????????? ????????????</p>
                                            : ""}
                                    </div>
                                </div>
                                : ''
                            }
                        </div>

                    </div>
                </div>

                {this.state.isEmployeMenuOpen
                    ?
                    <div>
                        <h4>???????? ??????????????????????</h4>
                        <div className="tripMenu">

                            <div className="tripMenuSections">
                                <div className="tripNumberBasisDateWrapper" >
                                    <div className="tripNumberBasis">
                                        <div>
                                            <label>
                                                <p>?????????? ??????????????????????</p>
                                                <input onChange={this.handleTripNumber} type="text" />
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <p>???????????????? ???? ?????????????????????? (??????????????)</p>
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
                                                    <p>?????????? ??????????????????????</p>
                                                    <input onChange={this.handleLocationInput} type="text" value={this.state.location} />
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <p>????????????????????????</p>
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
                                                <p>?????????????? ??????????????????????</p>
                                                <input type="date" onChange={this.handleTripStartDate} />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <p>???????????? ??????????????????????</p>
                                                <input type="date" onChange={this.handleTripEndDate} />
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div className="tripPurposeWrapper">


                                    <div>
                                        <label>
                                            <p>???????? ??????????????????????</p>
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
                                            <p>???????? ?????????????????????? ??????????????????</p>
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
                                            <p>????????????????</p>

                                            <textarea
                                                onChange={this.handlePurposeDoneInput}
                                                rows={5}
                                                cols={40}
                                                value={this.state.tripPurposeDone}
                                            />
                                        </label>
                                    </div>

                                    <div className="btn__wrapper">
                                        <p className="btn__text" id="prevPurpose" onClick={this.handlePurposeBtn}> {'<<'} </p>
                                        <p className="btn__text" id="nextPurpose" onClick={this.handlePurposeBtn}> {'>>'} </p>
                                    </div>
                                </div>
                            </div>


                            <div className="btn__wrapper">
                                <p className="btn__text" onClick={this.addTripToOrder}>
                                    ???????????? ?????????????????????? ???? ????????????
                                </p>
                                <div className="warning__wrapper" style={{ minHeight: "25px" }}>
                                    {!this.state.isTripInputEmpty ?
                                        <p style={{ color: "rgb(251, 103, 103)", margin: "0px" }}>?????????????????? ?????? ???????? ??????????????????????</p>
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>

                    : ''}


                <OldOrders oldOrdersArr={this.state.oldOrdersArr} removeOrderFromDB={this.removeOrderFromDB} />
            </div>
        );
    }
};

export default FormComponent