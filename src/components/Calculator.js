import React from 'react';



export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ""
    };
  }

  handleDigit(n) {
    this.setState({
      display: this.state.display + n
    })
  }

  handleOperation(op) {
    console.log("handleOperation: ", op)
  }

  handleClear(n) {
    console.log("handle clear")
  }

  render() {
    return (
      <div className="calculator container rounded black-border" id="calculator">
        <div className="row display">
          <div className="display-column black-border bg-white col-12 ">{this.state.display}</div>
        </div>
        <div className="buttons">
          <div className="row">
            <div className="clear">{this.props.value}</div>
            <ClearWithButton value="CLEAR" clickHandler={this.handleClear.bind(this)}/>
            <OperationWithButton value="/" clickHandler={this.handleOperation.bind(this)}/>
          </div>
          <div className="row">
            <DigitWithButton value="1" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="2" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="3" clickHandler={this.handleDigit.bind(this)}/>
            <OperationWithButton value="-" clickHandler={this.handleOperation.bind(this)}/>
          </div>
          <div className="row">
            <DigitWithButton value="4" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="5" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="6" clickHandler={this.handleDigit.bind(this)}/>
            <OperationWithButton value="+" clickHandler={this.handleOperation.bind(this)}/>
          </div>
          <div className="row">
            <DigitWithButton value="7" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="8" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="9" clickHandler={this.handleDigit.bind(this)}/>
            <OperationWithButton value="=" clickHandler={this.handleOperation.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}


const withButton = (WrappedComponent, colSize = "col-3") => (
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        classes: ""
      };
    }

    handleClick(val) {
      this.setState({
        classes: "border-dark"
      })
      setTimeout(() => {this.setState({classes: ""})}, 200)
      this.props.clickHandler(val)
    }

    render() {
      return (
        <div className={"button " + colSize + " " + this.state.classes} onClick={() => this.handleClick(this.props.value)}>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
)


class Digit extends React.Component {
  render() {
    return (
      <div className="digit">{this.props.value}</div>
    )
  }
}

class Operation extends React.Component {
  render() {
    return (
      <div className="operation">{this.props.value}</div>
    )
  }
}

class Clear extends React.Component {
  render() {
    return (
      <div className="clear">{this.props.value}</div>
    )
  }
}

const DigitWithButton = withButton(Digit)

const OperationWithButton = withButton(Operation)

const ClearWithButton = withButton(Clear, "col-9")



