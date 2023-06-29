import { render, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import Register from "./Register";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

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
          <Register />
        </AuthContext.Provider>
      </Router>
    );

    // Fill in the form fields
    fireEvent.change(getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByPlaceholderText("Retype Password"), {
      target: { value: "password" },
    });

    // Submit the form
    fireEvent.click(getByText("Sign up with Email"));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockCreateUsers).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        createPassword: "password",
        confirmPassword: "password",
      });
      expect(mockCreateUsers).toHaveBeenCalledTimes(1);
    });

    // Check if navigation to the login page occurred
    expect(Navigate).toHaveBeenCalledWith("/login");
  });
});
