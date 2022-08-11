import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './clock.js';
import './index.css';

function App() {
  return (
    <div>
      <Clock color='#FF0000' />
      <Clock color='#00FF00' />
      <Clock color='#0000FF' />
    </div>
  );
}

function MapApp() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#888888', '#FF9999'];
  return (
    colors.map((color, key) =>
    <div key={key}>
      <Clock color={color} />
    </div>)
  );
}

class StartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numClocks: 0,
      color: Array(0),
    }

    // Bind the value of 'this'
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if(target.type == "number") {
      const colors = this.state.color.slice(0, value);
      this.setState({numClocks: value, color: colors});
    } else if(target.type == "color") {
      const colors = this.state.color.slice();
      colors[target.name] = value;
      this.setState({color: colors});
    }
  }

  handleSubmit(event) {
    const numClocks = this.state.numClocks;
    alert('Number of clocks: ' + numClocks);
    event.preventDefault();
  }

  makeColorList() {
    // Create a list of indices for the colors, starting at 1
    const indices = Array.from({length: this.state.numClocks}, (v, k) => k + 1);
    // https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    //const indices = Array.from(Array(this.state.numClocks).keys());
    //const indices = [...Array(this.state.numClocks).keys()];
    const colorFields = indices.map((i) =>
      <div key={i} >
        <label>
          Color {i}:
          <input
            name={i}
            type="color"
            value={this.state.color[i]}
            onChange={this.handleChange} />
        </label>
      </div>
    );
    return colorFields;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Number of clocks:
          <input
            name="numClocks"
            type="number"
            value={this.state.numClocks}
            onChange={this.handleChange} />
        </label>
        <label>
          {this.makeColorList()}
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <StartForm /> );
//root.render( <MapApp /> );
