// src/components/PublicImage.tsx
import Image, { type ImageProps } from "next/image";
import assetPath from "@/lib/assetPath";

type Props = Omit<ImageProps, "src"> & { src: string };

export default function PublicImage({
  src,
  alt = "",
  unoptimized = true,
  ...props
}: Props) {
  return (
    <Image
      {...props}
      src={assetPath(src)}
      alt={alt ?? ""}
      unoptimized={unoptimized}
    />
  );
}
