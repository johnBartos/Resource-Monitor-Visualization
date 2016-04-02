import d3 from 'd3';

export function draw(svgOptions, data) {
  svgOptions.element.selectAll('*').remove();
  const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

  const width = svgOptions.width - margin.left - margin.right;
  const height = svgOptions.height - margin.top - margin.bottom;

  const x = d3.time.scale().range([0, width]);
  const y = d3.scale.linear().range([height, 0]);

  const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(5);

  const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(5);

  const line = d3.svg.line()
    .interpolate('basis')
    .x(d => x(d.date))
    .y(d => y(d.value));

  const svg = svgOptions.element
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const dataArray = d3.entries(data);

  const color = d3.scale.category10();
  color.domain(dataArray.map(d => d.key));

  const minX = d3.min(dataArray, kv => d3.min(kv.value, d => d.date));
  const maxX = d3.max(dataArray, kv => d3.max(kv.value, d => d.date));
  const minY = d3.min(dataArray, kv => d3.min(kv.value, d => d.value));
  const maxY = d3.max(dataArray, kv => d3.max(kv.value, d => d.value));

  x.domain([minX, maxX]);
  y.domain([minY, maxY]);

  const load = svg.selectAll('.load')
    .data(dataArray)
    .enter().append('g')
    .attr('class', 'load');

  load.append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.value))
    .style('stroke', d => color(d.key));

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);
}

export function mount(domNode) {
  return d3.select(domNode);
}

export function unmount(domNode) {
  return d3.select(domNode).remove();
}
