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

const update = document.querySelector('#update');

update.addEventListener('click', () => {
  const values = [];
  const inputs = document.querySelectorAll('.node-inputs');
  inputs.forEach(d => values.push(parseFloat(d.value)));
  redraw(values);
});

const exit = document.querySelector('#exit');

exit.addEventListener('click', () => {
  let values = [];
  const inputs = document.querySelectorAll('.node-inputs');
  inputs.forEach(d => values.push(parseFloat(d.value)));
  values.pop();
  redraw([...values, 0]);
  setTimeout(() => redraw(values), 1500);
  inputs[inputs.length - 1].remove();
});

const redraw = data => {
  const currentSelection = svg.selectAll('circle').data(data);

  currentSelection.exit().remove();

  const enteringCircles = currentSelection
    .enter()
    .append('circle')
    .attr('class', 'circles')
    .attr('cx', '350')
    .attr('cy', '150')
    .attr('r', '0')
    .attr('stroke', 'salmon')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  const updatedSelection = currentSelection.merge(enteringCircles);

  updatedSelection
    .transition()
    .duration(1500)
    .attr('r', d => d);
};
