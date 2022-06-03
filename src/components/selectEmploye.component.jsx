import React from "react";
import employes from "../db/db-employe";

const SelectEmploye = function ({ handleChange }) {

    return (

        <label>
            Співробітник
            <select name="employe" id="employeSelect" onChange={handleChange}>
                <option value="">Обрати</option>
                {employes.map((person, index) => <option key={index} value={person.id}>{person.nameAbbrev}</option>)}

            </select>
        </label>
    )
}

export default SelectEmploye