import React from 'react';

export class Calculator extends React.Component {
  render() {
    return (
      <div className="calculator container rounded" id="calculator">
        <div className="row display text-white text-lg-right align-text-bottom">
          <div className="rounded bg-secondary col-12">HELLO</div>
        </div>
        <div className="buttons">
          <div className="row">
            <div className="bg-secondary col-9 button">HELLO</div>
            <div className="bg-secondary col-3 button">HI</div>
          </div>
          <div className="row">
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
          </div>
          <div className="row">
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
          </div>
          <div className="row">
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
            <div className="bg-secondary col-3 button">HI</div>
          </div>
        </div>
      </div>
    )
  }
}