import React from "react";
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { OPEN_WEATHER_KEY } from '../config.js';
import formatWeatherApiRes from '../helpers/formatWeatherApiRes'

// Will need Open Weather Api Key
//Create config file that exports OPEN_WEATHER_KEY
export class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      currentZip: '',
      city: '',
      days: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (/^[\d]{0,5}$/.test(event.target.value))
      this.setState({zip: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // prevent unnecessary api calls
    if (this.state.zip !== this.state.currentZip)
      this.getFiveDayForecast(this.state.zip)
  }

  getFiveDayForecast(zip) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&APPID=${OPEN_WEATHER_KEY}`)
      .then(res => res.json())
      .then(formatWeatherApiRes)
      .then(R.merge({currentZip: this.state.zip}))
      .then(this.setState.bind(this))
  }

  render() {
    return (
      <div className="container weather">
        <h2>
          Five(ish) Day Forecast
        </h2>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter ZIP Code:&nbsp;&nbsp;
            <input type="text" value={this.state.zip} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br />
        <h3>{this.state.city}</h3>
        <div className="container five-day">
          <div className="row no-gutters">
            {Object.keys(this.state.days).map((day, idx) =>
              <DayForecast key={idx} day={day} {...this.state.days[day] }/>
            )}
          </div>
        </div>
      </div>
    )
  }
}

// child components
const DayForecast = (props) => (
  <div className="day-forecast bg-secondary col-xs-2 col-xs-offset-1 border border-light">
    <div className="day">{props.day}</div>
    <img src={`http://openweathermap.org/img/wn/${props.weather_icon}@2x.png`} />
    <div className="row justify-content-center" >
      <div className="col-xs-6 temperature high text-dark" >
        {props.temp_max}&deg;
      </div>
      <div className="col-xs-6 temperature low text-white" >
        {props.temp_min}&deg;
      </div>
    </div>
  </div>
)

DayForecast.propTypes = {
  day: PropTypes.string.isRequired,
  temp_max: PropTypes.number.isRequired,
  temp_min: PropTypes.number.isRequired,
  weather_icon: PropTypes.string.isRequired,
}

//helpers and constants
const queryString = (obj) => Object.keys(obj).map((key) => key + '=' + obj[key]).join('&')

const constructUrl = (endpoint, query) => (
  endpoint + (query ? '?' +  queryString(query) : '')
)