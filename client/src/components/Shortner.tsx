import { useState } from "react";
import axios from "axios";
import { SERVER_ENDPOINTS } from "../../config";
import Qqcode from "./Qqcode";

interface ShortUrl {
  shortId: string;
  custom: string;
}
function Shortner() {
  const [destination, setDestination] = useState("");
  const [custom, setCustom] = useState("");
  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustom(e.target.value);
  };
  // `${SERVER_ENDPOINTS}/api/url`
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShortUrl(null);
    try {
      const response = await axios.post(
        `https://capstone-scissors-api.onrender.com`,
        {
          destination,
          ...(custom && { custom }),
        }
      );
      const result = response.data;
      setShortUrl(result);
    } catch (error) {
      console.log("Error creating short URL:", error);
    }
  };
  return (
    <section id="shortner-section" className="">
      <form onSubmit={handleSubmit} className="form-width">
        <input
          type="text"
          placeholder="Paste long URL here..."
          value={destination}
          onChange={handleUrlChange}
        />

        <div id="input-div">
          <select name="" id="">
            <option value="">Choose Domain</option>
          </select>
          <input
            type="text"
            placeholder="Type Alias here"
            onChange={handleCustomChange}
          />
        </div>
        <button type="submit" id="btn-2">
          Trim URL <img src="/images/magic wand.svg" alt="" />
        </button>
        <p>
          By clicking TrimURL, I agree to the <b>Terms of Service</b>, <br />
          <b>Privacy Policy</b> and Use of Cookies.
        </p>
      </form>
      {shortUrl && (
        <>
          <table className="shortner-form">
            <thead>
              <th>Long Url</th>
              <th>Short Url</th>
              <th>Custom url</th>
            </thead>
            <tbody>
              <td>{destination}</td>
              <td>{`${SERVER_ENDPOINTS}/${shortUrl.shortId}`}</td>
              <td>
                {shortUrl.custom === undefined
                  ? " "
                  : `${SERVER_ENDPOINTS}/${shortUrl.custom}`}
              </td>
            </tbody>
          </table>
          <Qqcode url={`${SERVER_ENDPOINTS}/${shortUrl.shortId}`} />
        </>
      )}
    </section>
  );
}

export default Shortner;
