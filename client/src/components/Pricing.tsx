function Pricing() {
  return (
    <section id="pricing-section">
      <section>
        <h2>
          A <span className="blue-text">price perfect</span> for your needs.
        </h2>
        <p>
          From catering for your personal, business, event, socials needs, you
          can be rest assured we have you in mind in our pricing.
        </p>
      </section>
      <section id="prices">
        <div className="price">
          <div>
            <p>Basic</p>
            <h2>Free</h2>
            <h3>Free plan for all users</h3>
          </div>
          <ul>
            <li>
              <img src="/images/check-circle(1).svg" alt="icon" />
              Unlimited URL Shortening
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              Basic Link Analytics
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              Customizable Short Links
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              Standard Support
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              Ad-supported
            </li>
          </ul>
        </div>
        <div className="price">
          <div>
            <p>Professional</p>
            <h2>$15/month</h2>
            <h3>Ideal for business creators</h3>
          </div>
          <ul>
            <li>
              {" "}
              <img src="/images/check-circle.svg" alt="icon" />
              Enhanced Link Analytics
            </li>
            <li>
              <img src="/images/check-circle.svg" alt="icon" />
              Custom Branded Domains
            </li>
            <li>
              <img src="/images/check-circle.svg" alt="icon" />
              Advanced Link Customization
            </li>
            <li>
              <img src="/images/check-circle.svg" alt="icon" />
              Priority Support
            </li>
            <li>
              <img src="/images/check-circle.svg" alt="icon" />
              Ad-free Experience
            </li>
          </ul>
        </div>

        <div className="price">
          <div>
            <p>Teams</p>
            <h2>$25/month</h2>
            <h3>Share with up to 10 users</h3>
          </div>
          <ul>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              Team Collaboration
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              User Roles and Permissions
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              Enhanced Security
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              API Access
            </li>
            <li>
              {" "}
              <img src="/images/check-circle(1).svg" alt="icon" />
              Dedicated Account Manager
            </li>
          </ul>
        </div>
      </section>
      {/* <section style={{ alignSelf: "center" }}> */}
      <button>Select Pricing</button>
      {/* </section> */}
    </section>
  );
}

export default Pricing;
