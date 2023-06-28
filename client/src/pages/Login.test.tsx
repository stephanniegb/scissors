import { render, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the createUsers function
const mockCreateUsers = vitest.fn();

test("Register component", () => {
  it("should render the registration form and submit the form successfully", async () => {
    const authContextValue = {
      currentUser: null,
      signOut: vitest.fn(),
      signInUsers: vitest.fn(),
      setCurrentUser: vitest.fn(),
      createUsers: mockCreateUsers,
    };
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthContext.Provider value={authContextValue}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    // Fill in the form fields
    fireEvent.change(getByPlaceholderText("Email address"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText("password"), {
      target: { value: "test@example.com" },
    });

    // Submit the form
    fireEvent.click(getByText("Log in"));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockCreateUsers).toHaveBeenCalledWith({
        email: "test@example.com",
        createPassword: "password",
      });
      expect(mockCreateUsers).toHaveBeenCalledTimes(1);
    });

    // Check if navigation to the login page occurred
    expect(Navigate).toHaveBeenCalledWith("/urlshortner");
  });
});
