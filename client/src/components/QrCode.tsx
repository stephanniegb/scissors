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
    <div>
      <h2>set colors</h2>
      <div id="colors-input-div">
        <div>
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
        {prop.url && <button onClick={generateQRcode}>Generate QR Code</button>}
      </div>
      {qrcode && (
        <div id="qr-img">
          <img src={qrcode} alt="QR Code" />
          <a href={qrcode} download={"qrcode.png"}>
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Qqcode;
