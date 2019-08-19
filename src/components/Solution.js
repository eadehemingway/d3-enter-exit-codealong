import React from 'react';
import * as d3 from 'd3';

export class App extends React.Component{
  static defaultProps = {
    svgWidth: 700,
    svgHeight: 500,

  }
    state = {
      inputValues:[]
    }

componentDidMount(){  
  const {svgHeight, svgWidth} = this.props
  d3.select('#chart')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

}

draw=()=>{
const {inputValues} = this.state
const {svgHeight, svgWidth} = this.props

const svg = d3.select('svg')
const circleSelection  = svg.selectAll('circle').data(inputValues)

console.log(circleSelection)
console.log(circleSelection.enter())

const enteringCircles = circleSelection
  .enter()
  .append('circle')
  .attr('class', 'circles')
  .attr('cx', svgWidth/2)
  .attr('cy', svgHeight/2)
  .attr('r', 0)
  .attr('stroke', 'salmon')
  .attr('stroke-width', 2)
  .attr('fill', 'none')


const updateSelection = circleSelection.merge(enteringCircles)

updateSelection
  .transition()
  .duration(1500)
  .attr('r', d=> (Number.isInteger(d) ? d: 0))


  circleSelection
  .exit() 
  .transition() 
  .duration(1500)
  .attr('r', 0)
  .remove(); 

}

addInput = () => {
  const newinputValues = [...this.state.inputValues, '']
  this.setState({inputValues: newinputValues})
}
removeInput = () => {
  const newinputValues = [...this.state.inputValues]
  newinputValues.pop()
  this.setState({inputValues: newinputValues})
}

fillRandomly = ()=> {
  const newVals = this.state.inputValues.map(v =>  Math.floor(Math.random() * (200 - 1) + 1));
  this.setState({inputValues: newVals})
}

changeInput = (val, i) => {
  const inputs = [...this.state.inputValues]
  inputs.splice(i, 1, val)
  this.setState({inputValues: inputs})
}


  render(){
    const {inputValues} = this.state
    return (
      <section>
      <div id="chart-container">
        <div id="control-box">
          <div id="input-container">
            {inputValues.map(
              (input, i)=>  (<input type="text" key={i} className= 'input-box node-inputs' value={input} onChange={(e)=> this.changeInput(e.target.value, i)}/>))}
          </div>
          <button id="fill" className="fill-input-btn" onClick={this.fillRandomly}>FILL RANDOMLY</button>
        </div>
        <div id="chart"></div>
      </div>
  
      <div className="button-container">
        <button id="add" className="add-input-btn" onClick={this.addInput}>+</button>
        <button id="exit" className="delete-input-btn red-border" onClick={this.removeInput}>-</button>
        <button id="update" className="update-input-btn" onClick={this.draw}>UPDATE</button>
      </div>
    </section>
    )
  }
}
 

