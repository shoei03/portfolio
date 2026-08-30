/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface MediaContainerProps {
  src: string;
  alt?: string;
  type?: "image" | "video";
  /** 画像/動画の下に表示する小さな説明文(任意) */
  caption?: string;
  className?: string;
}

export function MediaContainer({
  src,
  alt = "",
  type = "image",
  caption,
  className = "",
}: MediaContainerProps) {
  return (
    <figure className="not-prose breakout">
      <div
        className={cn(
          "ring-4 ring-muted w-full h-[300px] rounded-lg overflow-hidden flex items-center justify-center",
          className
        )}
      >
        {type === "image" ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-center max-w-full max-h-full"
          />
        ) : (
          <video
            src={src}
            className="w-full h-full object-cover object-center max-w-full max-h-full"
            controls
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

