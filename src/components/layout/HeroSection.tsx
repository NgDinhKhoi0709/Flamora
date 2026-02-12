"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection({ heroImage }: { heroImage: any }) {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: motionTokens.distance.md }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.duration.normal / 1000,
            ease: motionTokens.easing.soft,
            delay: 0.1,
          }}
          className="mb-3"
          style={{ willChange: "opacity, transform" }}
        >
          <span className="text-white font-headline text-lg md:text-2xl lg:text-3xl font-medium tracking-tight">
            Flamora
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: motionTokens.distance.md }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.duration.normal / 1000,
            ease: motionTokens.easing.soft,
            delay: 0.18,
          }}
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight"
          style={{ willChange: "opacity, transform" }}
        >
          A softer kind of light
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: motionTokens.distance.sm }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.duration.normal / 1000,
            ease: motionTokens.easing.soft,
            delay: 0.28,
          }}
          className="mt-4 max-w-xl text-lg md:text-xl text-gray-200"
          style={{ willChange: "opacity, transform" }}
        >
          Khám phá hương thơm tinh tế, thắp lên không gian sống ấm áp và dịu
          dàng.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: motionTokens.distance.xs }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.duration.normal / 1000,
            ease: motionTokens.easing.soft,
            delay: 0.38,
          }}
          style={{ willChange: "opacity, transform" }}
        >
          <Button asChild className="mt-8" size="lg">
            <Link href="/san-pham">
              Mua sắm ngay <ArrowRight />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
