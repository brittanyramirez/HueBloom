import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MoodGenerator from "./pages/MoodGenerator";
import EmotionGarden from "./pages/EmotionGarden";
import MoodHistory from "./pages/MoodHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/Dashboard";
import SupportPartnerDashboard from "./pages/Sp-dashboard";
import PartnerUpdates from "./pages/PartnerUpdates";





function App() {

  // temporary login state (later this will come from authentication)
  const isLoggedIn = true;

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
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/partner-dashboard" element={<SupportPartnerDashboard />} />
        <Route path="/partner-updates" element={<PartnerUpdates />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;