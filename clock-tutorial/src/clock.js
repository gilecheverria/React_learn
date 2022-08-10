import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Clock extends React.Component {
  // Constructor to declare the state variables
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      color: props.color,
    }
  }

  // Initialize the component
  componentDidMount() {
    // Start a recurrent function call
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // Cleanup when the component will be destroyed
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Update the state
  tick() {
    this.setState({date: new Date()});
  }

  render() {
    return (
      <div>
        <h1>Hello there!</h1>
        <h2 style={{color: this.state.color}}>It is now: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

// Exporting the component
export default Clock;
