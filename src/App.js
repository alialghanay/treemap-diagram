import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);
    this.myReference = React.createRef();
  }

  state = {  }

  componentDidMount() {
    this.update();
  }

  update() {
    const w = 1200;
    const h = 500;
    const padding = 100;
    const dataset = this.props.data;
    const colors = {
      'Action': '#FF0000',
      'Drama': '#4B0082',
      'Adventure': '#0000FF',
      'Family': '#FF7F00',
      'Animation': '#00FF00',
      'Comedy': '#FFFF00',
      'Biography': '#797979'
    }
  let tooltip = d3.select('#tooltip');

    const svg = d3.select(this.myReference.current)
                  .append('svg')
                  .attr('width', w)
                  .attr('height', h);

    let hierarchy = d3.hierarchy(dataset, node => node['children'])
                      .sum((node) => node['value'])
                      .sort((node1, node2) => node2['value'] - node1['value']);
    
    let createTreeMap = d3.treemap()
                          .size([w, h]);
    createTreeMap(hierarchy);

    const moviesTitles = hierarchy.leaves();

    let movie = svg.selectAll('g')
       .data(moviesTitles)
       .enter()
       .append('g')
       .attr('transform', (d) => 'translate( ' + d['x0'] + ', ' + d['y0'] + ')');
    
    movie.append('rect')
         .attr('class', 'tile')
         .style('fill', (d) => colors[(d['data']['category'])] )
         .attr('data-name', (d) => d['data']['name'])
         .attr('data-category', (d) => d['data']['category'])
         .attr('data-value', (d) => d['data']['value'])
         .attr('width', (d) => d.x1 - d.x0)
         .attr('height', (d) => d.y1 - d.y0)
         .on('mouseover', (d, i) => {
          tooltip.transition()
                 .style('visibility', 'visible')
                 .style('left', d.pageX + 'px')
                 .style('top', d.pageY - 50 + 'px');
          tooltip.html(
              'Name: ' +
              i['data']['name'] + ' ,' +
              'Category: ' +
              i['data']['category'] +
              '<br/>' +
              'Value: ' +
              i['data']['value']
            );
  
          document.querySelector('#tooltip').setAttribute('data-value', i['data']['value']);
        })
        .on('mouseout', () => {
          tooltip.transition()
                 .style('visibility', 'hidden');
        });
  ;;
    
    movie.append('text')
         .text((d) => d['data']['name'])
         .attr('x', 5)
         .attr('y', 30);


    const leg = d3.select('#legend')
                  .selectAll('g')
                  .data(Object.keys(colors))
                  .enter()
                  .append('g');

    leg.append('rect')
       .style('fill', (d) => colors[`${d}`])
       .attr('x', (d, i) => i * padding)
       .attr('width', '50px')
       .attr('height', '50px')
       .attr('class', 'legend-item');
    
    leg.append('text')
       .text((d) => `${d} |`)
       .attr('x', (d, i) => i * padding)
       .attr('y', `${padding}`);


  }

  render() { 
    return (
      <div className='App'>
      <h1 id='title'>Movies Sales</h1>
      <p id='description'>Top 100 Most Sold Movies Grouped by Platform</p>
      <div className='contianer'>
        <div className='graph' ref={this.myReference}></div>
        <svg id="legend" width={600} height={115}></svg>
      </div>
      <div id='tooltip'></div>
    </div>
    );
  }
}
 

export default App;
