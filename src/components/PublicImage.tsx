// src/components/PublicImage.tsx
import Image, { type ImageProps } from "next/image";
import assetPath from "@/lib/assetPath";
import { toImageVariant, type ImageVariant } from "@/lib/imageVariant";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  variant?: ImageVariant;
};

export default function PublicImage({
  src,
  alt = "",
  unoptimized = true,
  variant,
  ...props
}: Props) {
  const resolvedSrc = variant ? toImageVariant(src, variant) : src;

  return (
    <Image
      {...props}
      src={assetPath(resolvedSrc)}
      alt={alt ?? ""}
      unoptimized={unoptimized}
    />
  );
}
