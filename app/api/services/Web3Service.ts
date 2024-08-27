// import { ERC1155_ABI } from "@/constants/erc1155";
// import { uriToURL } from "@/utils/url";
// import { chainRPCFallbacks } from "mint.club-v2-sdk";
// import {
//   createPublicClient,
//   fallback,
//   HttpTransportConfig,
//   isAddress,
// } from "viem";
// import { degen } from "viem/chains";

// const chainId = 6666666666;

// export type NFTMetadata = {
//   name: string;
//   description: string;
//   image: string;
//   animation_url?: string;
//   external_url: string;
//   attributes: { trait_type: string; value: string }[];
// };

// export class Web3Service {
//   private static instances: Record<number, Web3Service> = {};
//   public publicClient;

//   private constructor() {
//     const chain = degen;

//     this.publicClient = createPublicClient({
//       chain,
//       transport: fallback(
//         chainRPCFallbacks(degen, {
//           referrer: process.env.NEXT_PUBLIC_URL,
//           referrerPolicy: "origin",
//           cache: "no-store",
//         })
//       ),
//     });
//   }

//   public static getInstance(chainId: number): Web3Service {
//     if (!Web3Service.instances[chainId]) {
//       Web3Service.instances[chainId] = new Web3Service(chainId);
//     }
//     return Web3Service.instances[chainId];
//   }

//   public static async getERC1155Json(tokenAddress: `0x${string}`) {
//     const web3Service = this.getInstance(chainId);
//     const ipfsHash = await web3Service.publicClient.readContract({
//       address: tokenAddress,
//       abi: ERC1155_ABI,
//       functionName: "uri",
//       args: [0n],
//     });

//     if (!ipfsHash) return null;
//     const { url } = uriToURL(ipfsHash);
//     const resp = await fetch(url);
//     const json = (await resp.json()) as NFTMetadata;
//     return json;
//   }

//   public static async getERC1155Image(
//     chainId: number,
//     tokenAddress: `0x${string}`
//   ) {
//     const json = await this.getERC1155Json(chainId, tokenAddress);
//     if (!json || !json?.image) return null;
//     const { url } = uriToURL(json.image);
//     return url;
//   }
// }
