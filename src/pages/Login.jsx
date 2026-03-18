import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import floral from "../assets/floral.png";

export default function SignIn() {
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

  // this handles form submission and only submits if the form is valid
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // this is where sign in logic would go later !!!!!!!!!!!
    console.log("Sign in form submitted:", {
      role: selectedRole,
      ...formData,
    });
  };

  return (
    <main className="signin-page">
      {/* SIGN IN LAYOUT */}
      {/* this wraps the full page content into a left info panel and right form panel */}
      <section className="signin-wrapper">
        {/* LEFT PANEL */}
        {/* this side gives context, branding, and a welcoming tone before the user signs in */}
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
        {/* this is the main sign in card where the user selects a role and enters their login details */}
        <div className="signin-form-panel">
          <div className="signin-card">
            <p className="form-label">Sign In</p>
            <h2>Access your account</h2>
            <p className="form-description">
              Choose your role and enter your account details to continue.
            </p>

            {/* ROLE SELECTOR */}
            {/* this lets the person choose whether they are signing in as the main user or support partner */}
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
            {/* these fields collect the user's login information */}
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
                {/* this shows a custom error message below the email field instead of the browser default */}
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                {/* PASSWORD FIELD WRAPPER */}
                {/* this wrapper allows the input field and show/hide button to sit in the same row */}
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
                {/* this shows a custom error message below the password field instead of the browser default */}
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>

              {/* SUPPORT TEXT */}
              {/* this replaces the forgot password link with simple helpful text for now */}
              <div className="helper-row">
                <p className="helper-text">
                  Use your email and password to access your account.
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              {/* this button submits the sign in form */}
              <button type="submit" className="signin-submit-btn">
                Sign In
              </button>
            </form>

            {/* SIGN UP LINK */}
            {/* this helps users navigate to account creation if they do not already have an account */}
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