import logo from './logo.svg';
import './App.css';
import React from 'react'

let ops = ["+","-","/","*"]
let check = (x) => x== "+" || x == "-" || x =="/" || x == "*";
let digits = ["0","1","2","3","4","5","6","7","8","9"]
let others = ["1","2","3","4","5","6","7","8","9"]
export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exp: ["0"],
      value: "",
      lastEntry: "0"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(x) {

    let copy = [...this.state.exp] 
    let v  = this.state.value

    if(x in digits) {
      console.log('digit')
      if(this.state.lastEntry == "") {
        copy.push(x)
        this.setState({
          exp: copy,
          value: v,
          lastEntry: x
        })
        return;
      }

      else if(this.state.lastEntry[0] in digits) {
        if(copy[copy.length - 1][0] == "0" && x == "0" && (!copy[copy.length - 1].includes("."))) {
          return;
        }
        if(copy[copy.length - 1][0] == "0" && x in others) {
          this.setState({
            exp: [x],
            value: v,
            lastEntry: x
          })
          return;
        }
        if(copy[copy.length - 1][0] && x in digits && !copy[copy.length - 1].includes(".")) {
          copy[copy.length - 1] += x
        this.setState({
          exp: copy,
          value: v,
          lastEntry: x
        })
        return;
        }

        copy[copy.length - 1] += x
        this.setState({
          exp: copy,
          value: v,
          lastEntry: x
        })
        return;
      }

      else if(check(this.state.lastEntry)) {
        console.log("issue")
        copy.push(x)
        this.setState({
          exp: copy,
          value: v,
          lastEntry: x
        })
        return;
      }

      else if(this.state.lastEntry == ".") {
        if(copy[copy.length - 1].includes(".")) {
          copy[copy.length - 1] += x
          this.setState({
            exp: copy,
            value: v,
            lastEntry: x
          })
          return;
        }
      }
      else {
        return;
      }
    }

    if(check(x)) {
      console.log('ops')
      console.log(this.state.lastEntry + "This!")
      if(this.state.lastEntry == "") {
        return;
      }

      else if(this.state.lastEntry[0] in digits) {
        copy.push(x)
        this.setState({
          exp: copy,
          value: v,
          lastEntry: x
        })
      }

      else if(this.state.lastEntry == ".") {
        return;
      }

      else if(check(this.state.lastEntry)) {
          if(x == "-" && this.state.lastEntry == "*") {
            copy.push(x)
            this.setState({
            exp: copy,
            value: "1",
            lastEntry: x
          })
          return;
          }
          if(x == "+" && this.state.value == "1") {
            copy.pop()
            copy.pop()
            copy.push(x)
            this.setState({
              exp: copy,
              value: "",
              lastEntry: x
            })
            return;

          }
          copy.pop()
          copy.push(x)
          this.setState({
            exp: copy,
            value: v,
            lastEntry: x
          })
        }}

    if(x == "AC") {
      console.log("clear")
      this.setState({
        exp: ["0"],
        value: "",
        lastEntry: "0"
      })
    }

    if(x == ".") {
      if(copy[copy.length - 1].includes(".")) {
        return;
      }
      if(this.state.lastEntry === "") {
        return;
      }

      else if(check(this.state.lastEntry)) {
        return;
      }

      else if(this.state.lastEntry[0] in digits) {
        if(copy.includes(".")) {
          return ;
        }

        copy[copy.length - 1] += x
        this.setState({
          exp: copy,
          value: v,
          lastEntry: x
        })
      }

      else if(this.state.lastEntry == ".") {
        return;
      }
    }

    if(x == "=") {
      if(this.state.lastEntry == "") {
        return;
      }
      let complete = copy.join("")
      let evalu = eval(complete);
      this.setState({
        exp: [evalu.toString()],
        value: v,
        lastEntry: evalu.toString()
      })
    }
  }
  render() {
    console.log(this.state.exp)
    return (
      <div>
      <main className='w-screen items-center justify-center bg-gradient-to-br from-red-500 via-purple-500 to-pink-400 min-h-screen flex flex-col'>
      <div className='w-10/12 lg:w-6/12 font-extrabold justify-center border-2 border-black rounded-xl p-5 flex flex-col gap-y-6 bg-gray-900 text-white' id="calculator">
        <div className='bg-gray-300 p-3 rounded-lg text-black font-extrabold' id="d-frame">
        <p className='break-all' id="display">{this.state.exp} </p>
          </div>
          <div className='flex items-center justify-between'>
      <button id="clear" class="duration-300 hover:scale-90 btn p-2 md:p-4  lg:p-7 border-2 bg-red-500 rounded-lg" onClick={() => this.handleChange("AC")}>AC</button>
      <button class="btn p-2 duration-300 hover:scale-90 mr-4 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="decimal" onClick={() => this.handleChange(".")}>.</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="zero" onClick={() => this.handleChange("0")}>0</button>
      </div>
      <div className='flex items-center justify-between'>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="one" onClick={() => this.handleChange("1")}>1</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="two" onClick={() => this.handleChange("2")}>2</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="three" onClick={() => this.handleChange("3")}>3</button>
      </div>
      <div className='flex items-center justify-between'>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="four" onClick={() => this.handleChange("4")}>4</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="five" onClick={() => this.handleChange("5")}>5</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="six" onClick={() => this.handleChange("6")}>6</button>
      </div>
      <div className='flex items-center justify-between'>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="seven" onClick={() => this.handleChange("7")}>7</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="eight" onClick={() => this.handleChange("8")}>8</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="nine" onClick={() => this.handleChange("9")}>9</button>
      </div>
      <div className='flex items-center justify-between'>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="add" onClick={() => this.handleChange("+")}>+</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="subtract" onClick={() => this.handleChange("-")}>-</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="multiply" onClick={() => this.handleChange("*")}>*</button>
      <button class="btn p-2 duration-300 hover:scale-90 md:p-4 lg:p-7 border-2 bg-amber-500 rounded-lg" id="divide" onClick={() => this.handleChange("/")}>/</button>
      </div>
      <button class="btn p-3 duration-300 hover:scale-90 border-2 bg-red-500 rounded-lg" id="equals" onClick={() => this.handleChange("=")}>=</button>
        </div>
        </main>
        </div>
    )
  }
}



export default App;
