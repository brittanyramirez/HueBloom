import { Navigate } from "react-router-dom";

export default function PartnerRoute({ isLoggedIn, userRole, children }) {
  // if not logged in → go to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // if logged in BUT not a partner → go home
  if (userRole !== "partner" && userRole !== "support_partner") {
    return <Navigate to="/" replace />;
  }

  // otherwise allow access
  return children;
}