import { render, screen, fireEvent } from "@testing-library/react";
import Qqcode from "./QrCode";

test("Qqcode", () => {
  it("should generate QR code when 'Generate QR Code' button is clicked", () => {
    const url = "https://example.com";
    render(<Qqcode url={url} />);

    // Assert that the input fields for light color and dark color exist
    const lightColorInput = screen.getByPlaceholderText("light color");
    const darkColorInput = screen.getByPlaceholderText("dark color");
    expect(lightColorInput).toBeInTheDocument();
    expect(darkColorInput).toBeInTheDocument();

    // Set values for light color and dark color input fields
    fireEvent.change(lightColorInput, { target: { value: "#ffffff" } });
    fireEvent.change(darkColorInput, { target: { value: "#335383FF" } });

    // Assert that the 'Generate QR Code' button exists
    const generateButton = screen.getByText("Generate QR Code");
    expect(generateButton).toBeInTheDocument();

    // Click the 'Generate QR Code' button
    fireEvent.click(generateButton);

    // Assert that the QR code image is generated and displayed
    const qrCodeImage = screen.getByAltText("QR Code");
    expect(qrCodeImage).toBeInTheDocument();

    // Assert that the download button exists
    const downloadButton = screen.getByText("Download");
    expect(downloadButton).toBeInTheDocument();
  });
});
