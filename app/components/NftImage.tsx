import useIpfsImage from "@hooks/useIpfsImage";
import { cn, tw } from "@/utils/classnames";
import Image from "next/image";

export default function NftImage({
  image,
  size = 34,
  loading,
  className,
  onError,
}: {
  image?: string | null;
  size?: number;
  loading?: boolean;
  className?: string;
  onError?: (e: any) => void;
}) {
  console.log("image", image);
  const { url, handleFallback } = useIpfsImage(image);
  console.log("url", url);

  const baseClass = tw(
    "relative aspect-square overflow-hidden rounded border-[1px] border-buttonBorder bg-darkGrey object-cover"
  );
  if (loading || !url)
    return (
      <div
        className={cn(baseClass, className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div className="h-full w-full rounded" />
      </div>
    );

  return (
    <div
      className={cn(baseClass, className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img
        className="max-h-full max-w-full object-contain"
        src={url}
        alt="nft-image"
        // unoptimized={image?.includes?.(".gif")}
        onError={handleFallback}
        // fill
      />
    </div>
  );
}
