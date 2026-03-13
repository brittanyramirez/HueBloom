import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoodGenerator from "./pages/MoodGenerator";
import EmotionGarden from "./pages/EmotionGarden";
import MoodHistory from "./pages/MoodHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<MoodGenerator />} />
        <Route path="/garden" element={<EmotionGarden />} />
        <Route path="/history" element={<MoodHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;