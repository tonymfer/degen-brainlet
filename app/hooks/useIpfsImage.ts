import { useEffect, useState } from "react";

const fallBackIpfs = [
  "mintv2-web.myfilebase.com",
  "gateway.pinata.cloud",
  "ipfs.io",
  "dweb.link",
  "w3s.link",
];

function useIpfsImage(initialUrl?: string | null) {
  const [url, setUrl] = useState(initialUrl);
  const [maxTries, setMaxTries] = useState(0);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  function handleFallback() {
    if (!url || maxTries > fallBackIpfs.length) return;
    try {
      const currentDomain = new URL(url).hostname;
      const nextUrl = url.replace(currentDomain, fallBackIpfs[maxTries + 1]);
      setUrl(nextUrl);
      console.log("Fallback to", nextUrl);
      setMaxTries(maxTries + 1);
    } catch (e) {
      console.error(e);
      setUrl(null); // In case of a URL parsing error
    }
  }

  return { url, handleFallback };
}

export default useIpfsImage;
