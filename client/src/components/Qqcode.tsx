import { useState } from "react";
import QRCode from "qrcode";

type QRcodeProps = {
  url: string;
};

function Qqcode(prop: QRcodeProps) {
  const [qrcode, setQrcode] = useState("");
  const [darkColor, setDarkColor] = useState("#335383FF");
  const [lightColor, setLightColor] = useState("#ffffff");

  const generateQRcode = () => {
    QRCode.toDataURL(
      prop.url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: `${darkColor}`,
          light: `${lightColor}`,
        },
      },
      (error, URL) => {
        if (error) {
          console.error(error);
        } else {
          setQrcode(URL);
        }
      }
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h2>set colors</h2>
      <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
        <input
          type="text"
          value={lightColor}
          onChange={(e) => {
            setLightColor(e.target.value);
          }}
          placeholder="light color"
        />
        <input
          type="text"
          value={darkColor}
          onChange={(e) => {
            setDarkColor(e.target.value);
          }}
          placeholder="dark color"
        />
        {prop.url && <button onClick={generateQRcode}>Generate QR Code</button>}
      </div>
      {qrcode && (
        <>
          <img
            src={qrcode}
            alt="QR Code"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "480px",
              borderRadius: "8px",
            }}
          />
          <a href={qrcode} download={"qrcode.png"}>
            <button>Download</button>
          </a>
        </>
      )}
    </div>
  );
}

export default Qqcode;
