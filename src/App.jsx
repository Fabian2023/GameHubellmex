import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Game from './Components/Game'; 
import Result from './Components/Result';
import Registro from './Components/Registro';
import Introd from "./Components/Introd"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introd />} />
        <Route path="/result" element={<Result />} />
        <Route path="/game" element={<Game />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
