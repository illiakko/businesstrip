import React, { Component } from "react";
import DwnldBtn from './DwnldBtn.component'
import './form.css';
import places from "../db/db-places";



class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Illia',
            location: '',
            companyTo: '',
            locationPromptCounter: 0,
        }
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleLocationInput = this.handleLocationInput.bind(this);
        this.handleCompanyToInput = this.handleCompanyToInput.bind(this);
        this.handlePlaceBtn = this.handlePlaceBtn.bind(this);
        this.handleLoopPromptCheck = this.handleLoopPromptCheck.bind(this);
        this.handlePlaceState = this.handlePlaceState.bind(this);

    };

    handleNameInput(event) {
        this.setState({ name: event.target.value })
    }
    handleLocationInput(event) {
        this.setState({ location: event.target.value })
    }
    handleCompanyToInput(event) {
        this.setState({ companyTo: event.target.value })
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










    render() {
        return (
            <div className="employeMenu">
                <label>
                    Співробітник
                    <select name="employe" id="employeSelect" onChange={this.handleNameInput}>
                        <option value="kozachenko">Козаченко І.С.</option>
                        <option value="zhelibay">Желіба Ю.О.</option>
                        <option value="rimashevskiy">Рімашевський Ю.С.</option>
                        <option value="kostukova">Костюкова О.С.</option>
                        <option value="slivinska">Сливінська М.В.</option>
                        <option value="zhelibat">Желіба Т.О.</option>
                        <option value="vovnenko">Вовненко В.С.</option>
                        <option value="voytkod">Войтко Д.А.</option>
                        <option value="shumskiy">Шумський О.А.</option>
                    </select>
                </label>
                <hr />
                <div>
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

                </div>
                <hr />



                <DwnldBtn />
            </div>
        );
    }
};

export default FormComponent