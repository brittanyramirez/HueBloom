import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MoodGenerator from "./pages/MoodGenerator";
import EmotionGarden from "./pages/EmotionGarden";
import MoodHistory from "./pages/MoodHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  // temporary login state (later this will come from authentication)
  const isLoggedIn = false;

  return (
    <BrowserRouter>

      {/* Navbar sits ABOVE the routes so it appears on every page */}
      <Navbar isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<MoodGenerator />} />
        <Route path="/garden" element={<EmotionGarden />} />
        <Route path="/history" element={<MoodHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;