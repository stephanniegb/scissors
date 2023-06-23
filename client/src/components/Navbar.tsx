import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <div className="nav-log">
        <Link to={"/"}>
          <div className="logo-div">
            <img src="images/Vector(5).svg" alt="" />
            <img src="images/Vector 2(1).svg" alt="" />
            <img src="images/SCISSOR 2.svg" alt="" />
          </div>
        </Link>
      </div>
      <div>
        <ul>
          <li>My URLs</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div id="nav-btns">
        <Link to={"/login"}>
          <button className="transparent-btn">Login</button>
        </Link>
        <a href="#shortner-section">
          <button className="blue-btn ">Try for free</button>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
