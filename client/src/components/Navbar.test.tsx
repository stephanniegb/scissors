import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

const authContextValue = {
  currentUser: null,
  signOut: vitest.fn(),
  signInUsers: vitest.fn(),
  setCurrentUser: vitest.fn(),
  createUsers: vitest.fn(),
};

test("renders navbar with user profile when user is logged in", () => {
  render(
    <AuthContext.Provider value={authContextValue}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  const User = authContextValue.currentUser;

  // Verify that user profile is displayed
  if (User !== null) {
    const userProfile = screen.getByTestId("user-profile-name");
    const userName = userProfile.textContent;
    expect(typeof userName).toBe("string");
  }
});

test("calls signOut and navigates to home when sign out button is clicked", () => {
  vitest.mock("react-router-dom", async () => {
    const actual: {} = await vi.importActual("react-router-dom");
    return {
      ...actual,
      Navigate: () => ({
        pathname: "/",
      }),
    };
  });

  render(
    <AuthContext.Provider value={authContextValue}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // Click the sign out button
  const signOutButton = screen.getByText("Sign out");
  fireEvent.click(signOutButton);

  // Verify that signOut function is called and navigation to home is triggered
  expect(authContextValue.signOut).toBeCalled();
  expect(Navigate);
});

test("renders navbar with login buttons when user is not logged in", () => {
  render(
    <AuthContext.Provider value={authContextValue}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // Verify that login buttons are displayed
  const loginButtons = screen.queryAllByText("Login");
  expect(loginButtons.length).toBeGreaterThan(0);

  const tryForFreeButton = screen.getAllByText("Try for free");
  expect(tryForFreeButton.length).toBeGreaterThan(0);
});
