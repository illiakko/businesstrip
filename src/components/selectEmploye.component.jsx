import React from "react";
import employes from "../db/db-employe";

const SelectEmploye = function ({ handleChange }) {

    return (

        <label>
            <p>Співробітник</p>

            <select name="employe" id="employeSelect" onChange={handleChange}>
                <option value=""></option>
                {employes.map((person, index) => <option key={index} value={person.id}>{person.nameAbbrev}</option>)}

            </select>
        </label>
    )
}

export default SelectEmploye