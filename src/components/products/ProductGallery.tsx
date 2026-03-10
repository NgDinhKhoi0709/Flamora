"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/motion";
import * as React from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const handleScentChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ scentName: string }>;
      const scentName = customEvent.detail?.scentName;
      if (!scentName) return;

      // Extract the english name from "Lavender Dream — Oải Hương" -> "lavender_dream"
      const scentKey = scentName.split('—')[0].trim().toLowerCase().replace(/\s+/g, '_');
      
      // Find matching image (e.g. "lavender_dream.png")
      const index = images.findIndex(img => img.toLowerCase().includes(scentKey));
      if (index >= 0) {
        setActive(index);
      }
    };

    window.addEventListener('scentChanged', handleScentChange);
    return () => window.removeEventListener('scentChanged', handleScentChange);
  }, [images]);

  return (
    <>
      <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
        {images.map((img, i) => (
          <motion.div
            key={img}
            initial={{ opacity: 0, x: i > active ? 40 : -40 }}
            animate={{ opacity: i === active ? 1 : 0, x: 0 }}
            transition={{
              duration: 0.5,
              ease: motionTokens.easing.soft as any,
            }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: i === active ? "auto" : "none",
              zIndex: i === active ? 2 : 1,
              willChange: "opacity, transform",
            }}
          >
            <Image
              src={img}
              alt={name}
              fill
              priority={i === 0}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 mt-2">
        {images.map((img, index) => (
          <button
            key={img}
            className={`aspect-square relative rounded-md overflow-hidden border-2 transition-colors duration-200 ${index === active ? "border-primary" : "border-transparent"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2`}
            onClick={() => setActive(index)}
            aria-label={`Xem ảnh ${index + 1}`}
            tabIndex={0}
            style={{ willChange: "border-color" }}
          >
            <Image
              src={img}
              alt={`${name} - ảnh ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
}
