import { Navigate } from "react-router-dom";

export default function UserRoute({ isLoggedIn, userRole, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
}