function Navbar() {
  return (
    <nav>
      <div className="nav-log">
        <div className="logo-div">
          <img src="images/Vector(5).svg" alt="" />
          <img src="images/Vector 2(1).svg" alt="" />
          <img src="images/SCISSOR 2.svg" alt="" />
        </div>
      </div>
      <div>
        <ul>
          <li>My URLs</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div>
        <button>Login</button>
        <button>Try for free</button>
      </div>
    </nav>
  );
}

export default Navbar;
