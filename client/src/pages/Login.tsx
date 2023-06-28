import { useFormik } from "formik";
import { loginFormConfig } from "../util/forms";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faEye, faEyeSlash);
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const {
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    errors,
    touched,
  } = useFormik(loginFormConfig);

  const navigate = useNavigate();

  const { signInUsers, currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const submitHandler = (e: any) => {
    e.preventDefault();
    signInUsers(values);
    navigate("/urlshortner");
    handleSubmit;
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <main id="login-register">
      <section className="auth-wrappers">
        <div>
          <p>Log in with:</p>
          <div className="google-apple-div">
            <img src="images/Google.svg" alt="" />
            <img src="images/Apple.svg" alt="" />
          </div>
        </div>
        <div>
          <span className="dash"></span> or <span className="dash"></span>
        </div>

        <form onSubmit={submitHandler}>
          <div className="input-div">
            <input
              type="text"
              name="email_Username"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email address"
              className={
                errors.email_Username && touched.email_Username
                  ? "input-error"
                  : ""
              }
              value={values.email_Username}
            />
            {errors.email_Username && touched.email_Username && (
              <p className="error">{errors.email_Username}</p>
            )}
          </div>
          <div className="password-div input-div">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id=""
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
              value={values.password}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="show-btn"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} className="eye-icon" />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" />
              )}
            </button>
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>
          <a className="forgot-pass" href="#">
            Forgot your password?
          </a>
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            Log in
          </button>
        </form>

        <div>
          <p>
            Don’t have an account?
            <span>
              <Link to={"/register"}>Sign up</Link>
            </span>
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

export default Login;
