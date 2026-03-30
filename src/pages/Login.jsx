import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import floral from "../assets/floral.png";
const API_URL = import.meta.env.VITE_API_URL;
export default function SignIn({ setUser }) {
  // this state stores the currently selected user role
  const [selectedRole, setSelectedRole] = useState("user");

  // this state controls whether the password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);

  // this state stores the user's form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // this state stores custom validation error messages
  const [errors, setErrors] = useState({});

  // this lets us redirect after login
  const navigate = useNavigate();

  // this function updates the form fields as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // if the user starts typing again, remove the old error for that field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // this function checks the form and adds custom error messages if needed
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  // this handles form submission and connects to the backend login API
  const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({
        general: data.message || "Login failed",
      });
      return;
    }

    localStorage.setItem("huebloomUser", JSON.stringify(data.user));
    setUser(data.user);

    console.log("Logged in user:", data.user);
    console.log("Role from backend:", data.user.role);

    if (
  data.user.role === "partner" ||
  data.user.role === "support_partner"
) {
  navigate("/partner-dashboard");
} else {
  navigate("/dashboard");
}
  } catch (error) {
    console.error("Login request error:", error);

    setErrors({
      general: "Something went wrong. Please try again.",
    });
  }
};

  return (
    <main className="signin-page">
      {/* SIGN IN LAYOUT */}
      <section className="signin-wrapper">
        {/* LEFT PANEL */}
        <div className="signin-info-panel">
          <div>
            <p className="signin-label">Welcome Back</p>

            <h1>
              Continue your
              <span> HueBloom </span>
              journey with care and support.
            </h1>

            <p className="signin-description">
              Sign in to continue reflecting, tracking emotional growth, and
              connecting through a wellness experience designed for both the main
              user and the support partner.
            </p>

            <div className="signin-info-card">
              <h3>Two ways to sign in</h3>
              <p>
                Main users can access their personal reflection tools, while
                support partners can sign in to stay connected and offer gentle,
                trusted encouragement.
              </p>
            </div>
          </div>

          <img
            src={floral}
            alt="Soft floral illustration"
            className="signin-side-image"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="signin-form-panel">
          <div className="signin-card">
            <p className="form-label">Sign In</p>
            <h2>Access your account</h2>
            <p className="form-description">
              Choose your role and enter your account details to continue.
            </p>

            {/* ROLE SELECTOR */}
            <div className="role-toggle">
              <button
                type="button"
                className={
                  selectedRole === "user"
                    ? "role-btn active-role"
                    : "role-btn"
                }
                onClick={() => setSelectedRole("user")}
              >
                Main User
              </button>

              <button
                type="button"
                className={
                  selectedRole === "partner"
                    ? "role-btn active-role"
                    : "role-btn"
                }
                onClick={() => setSelectedRole("partner")}
              >
                Support Partner
              </button>
            </div>

            {/* SIGN IN FORM */}
            <form className="signin-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* CUSTOM EMAIL ERROR */}
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                {/* PASSWORD FIELD WRAPPER */}
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* CUSTOM PASSWORD ERROR */}
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>

              {/* SUPPORT TEXT */}
              <div className="helper-row">
                <p className="helper-text">
                  Use your email and password to access your account.
                </p>
              </div>

              {/* GENERAL ERROR MESSAGE */}
              {errors.general && (
                <p className="error-text">{errors.general}</p>
              )}

              {/* SUBMIT BUTTON */}
              <button type="submit" className="signin-submit-btn">
                Sign In
              </button>
            </form>

            {/* SIGN UP LINK */}
            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}