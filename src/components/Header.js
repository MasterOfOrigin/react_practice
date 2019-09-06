import React from "react";

import { Link } from 'react-router-dom';

export const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="container">
        <div className="navbar-header">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/calculator">Calculator</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/weather">Weather</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/metronome">Metronome</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}