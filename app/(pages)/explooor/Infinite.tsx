"use client";

import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { mferFont } from "@/fonts";
import useERC20Price from "@/hooks/useERC20Price";
import { useGlobalStore } from "@/stores/global";
import { cn } from "@/utils/classnames";
import { commify, shortenNumber } from "mint.club-v2-sdk";
import React, { ReactNode, useEffect, useState } from "react";

export default function InfiniteText({
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const list = useGlobalStore((state) => state.list);
  const tvls = useGlobalStore((state) => state.tvl);
  const _totalTvl = Array.from(tvls.values()).reduce(
    (acc, tvl) => acc + tvl,
    0
  );
  const { price: _price } = useERC20Price(BRAINLET_TOKEN_ADDRESS);
  const price = commify(_price);
  const totalTvl = commify(Math.floor(_totalTvl));

  function StringComponent({ children }: { children: ReactNode }) {
    return (
      <li
        className={`relative max-w-full px-2 ${mferFont.className} text-base md:text-3xl rounded-lg w-fit flex-shrink-0 flex items-center justify-center`}
      >
        <blockquote>
          <div
            aria-hidden="true"
            className={`user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]`}
          ></div>
          • {children}
        </blockquote>
      </li>
    );
  }

  useEffect(() => {
    addAnimation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  function updateAnimation() {
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item, index) => {
        // Assuming the stats are always in the same order: TVL, Price, Meme Count
        if (index % 3 === 0) {
          // TVL
          item.textContent = `•   Total Locked: ${totalTvl} $BRAINLET`;
        } else if (index % 3 === 1) {
          // Price
          item.textContent = `•   $BRAINLET PRICE: ${price}`;
        } else if (index % 3 === 2) {
          // Meme Count
          item.textContent = `•   MEME COUNT: ${list.length}`;
        }
      });
    }
  }

  useEffect(() => {
    updateAnimation();
  }, [totalTvl, price, list.length]);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        // "scroller relative z-20 max-w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        "scroller relative z-20 max-w-full overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex w-max min-w-full shrink-0 flex-nowrap gap-1 py-0 sm:py-4",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        <StringComponent>Total Locked: {totalTvl} $BRAINLET</StringComponent>
        <StringComponent>$BRAINLET PRICE: {price}</StringComponent>
        <StringComponent>MEME COUNT: {list.length}</StringComponent>
        <StringComponent>Total Locked: {totalTvl} $BRAINLET</StringComponent>
        <StringComponent>$BRAINLET PRICE: {price}</StringComponent>
        <StringComponent>MEME COUNT: {list.length}</StringComponent>
      </ul>
    </div>
  );
}
