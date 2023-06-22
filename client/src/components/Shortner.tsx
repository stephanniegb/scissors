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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste URL here..."
          value={destination}
          onChange={handleUrlChange}
        />
        <select name="" id="">
          <option value="">Choose Domain</option>
        </select>
        <input
          type="text"
          placeholder="Type Alias here"
          onChange={handleCustomChange}
        />
        <button type="submit">Trim URL</button>
        <p>
          By clicking TrimURL, I agree to the Terms of Service, Privacy Policy
          and Use of Cookies.
        </p>
      </form>
      {shortUrl && custom.length > 0 && (
        <div>
          <a href={`${SERVER_ENDPOINTS}/${shortUrl.custom}`}>Click me</a>
          <p>{`${SERVER_ENDPOINTS}/${shortUrl.custom}`}</p>
        </div>
      )}
      {shortUrl && (
        <div>
          <a href={`${SERVER_ENDPOINTS}/${shortUrl.shortId}`}>Click me</a>
          <p>{`${SERVER_ENDPOINTS}/${shortUrl.shortId}`}</p>
        </div>
      )}
      {JSON.stringify(shortUrl)}
    </div>
  );
}

export default Shortner;
