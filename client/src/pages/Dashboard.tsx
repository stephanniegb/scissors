import {
  Navbar,
  Hero,
  Features,
  Pricing,
  Shortner,
  FAQ,
  Footer,
  Banner,
} from "../components";

function Dashboard() {
  return (
    <main id="dashboard">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Shortner />
      <FAQ />
      <Banner />
      <Footer />
    </main>
  );
}

export default Dashboard;
