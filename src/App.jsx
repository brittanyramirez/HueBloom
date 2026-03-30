import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserRoute from "./components/UserRoute";
import PartnerRoute from "./components/PartnerRoute";
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
import PartnerSupport from "./pages/PartnerSupport";
import NotFound from "./pages/NotFound";

function App() {
  // this state stores the current logged in user
  const [user, setUser] = useState(null);

  // when app loads, check if a user is saved
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("huebloomUser"));
      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
      localStorage.removeItem("huebloomUser");
    }
  }, []);

  const isLoggedIn = !!user;
  const userRole = user?.role || null;

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        setUser={setUser}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/how-it-works" element={<HowItWorks />} />

        <Route
          path="/dashboard"
          element={
            <UserRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <Dashboard />
            </UserRoute>
          }
        />

        <Route
          path="/generate"
          element={
            <UserRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <MoodGenerator />
            </UserRoute>
          }
        />

        <Route
          path="/garden"
          element={
            <UserRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <EmotionGarden />
            </UserRoute>
          }
        />

        <Route
          path="/history"
          element={
            <UserRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <MoodHistory />
            </UserRoute>
          }
        />

        <Route
          path="/partner-dashboard"
          element={
            <PartnerRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <SupportPartnerDashboard />
            </PartnerRoute>
          }
        />

        <Route
          path="/partner-updates"
          element={
            <PartnerRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <PartnerUpdates />
            </PartnerRoute>
          }
        />

        <Route
          path="/partner-support"
          element={
            <PartnerRoute isLoggedIn={isLoggedIn} userRole={userRole}>
              <PartnerSupport />
            </PartnerRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;