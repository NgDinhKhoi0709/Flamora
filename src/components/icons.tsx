import Image from "next/image";
import { cn } from "@/lib/utils";

export const FlamoraLogo = ({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) => (
  <div className={cn("relative inline-block h-12 w-44", className)}>
    <Image
      src="/logo.png"
      alt="Flamora Logo"
      fill
      className={cn("object-contain", imageClassName)}
      priority
    />
  </div>
);
