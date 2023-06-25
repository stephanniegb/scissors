import { useState } from "react";
import QRCode from "qrcode";
import { QRCodeSVG } from "qrcode.react";

function Qqcode() {
  const [url, setUrl] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [darkColor, setDarkColor] = useState("#335383FF");
  const [lightColor, setLightColor] = useState("#ffffff");

  const generateQRcode = () => {
    QRCode.toDataURL(
      url,
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
    <div style={{ background: "darkblue" }}>
      <QRCodeSVG
        value="https://reactjs.org/"
        level="Q"
        bgColor="#ffffff"
        fgColor="#335383FF"
      />
      ,
      <input
        type="text"
        placeholder="enter url"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <div>
        <h2>set colors</h2>
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
      </div>
      <button onClick={generateQRcode}>Generate</button>
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
            Download
          </a>
        </>
      )}
    </div>
  );
}

export default Qqcode;
