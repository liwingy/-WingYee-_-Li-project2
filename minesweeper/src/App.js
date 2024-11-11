import './styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './views/Homepage';
import Game from './views/Game';
import Rules from './views/Rules';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/game/easy">Easy</Link>
        <Link to="/game/medium">Medium</Link>
        <Link to="/game/hard">Hard</Link>
        <Link to="/rules">Rules</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game/:difficulty" element={<Game />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;
