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

const update = document.querySelector('#update');

update.addEventListener('click', () => {
  const values = [];
  const inputs = document.querySelectorAll('.node-inputs');
  inputs.forEach(d => values.push(parseFloat(d.value)));

  const existingCircles = svg.selectAll('circle').data(values);

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

  existingCircles
    .exit()
    .transition()
    .duration(1500)
    .attr('r', 0)
    .remove();
});
