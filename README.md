# D3 workshop - P2 - enter, exit and update

#### step one - svg and add input button, remove input button

```js
const svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', 700)
  .attr('height', 500);

const add = document.querySelector('#add');

add.addEventListener('click', () => {
  const input = document.createElement('input');
  input.classList.add('pink-border', 'node-inputs');
  const container = document.querySelector('#input-container');
  container.appendChild(input);
});

const exit = document.querySelector('#exit');

exit.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.node-inputs');
  const lastInput = inputs[inputs.length - 1];
  lastInput.parentNode.removeChild(lastInput);
});
```

#### step two - update button for entering circles

```js
update.addEventListener('click', () => {
  const values = [];
  const inputs = document.querySelectorAll('.node-inputs');
  inputs.forEach(d => values.push(parseFloat(d.value)));

  const existingCircles = svg.selectAll('circle').data(values);

  existingCircles
    .enter()
    .append('circle')
    .attr('class', 'circles')
    .attr('cx', '350')
    .attr('cy', '150')
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
  .attr('cx', '350')
  .attr('cy', '150')
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
  .attr('cx', '350')
  .attr('cy', '150')
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
  .attr('cx', '350')
  .attr('cy', '150')
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
  .attr('cx', '350')
  .attr('cy', '150')
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
