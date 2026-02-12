import Image from "next/image";
import { cn } from "@/lib/utils";

export const FlamoraLogo = ({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) => (
  <div
    className={cn("relative inline-block h-14 w-56 md:h-16 md:w-64", className)}
  >
    <Image
      src="/logo.png"
      alt="Flamora Logo"
      fill
      className={cn("object-contain w-full h-full", imageClassName)}
      priority
    />
  </div>
);
