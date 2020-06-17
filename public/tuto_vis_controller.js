import * as d3 from '../d3.v4';

class tutoVisController {
  constructor(el, vis) {
    this.el = el;
    this.vis = vis;
    this.container = document.createElement('div');
    this.container.className = 'graph';
    this.el.appendChild(this.container);
    this.metricValue = null;
  }

  render(visData, status) {
    this.container.innerHTML = '';
    const table = visData;

    const data = [];
    table.rows.forEach(row => {
      data.push({
        key: row[Object.keys(row)[0]],
        value: row[Object.keys(row)[1]],
      });
    });

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 90, left: 40 },
      width = 700 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select('.graph')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // Parse the Data

    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function(d) {
          return d.key;
        })
      )
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, data[0].value])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return x(d.key);
      })
      .attr('width', x.bandwidth())
      .attr('fill', '#69b3a2')
      // no bar at the beginning thus:
      .attr('height', function(d) {
        return height - y(0);
      }) // always equal to 0
      .attr('y', function(d) {
        return y(0);
      });

    // Animation
    svg
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', function(d) {
        return y(d.value);
      })
      .attr('height', function(d) {
        return height - y(d.value);
      })
      .delay(function(d, i) {
        console.log(i);
        return i * 100;
      });

    return new Promise(resolve => {
      resolve('Done rendering');
    });
  }

  destroy() {
    this.el.innerHTML = '';
    console.log('Destroying');
  }
}

export { tutoVisController };
