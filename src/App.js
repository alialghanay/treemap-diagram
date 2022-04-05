import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {  }
  render() { 
    return (
      <div className='App'>
      <h1 id='title'>Movies Sales</h1>
      <p id='description'>Top 100 Most Sold Movies Grouped by Platform</p>
      <div className='contianer'>
        <div className='graph' ref={this.myReference}></div>
        <svg id="legend" width={500} height={75}></svg>
      </div>
      <div id='tooltip'></div>
    </div>
    );
  }
}
 

export default App;
