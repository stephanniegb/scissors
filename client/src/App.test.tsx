import { render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

it("should have test", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
