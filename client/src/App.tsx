import "./styles/styles.scss";
import { Custom, Footer, Navbar } from "./components";
import Routing from "./routes/Routing";

function App() {
  return (
    <>
      <Custom />
      {/* <Navbar /> */}
      <Routing />
      <Footer />
    </>
  );
}

export default App;
