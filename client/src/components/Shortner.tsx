import { useState } from "react";
import axios from "axios";
import { SERVER_ENDPOINTS } from "../../config";
import Qqcode from "./QrCode";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ShortUrl {
  shortId: string;
  custom: string;
}
function Shortner() {
  const [destination, setDestination] = useState("");
  const [custom, setCustom] = useState("");
  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await axios.post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
        ...(custom && { custom }),
      });
      const result = response.data;
      setShortUrl(result);
      setIsLoading(false);
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
          <input
            type="text"
            placeholder="Type Alias here"
            onChange={handleCustomChange}
          />
        </div>
        <button type="submit" id="btn-2" disabled={isLoading ? true : false}>
          Trim URL <img src="/images/magic wand.svg" alt="" />
          {isLoading && <div className="loader" data-testid="loader"></div>}
        </button>
        <p>
          By clicking TrimURL, I agree to the <b>Terms of Service</b>, <br />
          <b>Privacy Policy</b> and Use of Cookies.
        </p>
      </form>
      {shortUrl && (
        <section id="results-div">
          <section className="shortner-result">
            <div>
              <h3>Long Url</h3>
              <div className="result">
                <a href={destination} target="_blank" rel="noopener noreferrer">
                  {destination}
                </a>

                <CopyToClipboard text={destination}>
                  <img src="/icon/copy.svg" alt="copy" />
                </CopyToClipboard>
              </div>
            </div>
            <div>
              <h3>Short Url</h3>
              <div className="result">
                <a
                  href={`${SERVER_ENDPOINTS}/${shortUrl.shortId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`${SERVER_ENDPOINTS}/${shortUrl.shortId}`}</a>
                <CopyToClipboard text="help">
                  <img src="/icon/copy.svg" alt="copy" />
                </CopyToClipboard>
              </div>
            </div>
            {shortUrl.custom && (
              <div>
                <h3>Custom url</h3>
                <div className="result">
                  <a
                    href={`${SERVER_ENDPOINTS}/${shortUrl.custom}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{`${SERVER_ENDPOINTS}/${shortUrl.custom}`}</a>

                  <CopyToClipboard
                    text={`${SERVER_ENDPOINTS}/${shortUrl.custom}`}
                  >
                    <img src="/icon/copy.svg" alt="copy" />
                  </CopyToClipboard>
                </div>
              </div>
            )}
          </section>
          <Qqcode url={`${SERVER_ENDPOINTS}/${shortUrl.custom}`} />{" "}
        </section>
      )}
    </section>
  );
}

export default Shortner;
