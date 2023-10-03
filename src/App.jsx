import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutMePage from './pages/AboutPage';

function App() {
  return (
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutMePage />} />
      </Routes>
    </Router>
  );
}

export default App;
