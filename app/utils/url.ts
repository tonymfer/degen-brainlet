import { MCV2_IPFS_GATEWAY } from "@/hooks/useERC1155Image";

export function getPublicUrl() {
  if (process.env.GENERATE === "true")
    return `http://localhost:${process.env.PORT}`;
  return process.env.NODE_ENV === "production"
    ? "https://brainlets.life"
    : `http://localhost:${process.env.PORT || 3000}`;
}

export function uriToURL(urlOrHash?: string): {
  url: string;
  protocol: "https" | "ipfs" | undefined;
} {
  if (urlOrHash) {
    urlOrHash = urlOrHash.replace(/^ipfs:\/\//, "");
    return { url: `${MCV2_IPFS_GATEWAY}${urlOrHash}`, protocol: "ipfs" };
  }

  return { url: "", protocol: undefined };
}
