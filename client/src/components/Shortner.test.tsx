import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Shortner from "./Shortner";
import axios from "axios";
import { SERVER_ENDPOINTS } from "../../config";

test("renders Shortner component", () => {
  render(<Shortner />);

  // Assert that the input fields are rendered
  const urlInput = screen.getByPlaceholderText("Paste long URL here...");
  const customInput = screen.getByPlaceholderText("Type Alias here");

  expect(urlInput).toBeInTheDocument();
  expect(customInput).toBeInTheDocument();
});

test("submits the form", async () => {
  render(<Shortner />);

  // Simulate user input
  const urlInput = screen.getByPlaceholderText("Paste long URL here...");
  const customInput = screen.getByPlaceholderText("Type Alias here");
  const submitButton = screen.getByRole("button", { name: /trim url/i });

  fireEvent.change(urlInput, { target: { value: "https://example.com" } });
  fireEvent.change(customInput, { target: { value: "example" } });
  fireEvent.click(submitButton);

  // Wait for the loading spinner to be present
  await waitFor(() => screen.getByTestId("loader"));

  // Wait for the loading spinner to disappear
  await waitFor(() => !screen.queryByTestId("loader"));
});

test("displays results-div when shortUrl is provided", async () => {
  const mockShortUrl = {
    shortId: "abc123",
    custom: "custom-url",
  };

  const mockPost = vitest.spyOn(axios, "post");
  mockPost.mockResolvedValue({ data: mockShortUrl });

  render(<Shortner />);

  // Simulate form submission
  fireEvent.change(screen.getByPlaceholderText("Paste long URL here..."), {
    target: { value: "https://example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Type Alias here"), {
    target: { value: "custom-url" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Trim URL" }));

  // Wait for the shortUrl to be set
  await waitFor(() => screen.getByText("Short Url"));

  // Assertions for the displayed content
  expect(screen.getByText("Long Url")).toBeInTheDocument();
  expect(screen.getByText("https://example.com")).toBeInTheDocument();
  expect(screen.getByText("Short Url")).toBeInTheDocument();
  expect(screen.getByText(`${SERVER_ENDPOINTS}/abc123`)).toBeInTheDocument();
  expect(screen.getByText("Custom url")).toBeInTheDocument();
  expect(
    screen.getByText(`${SERVER_ENDPOINTS}/custom-url`)
  ).toBeInTheDocument();

  // Restore the original axios.post implementation
  mockPost.mockRestore();
});

test("displays results-div with QR code when shortUrl is provided", async () => {
  const mockShortUrl = {
    shortId: "abc123",
    custom: "custom-url",
  };

  const mockPost = vitest.spyOn(axios, "post");
  mockPost.mockResolvedValue({ data: mockShortUrl });

  render(<Shortner />);

  // Simulate form submission
  fireEvent.change(screen.getByPlaceholderText("Paste long URL here..."), {
    target: { value: "https://example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Type Alias here"), {
    target: { value: "custom-url" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Trim URL" }));

  // Wait for the shortUrl to be set
  await waitFor(() => screen.getByText("Short Url"));

  // Assert that the QR code component is not rendered initially
  expect(screen.queryByAltText("QR Code")).not.toBeInTheDocument();
  // // Assert that the QR code component is rendered after receiving the response
  await waitFor(() => {
    screen.findByText(
      `https://capstone-scissors-api.onrender.com/${mockShortUrl.shortId}`
    );
    // Check if the Generate button is rendered
    const generateButton = screen.getByRole("button", {
      name: "Generate QR Code",
    });
    expect(generateButton).toBeInTheDocument();
  });
});
