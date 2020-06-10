# Fac D3 talk

we are going to cover

- data binding
- enter
- exit
- update funcs

## step one : go through existing code

- add input (adds empty string to input vals cos input boxes depend on length of array)
- remove input
- fill randomly
- change input (for if we want to change values manually)

## step two : add d3

- npm i d3
- import \* as d3 from "d3";

## step three : add properties to svg and explain the chaining

```js
useEffect(() => {
  d3.select("#chart").attr("width", svgWidth).attr("height", svgHeight);
}, []);
```

## step four : bind the data

- explain binding data

```js
const svg = d3.select("svg");
const circleSelection = svg.selectAll("circle").data(inputValues);
```

- `console.log(circleSelection)` show the enter and exit function
- explain that if there were 20 circles and ten data points there would be zero in enter and 10 in exit
- if 5 circles and ten data points then there would be zero exit and 5 enter

## step five : enter circles

```js
const enteringCircles = circleSelection
  .enter()
  .append("circle")
  .attr("cx", svgWidth / 2)
  .attr("cy", svgHeight / 2)
  .attr("r", (d) => d)
  .attr("stroke", "salmon")
  .attr("stroke-width", 2)
  .attr("fill", "none");
```

## step six : make circles transition

```js
circleSelection
  .enter()
  .append("circle")
  .attr("cx", svgWidth / 2)
  .attr("cy", svgHeight / 2)
  .attr("r", 0)
  .attr("stroke", "salmon")
  .attr("stroke-width", 2)
  .attr("fill", "none")
  .transition()
  .duration(1500)
  .attr("r", (d) => d);
```

## step seven : make circles exit

```js
circleSelection.exit().remove();
```

add transition

```js
circleSelection.exit().transition().duration(1500).attr("r", 0).remove();
```

## step eight : make circles update if already on page

- the circle selection refers to the circles on the page

```js
circleSelection
  .transition()
  .duration(1500)
  .attr("r", (d) => d);
```

## step nine : refactor

```js
const enteringCircles = circleSelection
  .enter()
  .append("circle")
  .attr("cx", svgWidth / 2)
  .attr("cy", svgHeight / 2)
  .attr("r", 0)
  .attr("stroke", "salmon")
  .attr("stroke-width", 2)
  .attr("fill", "none");

const updateSelection = circleSelection.merge(enteringCircles);

updateSelection
  .transition()
  .duration(1500)
  .attr("r", (d) => d);
```
