import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import 'animate.css';
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
