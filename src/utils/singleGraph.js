import d3 from 'd3';

export function draw(svgOptions, readings, alarms) {
  const node = d3.select(svgOptions.node);
  node.selectAll('*').remove();
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
    .ticks(10);

  const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(3);

  const line = d3.svg.line()
    .interpolate('basis')
    .x(d => x(d.date))
    .y(d => y(d.value));

  const area = d3.svg.area()
    .interpolate('basis')
    .x(d => x(d.date))
    .y0(height)
    .y1(d => y(d.value));

  const svg = node
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const minX = Date.now() - 600000;
  const maxX = Date.now();
  const minY = 0;
  const maxY = 3;

  x.domain([minX, maxX]);
  y.domain([minY, maxY]);

  svg.append('linearGradient')
    .attr('id', 'gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0).attr('y1', y(0))
    .attr('x2', 0).attr('y2', y(1))
    .selectAll('stop')
    .data([
      { offset: '0%', color: '#C3E887' },
        { offset: '100%', color: '#F67560' }
    ])
    .enter().append('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color);

  svg.append('path')
    .datum(readings)
    .attr('class', 'area')
    .attr('d', area);

  svg.append('path')
    .attr('class', 'line')
    .attr('d', line(readings));

  const alarm = svg.selectAll('.alarm')
    .data(alarms)
    .enter().append('g')
    .attr('class', 'alarm');

  alarm.append('rect')
    .attr('class', 'highLoad')
    .attr('x', d => {
      return x(d.triggered.date - (2 * 60 * 1000) + 10 * 1000);
    })
    .attr('width', d => x(d.triggered.date) - x(d.triggered.date - (2 * 60 * 1000) +  10 * 1000))
    .attr('y', 0)
    .attr('height', height)
    .attr('fill', 'red')
    .attr('opacity', 0.1);


  alarm.append('rect')
    .attr('class', 'alarming')
    .attr('x', d => x(d.triggered.date))
    .attr('width', d => d.resolved ? (x(d.resolved.date) - x(d.triggered.date)) : (x(maxX) - x(d.triggered.date)))
    .attr('y', 0)
    .attr('height', height)
    .attr('fill', 'yellow')
    .attr('opacity', 0.1);

  alarm.append('text')
    .attr('class', 'alarmText')
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('x', d => x(d.triggered.date))
    .attr('y', 0)
    .text('triggered');

  alarm.append('text')
    .attr('class', 'alarmText')
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('visibility', d => d.resolved ? 'initial' : 'hidden')
    .attr('x', d => d.resolved ? x(d.resolved.date) : 0)
    .attr('y', 0)
    .text('resolved');

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
