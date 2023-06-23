import { Link } from "react-router-dom";

function Hero() {
  return (
    <section id="hero">
      <nav></nav>
      <main>
        <h1>
          {" "}
          Optimize Your Online Experience with Our <br />
          Advanced{" "}
          <span className="blue-text">
            <u>URL Shortening</u>
          </span>{" "}
          Solution
        </h1>
        <p>
          Personalize your shortened URLs to align with your brand identity.
          Utilize custom slugs, branded links, and domain customization options
          to reinforce your brand presence and enhance user engagement.
        </p>
        <div id="hero-btns">
          <Link to={"/register"}>
            <button className="blue-btn">Sign Up</button>
          </Link>
          <button className="transparent-btn">Learn more</button>
        </div>
        <div id="hero-imgs">
          <img src="/images/Frame 29546.png" alt="" />
          <img src="/images/Group 3.png" alt="" />
        </div>
      </main>
    </section>
  );
}

export default Hero;
