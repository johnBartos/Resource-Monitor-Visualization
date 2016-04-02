import d3 from 'd3';

export function draw(svgOptions, data) {
  const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  console.log(data)

  //const parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ').parse;

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

  const valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });


  const formattedData = data.map(e => {
    return {
      date: e.date,
      value: e.value
    };
  });

  console.log(formattedData)

  x.domain(d3.extent(formattedData, function(d) { return d.date; }));
  y.domain([0, d3.max(formattedData, function(d) { return d.value; })]);


  const svg = svgOptions.element
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('path')
    .attr('class', 'line')
    .attr('d', valueline(formattedData));

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
