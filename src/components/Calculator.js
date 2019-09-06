import React from 'react';



export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      input: null,
      currentValue: null,
      operator: null
    };
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeydown.bind(this), false);
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeydown.bind(this), false);
  }

  _handleKeydown({ key }) {
    console.log("handleKeydown: ", key)
    if (/[\/÷xX=+*-]/.test(key)) {
      this.handleOperation({'/': '÷', '*': 'x', 'X': 'x'}[key] || key)
    } else if (/[\d]/.test(key)) {
      this.handleDigit(key)
    } else if (key === '.') {
      this.handleDecimal()
    } else if (key === 'Enter') {
      this.handleOperation('=')
    } else if (key === 'Backspace') {
      this.handleBackspace()
    } else if (key === 'Escape') {
      this.handleClear()
    }
  }

  handleDigit(n) {
    console.log("handleDigit: ", n)
    // append digit to display when inputting
    if (this.state.display.length < 12 && this.state.input !== null) {
      let s = this.state.display + n
      this.setState({
        display: s,
        input: Number(s)
      })
    // when digit is entered after evaluation, start new display and input
    } else if (this.state.input === null) {
      // retain negative sign
      let s = this.state.display === '-' ? this.state.display + n : n
      this.setState({
        display: s,
        input: Number(s),
        currentValue: this.state.operator === null ? null : this.state.currentValue
      })
    }
  }

  handleDecimal() {
    console.log("handleDecimal")
    if (this.state.display.indexOf('.') < 0 && this.state.display !== '-') {
      let display = this.state.display.length ? this.state.display + '.' : this.state.display + '0.'
      this.setState({
        display: display,
        input: Number(display)
      })
    }
  }

  handleOperation(op) {
    console.log("handleOperation: ", op)
    if (op === '=') {
      if (this.state.input !== null && this.state.currentValue !== null)
        this.handleEquals()
      return
    }
    // make input currentValue when no currentValue exists
    // if currentValue does exist calculate the new currentValue with input and operator in state
    if (this.state.input !== null) {
      this.setState({
        display: '',
        input: null,
        currentValue: this.state.currentValue === null ? this.state.input : this.evaluate(),
        operator: op
      })
      // if input and calculated value are empty minus sign works as negative sign
    } else if (op === '-' && !this.state.display.length) {
      this.setState({
        display: this.state.display === '-' ? '' : '-'
      })
    // operate on currentValue when no input, allow to change operator before inputting
    // (except minus because that will be interpretted as negative)
    } else if (this.state.currentValue !== null) {
      this.setState({
        display: '',
        operator: op
      })
    }
  }

  evaluate() {
    if (this.state.operator === 'x') {
      return this.state.currentValue * this.state.input
    } else if (this.state.operator === '÷') {
      return this.state.currentValue / this.state.input
    } else if (this.state.operator === '+') {
      return this.state.currentValue + this.state.input
    } else if (this.state.operator === '-') {
      return this.state.currentValue - this.state.input
    }
    return this.state.input
  }

  handleEquals() {
    console.log("handleEquals")
    let val = this.evaluate()
    let display = '';
    if (val > 999999999999 || val < -99999999999) {
      display = 'Out Of Range'
      val = null
    } else {
      display = val.toString().slice(0,12)
      display = display[display.length - 1] === '.' ? display.slice(0, display.length - 1) : display
    }
    this.setState({
      display: display,
      input: null,
      currentValue: val,
      operator: null
    })
  }

  handleClear() {
    console.log("handleClear")
    this.setState({
      display: "",
      input: null,
      currentValue: null,
      operator: null
    })
  }

  handleBackspace() {
    console.log("handleBackspace")
    if (this.state.display.length && this.state.input !== null) {
      let display = this.state.display.slice(0, this.state.display.length - 1)
      this.setState({
        display: display,
        input: Number(display)
      })
    }
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

            <OperationWithButton value="÷" clickHandler={this.handleOperation.bind(this)}/>
          </div>
          <div className="row">
            <DigitWithButton value="1" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="2" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="3" clickHandler={this.handleDigit.bind(this)}/>
            <OperationWithButton value="x" clickHandler={this.handleOperation.bind(this)}/>
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
            <OperationWithButton value="-" clickHandler={this.handleOperation.bind(this)}/>
          </div>
          <div className="row">
            <DigitWithButton value="0" clickHandler={this.handleDigit.bind(this)}/>
            <DigitWithButton value="." clickHandler={this.handleDecimal.bind(this)}/>
            <EqualsWithButton value="=" clickHandler={this.handleOperation.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}


const withButton = (WrappedComponent, classes = "col-3") => (
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
        <div className={"button " + classes + " " + this.state.classes}
            onClick={() => this.handleClick(this.props.value)}>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
)


const Digit = (props) => (
  <div className="digit">{props.value}</div>
)

const Operation = (props) => (
  <div className="operation">{props.value}</div>
)

const Clear = (props) => (
  <div className="clear">{props.value}</div>
)

const Decimal = (props) => (
  <div className="decimal">{props.value}</div>
)


const DigitWithButton = withButton(Digit, "col-3 bg-light")

const OperationWithButton = withButton(Operation, "col-3 bg-warning")

const ClearWithButton = withButton(Clear, "col-9")

const EqualsWithButton = withButton(Operation, "col-6 bg-warning")

const DecimalWithButton = withButton(Decimal, "col-3 bg-light")




