import React, { Component } from "react";
import './App.css'

import DwnldBtn from './components/DwnldBtn.component.jsx'
import FormComponent from "./components/Form.component.jsx";




class App extends Component {

  render() {

    return (
      <div>
        <FormComponent></FormComponent>
        <DwnldBtn />
      </div>
    );
  }
};

export default App
