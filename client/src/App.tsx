import "./styles/styles.scss";
import { Footer, Navbar } from "./components";
import Routing from "./routes/Routing";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routing />
      <Footer />
    </>
  );
}

export default App;
