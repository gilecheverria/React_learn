/*
 * Basic examples of creating components as functions or classes
 *
 * Gilberto Echeverria
 * 2022-08-11
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//// Function components ////

function Greet(props) {
  return (<h1>Hello {props.name} {props.surname}</h1>);
}

// Another version, using pattern matching to unpack the properties
function GreetAgain({name, surname}) {
  return (<h1>Hello {name} {surname}</h1>);
}

//// Class components ////

class Goodye extends React.Component {
  constructor(props) {
    // Call the constructor of the parent class
    super(props);
    // Store the information as a state
    this.state = {
      day: props.day,
      month: props.month,
      year: props.year,
    };
  }

  render() {
    return (<h1>Bye {this.state.day}/{this.state.month}/{this.state.year}</h1>);
  }
}


// The initial component
function App() {
  return (
    <div>
      <GreetAgain name="Gil" surname="Eche" />
      <Greet name="Pancho" surname="Lopez" />
      <Goodye day={10} month="August" year={2022} />
    </div>);
}

// Basic initialization for React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
