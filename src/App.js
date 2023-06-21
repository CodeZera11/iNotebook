import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';



function App() {
  return (
    <>
    <NoteState>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </NoteState>
    </>
  );
}

export default App;
