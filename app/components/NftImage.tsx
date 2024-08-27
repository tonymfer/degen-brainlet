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
  const { url, handleFallback } = useIpfsImage(image);

  const baseClass = tw(
    "relative aspect-square overflow-hidden rounded border-[1px] border-buttonBorder bg-darkGrey object-cover"
  );
  if (loading || !url)
    return (
      <div className={cn(baseClass, className)}>
        <div className="h-full w-full rounded" />
      </div>
    );

  return (
    <div className={cn(baseClass, className)}>
      <Image
        className="max-h-full sm:w-[400px] sm:h-[400px] w-full h-full max-w-full object-contain"
        src={url}
        alt="nft-image"
        width={400}
        height={400}
        // unoptimized={image?.includes?.(".gif")}
        onError={handleFallback}
        // fill
      />
    </div>
  );
}
