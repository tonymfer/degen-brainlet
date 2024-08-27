"use client";
import { DEGEN_CHAIN_ID } from "@/constants";
import { ERC1155_ABI } from "@/constants/erc1155";
import useIpfsImage from "@/hooks/useIpfsImage";
import { uriToURL } from "@/utils/url";
import { mintclub } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useReadContract } from "wagmi";
export const MCV2_IPFS_GATEWAY = "https://mintv2-web.myfilebase.com/ipfs/";

export function useERC1155Image({
  address,
}: {
  address?: `0x${string}` | undefined | "";
}) {
  const { data: uri } = useUri({
    address,
  });

  const { url } = uriToURL(uri);
  const { url: fallbackUrl, handleFallback } = useIpfsImage(url);
  console.log("fallbackUrl", fallbackUrl, url, uri);

  return {
    image: fallbackUrl || url,
    handleFallback,
  };
}

function useUri({ address }: { address?: `0x${string}` | undefined | "" }) {
  const [uri, setUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!address) return;

    const fetchUri = async () => {
      try {
        const nft = mintclub.network("degen").nft(address);
        const uri = await nft.getImageUri();
        console.log("uri", uri);
        setUri(uri);
      } catch (error) {
        console.error("Failed to fetch URI:", error);
      }
    };

    fetchUri();
  }, [address]);

  return { data: uri };
}
