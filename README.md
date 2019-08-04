# D3 workshop - P2 - enter, exit and update

![](./radar-gif.gif)

#### pre codealong - explain existing code

we have inputValues in state, and this determines how many input boxes appear on the screen. The add button adds a value to this array, the remove button removes the last element of the array. The fillRandomly function fills each input randomly and the changeInput allows us to fill the value in ourselves if we wish to do so.

#### step one - create the svg

add variables to the class:

```js
svgWidth = 700;
svgHeight = 500;
```

then in componentDidMount

```js
d3.select('#chart')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);
```

#### step two - update button for entering circles

```js
 const {inputValues} = this.state

  const existingCircles = svg.selectAll('circle').data(values);

  existingCircles
    .enter()
    .append('circle')
    .attr('class', 'circles')
    .attr('cx', svgWidth / 2)
    .attr('cy', svgHeight / 2)
    .attr('r', d => d)
    .attr('stroke', 'salmon')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
});
```

make the circles enter from the middle by first setting the r = 0 and then setting it equal to the correct radius

```js
existingCircles
  .enter()
  .append('circle')
  .attr('class', 'circles')
  .attr('cx', svgWidth / 2)
  .attr('cy', svgHeight / 2)
  .attr('r', '0')
  .attr('stroke', 'salmon')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('r', d => d);
```

but this doesnt work! why? because the code runs so quickly that the circle hasnt had time to load with the first r value before the second one is registered, so to see the transition we need to add the transition() property. where shall we add it?

```js
existingCircles
  .enter()
  .append('circle')
  .attr('class', 'circles')
  .attr('cx', svgWidth / 2)
  .attr('cy', svgHeight / 2)
  .attr('r', '0')
  .attr('stroke', 'salmon')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .transition()
  .duration(1500)
  .attr('r', d => d);
```

as before we add the transition between the selection and the code that is changing the selection.

#### step three - make the update work for updating existing circles

```js
const enteringCircles = existingCircles
  .enter()
  .append('circle')
  .attr('class', 'circles')
  .attr('cx', svgWidth / 2)
  .attr('cy', svgHeight / 2)
  .attr('r', '0')
  .attr('stroke', 'salmon')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .transition()
  .duration(1500)
  .attr('r', d => d);

existingCircles
  .transition()
  .duration(1500)
  .attr('r', d => d);
```

but now there is repetition, so how can we say do x to all entering circles and all existing circles?

```js
const enteringCircles = existingCircles
  .enter()
  .append('circle')
  .attr('class', 'circles')
  .attr('cx', svgWidth / 2)
  .attr('cy', svgHeight / 2)
  .attr('r', '0')
  .attr('stroke', 'salmon')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

const updatedSelection = existingCircles.merge(enteringCircles);

updatedSelection
  .transition()
  .duration(1500)
  .attr('r', d => d);
```

if we try and update circles when we have empty input boxes we get lots of errors in the console. This is because when there are no values in the input boxes we are still passing that as the value for 'r' to equal, so lets add in a condition for the r value.

```js
updatedSelection
  .transition()
  .duration(1500)
  .attr('r', d => (Number.isInteger(d) ? d : 0));
```

#### step four - make update work for exiting circles

currently if we have two input boxes that draw two circles and then we remove one input we would expect to see one circle get removed but we dont, nothing happens.
where we have been using .enter() there is also .exit()

```js
existingCircles.exit().remove();
```

it removes all the circles we dont need. but we now have the same problem as before where they just disappear, we can get around this in the same way as before when we were entering circles

```js
existingCircles
  .exit() // at this point the circles being exited have been selected
  .transition() // this says transition from how they are now to how i am about to change them
  .duration(1500)
  .attr('r', 0)
  .remove(); // then finally this removes them
```
