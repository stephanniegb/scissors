import { Link } from "react-router-dom";

function Banner() {
  return (
    <section id="banner-section">
      <h2>Revolutionizing Link Optimization</h2>
      <Link to={"/login"}>
        <button className="blue-btn">Get Started</button>
      </Link>
    </section>
  );
}

export default Banner;
