import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';



function App() {
  return (
    <>
    <NoteState>
      <Navbar/>
      {/* <Alert message="This is an awesome react?"/> */}
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
      </NoteState>
    </>
  );
}

export default App;
