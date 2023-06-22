import { useState } from "react";
import axios from "axios";
import { SERVER_ENDPOINTS } from "../../config";

interface ShortUrl {
  shortId: string;
  custom: string;
}

function UrlShortener() {
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
        Validate URL
        <input
          type="text"
          value={destination}
          onChange={handleUrlChange}
          placeholder="What's the URL?"
        />
        <input
          type="text"
          value={custom}
          onChange={handleCustomChange}
          placeholder="enter Custom"
        />
        <button type="submit">Create short URL</button> <br />
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
      </form>
    </div>
  );
}

export default UrlShortener;
