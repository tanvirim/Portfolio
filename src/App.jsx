import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutMePage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import BackToTop from "./components/BackToTop";
import FloatingChat from "./components/FloatingChat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMePage />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
      <BackToTop />
      <FloatingChat />
    </Router>
  );
}

export default App;
