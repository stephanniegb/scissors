import { useFormik } from "formik";
import { registerFormConfig } from "../util/forms";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faEye, faEyeSlash);
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const {
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    errors,
    touched,
  } = useFormik(registerFormConfig);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setError(null);
    createUsers(values);
    handleSubmit;
    if (error === null) {
      navigate("/login");
    }
  };
  const { createUsers, error, setError } = useContext(AuthContext);

  return (
    <main id="login-register">
      <section className="auth-wrappers">
        <div>
          <p>Sign up with:</p>
          <div className="google-apple-div">
            <a href="#">
              <img src="images/Google.svg" alt="" />
            </a>
            <a href="#">
              <img src="images/Apple.svg" alt="" />
            </a>
          </div>
        </div>
        <div>
          <span className="dash"></span> or <span className="dash"></span>
        </div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="Username"
              className={
                errors.username && touched.username ? "input-error" : ""
              }
            />
            {errors.username && touched.username && (
              <p className="error">{errors.username}</p>
            )}
          </div>
          <div className="input-div">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>
          <div className="password-div input-div">
            <input
              type={showPassword ? "text" : "password"}
              name="createPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className={
                errors.createPassword && touched.createPassword
                  ? "input-error"
                  : ""
              }
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="show-btn"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="eye-icon" />
              )}
            </button>
            {errors.createPassword && touched.createPassword && (
              <p className="error">{errors.createPassword}</p>
            )}
          </div>
          <div className="password-div input-div">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Retype Password"
              className={
                errors.confirmPassword && errors.confirmPassword
                  ? "input-error"
                  : ""
              }
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="show-btn"
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="eye-icon" />
              )}
            </button>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            Sign up with Email
          </button>
        </form>

        <div>
          <p>
            Already have an account?<Link to={"/login"}>Log in</Link>
          </p>

          <p>
            <span className="ligther">
              By signing in with an account, you agree to
            </span>
          </p>
          <p>
            <span className="ligther">Sciccor's</span>
            Terms of Service, Privacy Policy{" "}
            <span className="ligther">and</span> Acceptable Use Policy.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
