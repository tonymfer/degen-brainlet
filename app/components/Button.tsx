"use client";

import Loading from "@/components/Loading";
import { cn } from "@/utils/classnames";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  spinnerColor?: "primary" | "grey";
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-primary px-2 py-2 font-bold text-black ",
        props.className,
        props.disabled || props.loading
          ? "cursor-not-allowed opacity-50"
          : "hover:scale-[1.02]"
      )}
      onClick={() => {
        if (props.disabled || props.loading) return;
        props?.onClick?.();
      }}
    >
      {props.loading ? (
        <Loading spinnerColor={props.spinnerColor} size={14} />
      ) : (
        props.children
      )}
    </button>
  );
}
