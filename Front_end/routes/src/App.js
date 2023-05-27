import './App.css';
import { Routes, Route, Link } from 'react-router-dom';


function Home() {
  return (
    <>
      <main>
        <h2>This is the Homepage</h2>
        <p>And these should be the contents to display</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>This is the About page</h2>
        <p>Info about the authors</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Testing Routes</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
