import { use, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import tulips from "../assets/tulips.png";

export default function Signup() {
    //this state stores the currntly selected user role
    const [selectedRole, setSelectedRole] = useState("user");

    //this state controls whether the password will be visible
    const [showPassword, setShowPassword] = useState(false);

    //this state controls whether the conforim pass is visible
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //storing the users form input values
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // stores the error message 
    const [errors, setErrors] = useState({});

    //updates the form fields as user types
    const handleChange = (event) => {
        const { name, value} = event.target;

        setFormData({
            ...formData,[name]: value,
        });
        //remove the old error when user typing
        setErrors({
            ...errors, [name]: "",
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Please enter your full name.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email address.";} 
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please create a password.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  {/*this function handles form submission */}
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // sign up logic will go here later!!!!!!!!
    console.log("Sign up form submitted:", {
        role: selectedRole,
        ...formData,
    });
};

return (
    <main className="signup-page">
        {/* SIGN UP LAYOUT */}
      <section className="signup-wrapper">
        <div className="signup-info-panel">
          <div>
            <p className="signup-label">Create Your Account</p>

            <h1>
              Begin your
              <span> HueBloom </span>
              experience with care, reflection, and support.
            </h1>

            <p className="signup-description">
              Create an account to begin your wellness journey. Whether you are
              joining as the main user or as a support partner, HueBloom is
              designed to feel gentle, welcoming, and easy to use.
            </p>

            <div className="signup-info-card">
              <h3>Choose the role that fits you</h3>
              <p>
                Main users can use HueBloom to reflect and track emotional
                growth, while support partners can stay connected and offer
                encouragement in a trusted and supportive way.
              </p>
            </div>
          </div>
<img
            src={tulips}
            alt="Tulip illustration"
            className="signup-side-image"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="signup-form-panel">
          <div className="signup-card">
            <p className="form-label">Sign Up</p>
            <h2>Create your account</h2>
            <p className="form-description">
              Enter your details below to get started with HueBloom.
            </p>

            {/* ROLE SELECTOR */}
            {/* this lets the person choose whether they are signing up as the main user or support partner */}
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

            {/* SIGN UP FORM */}
            <form className="signup-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                {/* CUSTOM FULL NAME ERROR */}
                {errors.fullName && (
                  <p className="error-text">{errors.fullName}</p>
                )}
              </div>

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
                <label htmlFor="password">Create Password</label>

                {/* PASSWORD FIELD WRAPPER */}
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a password"
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>

                {/* CONFIRM PASSWORD FIELD WRAPPER */}
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* CUSTOM CONFIRM PASSWORD ERROR */}
                {errors.confirmPassword && (
                  <p className="error-text">{errors.confirmPassword}</p>
                )}
              </div>
              {/* SUPPORT TEXT */}
              <div className="helper-row">
                <p className="helper-text">
                  Your information will be used to create your HueBloom account.
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" className="signup-submit-btn">
                Sign Up Now
              </button>
            </form>

            {/* SIGN IN LINK */}
            <p className="signin-text">
              Already have an account?{" "}
              <Link to="/login" className="signin-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
    );
}