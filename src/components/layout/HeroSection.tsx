"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { motion as motionTokens } from "@/lib/motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function HeroSection({ heroImage }: { heroImage: any }) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.7]);

  return (
    <section ref={ref} className="relative w-full h-[70vh] md:h-[90vh] text-white overflow-hidden">
      {/* Parallax background image */}
      {heroImage && (
        <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover scale-110"
            data-ai-hint={heroImage.imageHint}
          />
        </motion.div>
      )}

      {/* Gradient overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"
      />

      {/* Floating ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-200/30 animate-float" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-amber-100/20 animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-200/25 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-amber-100/15 animate-float-slow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 right-1/2 w-2 h-2 rounded-full bg-amber-200/20 animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: motionTokens.easing.entrance,
            delay: 0.1,
          }}
          className="mb-4"
          style={{ willChange: "opacity, transform" }}
        >
          <span className="inline-block text-amber-200 font-headline text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase">
            Flamora Atelier
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: motionTokens.easing.entrance,
            delay: 0.25,
          }}
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-white"
          style={{
            willChange: "opacity, transform",
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
          }}
        >
          A softer kind
          <br />
          <span className="italic">of light</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: motionTokens.easing.entrance,
            delay: 0.45,
          }}
          className="mt-6 max-w-lg text-base md:text-lg text-white font-light leading-relaxed"
          style={{ willChange: "opacity, transform" }}
        >
          Khám phá hương thơm tinh tế, thắp lên không gian sống ấm áp và dịu dàng.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: motionTokens.easing.entrance,
            delay: 0.6,
          }}
          style={{ willChange: "opacity, transform" }}
        >
          <Button
            asChild
            className="mt-10 px-8 py-3 text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 rounded-full"
            size="lg"
          >
            <Link href="/san-pham" className="flex items-center gap-2">
              Khám phá ngay <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white text-xs tracking-widest uppercase">Cuộn xuống</span>
        <ChevronDown className="w-5 h-5 text-white animate-scroll-indicator" />
      </motion.div>
    </section>
  );
}
