import './App.css';
import Text from './components/Text';
import Button from './components/Button';
import { useState } from 'react';

function App() {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="App">
      <Button setToggle={setToggle} btnTxt="Press to toggle" />
      <Text toggle={toggle} displayText="Testing the buttons" />
    </div>
  );
}

export default App;
