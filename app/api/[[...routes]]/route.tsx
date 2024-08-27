/** @jsxImportSource frog/jsx */

import { Button, FrameIntent, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import ky from "ky";

const app = new Frog({
  basePath: "/api",
  title: "Frog Frame",
});

app.frame("/:symbol", async (c) => {
  const symbol = c.req.param("symbol");
  const data = await ky.get(`https://mint.club/api/nft/degen/${symbol}/`);
  //   .json<{
  //     createdAt: string;
  //     chainId: number;
  //     name: string;
  //     symbol: string;
  //     tokenAddress: string;
  //     tokenType: string;
  //     isDelisted: boolean;
  //     reserveToken: boolean;
  //     metadata: Record<string, any>;
  //   }>();

  // const json = await data.json();
  // console.log(json);

  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        Select your {symbol}
      </div>
    ),
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
