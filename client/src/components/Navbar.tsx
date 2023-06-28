import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function Navbar() {
  const [logoutActive, setLogOUtActive] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(AuthContext);
  const signOutHandler = () => {
    signOut();
    navigate("/");
    setHamburgerActive(!hamburgerActive);
  };

  const handleToggle = () => {
    setLogOUtActive(!logoutActive);
  };

  const handleToggleNav = () => {
    setHamburgerActive(!hamburgerActive);
  };

  return (
    <header id="nav-header">
      <div className="nav-log">
        <Link to={"/"}>
          <div className="logo-div">
            <img src="images/Vector(5).svg" alt="" />
            <img src="images/Vector 2(1).svg" alt="" />
            <img src="images/SCISSOR 2.svg" alt="" />
          </div>
        </Link>
      </div>
      <button id="hamburger" onClick={handleToggleNav}>
        <span className={hamburgerActive ? " bar active" : "bar"}></span>
        <span className={hamburgerActive ? " bar active" : "bar"}></span>
      </button>
      <nav id="desktop-nav">
        <div>
          <ul>
            <Link to={"/urlshortner"}>
              <li>My URLs</li>
            </Link>
            <a href="#features-section">
              <li>Features</li>
            </a>
            <a href="#pricing-section">
              <li>Pricing</li>
            </a>
            <a href="#faq-section">
              <li>FAQs</li>
            </a>
          </ul>
        </div>
        {currentUser ? (
          <div id="nav-profile" onClick={handleToggle}>
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt={`${currentUser.displayName}`}
            />
            <p>
              {` ${currentUser.displayName}`}{" "}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  fill="#005ae2"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </span>
            </p>
            <div id="signOut-div" className={logoutActive ? "active" : ""}>
              <button onClick={signOutHandler}>sign out</button>
            </div>
          </div>
        ) : (
          <div id="nav-btns">
            <Link to={"/login"}>
              <button className="transparent-btn">Login</button>
            </Link>
            <a href="#shortner-section">
              <button className="blue-btn ">Try for free</button>
            </a>
          </div>
        )}
      </nav>
      <nav id="mobile-nav" className={hamburgerActive ? "active" : ""}>
        <div id="mobile-nav-top">
          {currentUser ? (
            <div id="nav-profile" onClick={handleToggle}>
              <img
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
                alt={`${currentUser.displayName}`}
              />
              <p>{` ${currentUser.displayName}`} </p>
            </div>
          ) : (
            <div id="nav-btns">
              <Link to={"/login"}>
                <button className="transparent-btn">Login</button>
              </Link>
              <a href="#shortner-section">
                <button className="blue-btn ">Try for free</button>
              </a>
            </div>
          )}
        </div>
        <ul>
          <button onClick={signOutHandler}>
            <li>Sign out</li>
          </button>
          <Link to={"/urlshortner"} onClick={handleToggleNav}>
            <li>My URLs</li>
          </Link>
          <a href="#features-section" onClick={handleToggleNav}>
            <li>Features</li>
          </a>
          <a href="#pricing-section" onClick={handleToggleNav}>
            <li>Pricing</li>
          </a>
          <a href="#faq-section" onClick={handleToggleNav}>
            <li>FAQs</li>
          </a>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
