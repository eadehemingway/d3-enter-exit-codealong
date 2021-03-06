# D3 workshop - P2 - enter, exit and update

![](./radar-gif.gif)

### to run the app for development

in root

```
npm run dev-server
```

#### pre codealong - explain existing code

we have inputValues in state, and this determines how many input boxes appear on the screen. The add button adds a value to this array, the remove button removes the last element of the array. The fillRandomly function fills each input randomly and the changeInput allows us to fill the value in ourselves if we wish to do so.

#### step one - create the svg

add variables to the class:

```js
const svgWidth = 700
const svgHeight = 500
```

then in useEffect

```js
d3.select('#chart')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
```

#### step two - update button for entering circles (in draw func)

the redraw func is going to be triggered when we click the update button. it needs to do two things:

- enter new circles if needed
- exit circles if needed
- update existing circles

```js
// in draw func

  const svg = d3.select('svg')
  const circleSelection = svg.selectAll('circle').data(inputValues);

  circleSelection
    .enter()
    .append('circle')
    .attr('class', 'circles')
    .attr('cx', svgWidth/2)
    .attr('cy', svgHeight/2)
    .attr('r', d => d)
    .attr('stroke', 'salmon')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
});
```

CHECK CIRCLES APPEARING

make the circles enter from the middle by first setting the r = 0 and then setting it equal to the correct radius

```js
circleSelection
  .enter()
  .append('circle')
  .attr('class', 'circles')
  .attr('cx', svgWidth / 2)
  .attr('cy', svgHeight / 2)
  .attr('stroke', 'salmon')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('r', '0')
  .transition()
  .duration(1500)
  .attr('r', (d) => d)
```

#### step three - make the update work for updating existing circles

explain that a selection will always have {\_groups, \_parents} and what you do to this selection will happen to what you can see in the \_groups.

When we have a selection that is bound to data it will also have the enter and exit methods on it.

if we call enter or exit of this selection it returns a new selection. console.log circleSelection and circleSelection.enter():

```js
console.log(circleSelection)
console.log(circleSelection.enter())
```

the \_groups array will always have as many elements in it as there are data points. Think of it like a teacher putting out as many chairs as is needed for the students that should be attending today. Some of these chairs may be empty (as some students may be late). When we need nodes to enter, there will be as many empty chairs in the \_groups array as there are nodes that need to enter. (think of entering nodes as always being a little bit late).

so circleSelection.enter() returns the selection of the entering nodes, so everything that happens after this happens only to the nodes entering.

whereas circleSelection returns the whole circle selection, which has the enter and exit method on it, but the selection is the \_groups array. So anything you do to circleSelection will only happen to the students already in their seats (i.e. the nodes already on the page)

```js
circleSelection
  .transition()
  .duration(1500)
  .attr('r', (d) => d)
```

but now there is repetition, so how can we say do x to all entering circles and all existing circles?

```js
const enteringCircles = circleSelection
  .enter()
  .append('circle')
  .attr('class', 'circles')
  .attr('cx', svgWidth / 2)
  .attr('cy', svgHeight / 2)
  .attr('r', '0')
  .attr('stroke', 'salmon')
  .attr('stroke-width', 2)
  .attr('fill', 'none')

const updateSelection = circleSelection.merge(enteringCircles)

updateSelection
  .transition()
  .duration(1500)
  .attr('r', (d) => d)
```

if we try and update circles when we have empty input boxes we get lots of errors in the console. This is because when there are no values in the input boxes we are still passing that as the value for 'r' to equal, so lets add in a condition for the r value.

```js
updateSelection
  .transition()
  .duration(1500)
  .attr('r', (d) => (Number.isInteger(d) ? d : 0))
```

#### step four - make update work for exiting circles

currently if we have two input boxes that draw two circles and then we remove one input we would expect to see one circle get removed but we dont, nothing happens.
where we have been using .enter() there is also .exit()

```js
circleSelection.exit().remove()
```

it removes all the circles we dont need. but we now have the same problem as before where they just disappear, we can get around this in the same way as before when we were entering circles

```js
circleSelection
  .exit() // at this point the circles being exited have been selected
  .transition() // this says transition from how they are now to how i am about to change them
  .duration(1500)
  .attr('r', 0)
  .remove() // then finally this removes them
```
