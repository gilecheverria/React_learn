import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './clock.js';
import './index.css';

/*
function App() {
  return (
    <div>
      <Clock color='#FF0000' />
      <Clock color='#00FF00' />
      <Clock color='#0000FF' />
    </div>
  );
}
*/

class MapApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors,
      onChange: props.onChange,
    };
  }

  render() {
    //const colors = ['#FF0000', '#00FF00', '#0000FF', '#888888', '#FF9999'];
    const colors = this.state.colors;
    return (
      colors.map((color, key) =>
      <div key={key}>
        <Clock color={color} />
      </div>)
    );
  }
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
    if(target.type === "number") {
      if(value >= 0) {
        const colors = this.state.color.slice(0, value);
        if(colors.length < value) {
          colors[value - 1] = '#000000';
        }
        this.setState({numClocks: value, color: colors});
      }
    } else if(target.type === "color") {
      const colors = this.state.color.slice();
      // In the case of colors, the name starts at 1
      colors[target.name - 1] = value;
      this.setState({color: colors});
    }
  }

  updateColor() {

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
    // These next two do not update the 'indices' array. Don't know why
    //const indices = Array.from(Array(this.state.numClocks).keys());
    //const indices = [...Array(this.state.numClocks).keys()];
    //console.log("numClocks: " + this.state.numClocks);
    //console.log("Indices: " + indices);
    const colorFields = indices.map((i) =>
      <div key={i} >
        <label>
          Color {i}:
          <input
            name={i}
            type="color"
            value={this.state.color[i - 1]}   // i starts at 1, indices at 0
            onChange={this.handleChange} />
        </label>
      </div>
    );
    return colorFields;
  }

  render() {
    return (
      <div className="outer">
        <h1>MULTI CLOCKS</h1>
        <div className="inner">
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
        </div>
        <div className="inner">
          <MapApp colors={this.state.color} onChange={this.updateColor} />
        </div>
      </div>
    );
  }
}

function App() {
  return (<StartForm />);
  //return (<MapApp />);
}

export default App;
