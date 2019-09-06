import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import { Header } from "./Header.js"
import { Calculator } from './Calculator.js';
import { Weather } from './Weather.js';
import { Metronome } from './Metronome.js';



export class Root extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <Header />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <Route path="/calculator" component={Calculator}/>
            <Route path="/weather" component={Weather}/>
            <Route path="/Metronome" component={Metronome}/>
          </div>
        </div>
      </div>
    )
  }
}