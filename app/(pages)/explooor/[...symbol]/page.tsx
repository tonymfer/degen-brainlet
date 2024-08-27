import { sharedMetadata } from "@/constants/metadata";
import { getPublicUrl } from "@/utils/url";
import { getFrameMetadata } from "frog/next";
import { Metadata } from "next";
import Detail from "./Detail";

// export async function generateMetadata({
//   params: { symbol },
// }: {
//   params: {
//     symbol: string;
//   };
// }): Promise<Metadata> {
//   const frameMetadata = await getFrameMetadata(
//     // `${getPublicUrl()}/api/${symbol}`
//     `https://localhost:3000/api/${symbol}`
//   );

//   return {
//     ...sharedMetadata,
//     other: frameMetadata,
//   };
// }

export default function Page() {
  return <Detail />;
}
