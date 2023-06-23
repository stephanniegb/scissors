import { useState } from "react";
import axios from "axios";
import { SERVER_ENDPOINTS } from "../../config";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShortUrl(null);
    try {
      const response = await axios.post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
        ...(custom && { custom }),
      });
      const result = response.data;
      setShortUrl(result);
    } catch (error) {
      console.log("Error creating short URL:", error);
    }
  };
  return (
    <section id="shortner-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste URL here..."
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
        <button type="submit">
          Trim URL <img src="/images/magic wand.svg" alt="" />
        </button>
        <p>
          By clicking TrimURL, I agree to the <b>Terms of Service</b>, <br />
          <b>Privacy Policy</b> and Use of Cookies.
        </p>
      </form>
      <div id="url-div">
        {shortUrl && custom.length > 0 && (
          <>
            <div>
              <h4>Link</h4>
              <a href={`${SERVER_ENDPOINTS}/${shortUrl.custom}`}>Click me</a>
            </div>
            <div>
              <h4>Copy Url</h4>
              <p>{`${SERVER_ENDPOINTS}/${shortUrl.custom}`}</p>
            </div>
          </>
        )}
        {shortUrl && (
          <>
            <div>
              <h4>Link</h4>
              <a href={`${SERVER_ENDPOINTS}/${shortUrl.shortId}`}>Click me</a>
            </div>
            <div>
              <h4>Copy Url</h4>
              <p>{`${SERVER_ENDPOINTS}/${shortUrl.shortId}`}</p>
            </div>
          </>
        )}
        {/* {JSON.stringify(shortUrl)} */}
      </div>
    </section>
  );
}

export default Shortner;
