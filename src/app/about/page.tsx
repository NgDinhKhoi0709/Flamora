"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/layout/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Shield, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import * as React from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-headline text-4xl lg:text-5xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const values = [
  {
    icon: Leaf,
    title: "Tự nhiên",
    description: "100% nguyên liệu tự nhiên, thân thiện với môi trường và an toàn cho sức khỏe.",
  },
  {
    icon: Heart,
    title: "Tận tâm",
    description: "Mỗi sản phẩm được đổ bằng tay với sự chăm chút tối đa từ đội ngũ nghệ nhân.",
  },
  {
    icon: Shield,
    title: "An toàn",
    description: "Tinh dầu đạt chứng nhận an toàn, bấc cotton không chì, không phthalates.",
  },
  {
    icon: Sparkles,
    title: "Độc đáo",
    description: "Mùi hương được sáng tạo riêng, kể câu chuyện của vùng đất và ký ức.",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Sản phẩm" },
  { value: 10000, suffix: "+", label: "Khách hàng" },
  { value: 50, suffix: "+", label: "Mùi hương" },
  { value: 3, suffix: "", label: "Năm kinh nghiệm" },
];

export default function AboutPage() {
  const aboutImage1 = PlaceHolderImages.find((img) => img.id === "story-image");
  const aboutImage2 = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/30" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal direction="up" distance={30}>
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Về chúng tôi
            </span>
            <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-7xl mt-3">
              Câu chuyện của{" "}
              <span className="italic text-primary">Flamora</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              A softer kind of light. Chúng tôi tin rằng ánh sáng không chỉ để soi rọi,
              mà còn để sưởi ấm tâm hồn.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section 1 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left" distance={50} duration={0.7}>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                Hành trình
              </span>
              <h2 className="font-headline text-3xl lg:text-4xl text-foreground mt-3 leading-tight">
                Bắt đầu từ <span className="italic">Đam mê</span>
              </h2>
              <p className="leading-relaxed mt-4">
                Flamora ra đời từ tình yêu với những mùi hương tinh tế và niềm tin vào
                sức mạnh chữa lành của ánh sáng dịu dàng. Chúng tôi muốn tạo ra không chỉ
                là những ngọn nến, mà là những trải nghiệm, những khoảnh khắc bình yên
                và thư thái trong cuộc sống hối hả.
              </p>
              <p className="leading-relaxed">
                Hành trình của chúng tôi bắt đầu trong một gian bếp nhỏ, với những mẻ sáp
                đầu tiên được đun chảy và pha trộn thủ công. Mỗi mùi hương là một câu chuyện,
                một ký ức được chúng tôi gói ghém cẩn thận.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" distance={50} duration={0.7} delay={0.15}>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-soft-lg group">
              {aboutImage1 && (
                <Image
                  src={aboutImage1.imageUrl}
                  alt={aboutImage1.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={aboutImage1.imageHint}
                />
              )}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 lg:py-20 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center" staggerDelay={0.15}>
            {stats.map((stat, i) => (
              <StaggerItem key={i} direction="zoom">
                <div className="flex flex-col items-center gap-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <span className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story Section 2 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left" distance={50} duration={0.7} delay={0.15} className="md:order-2">
            <div className="prose prose-lg max-w-none text-foreground/80">
              <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                Chất lượng
              </span>
              <h2 className="font-headline text-3xl lg:text-4xl text-foreground mt-3 leading-tight">
                Cam kết về <span className="italic">Chất lượng</span>
              </h2>
              <p className="leading-relaxed mt-4">
                Chất lượng là ưu tiên hàng đầu tại Flamora. Chúng tôi tỉ mỉ lựa chọn những
                nguyên liệu bền vững và thân thiện với môi trường. Sáp nến của chúng tôi là
                hỗn hợp sáp cọ và sáp đậu nành tự nhiên, đảm bảo cháy sạch và an toàn.
              </p>
              <p className="leading-relaxed">
                Bấc nến được làm từ sợi cotton không chì, và các loại tinh dầu hương liệu
                chúng tôi sử dụng đều đạt chứng nhận an toàn, không chứa phthalates. Mỗi sản
                phẩm đều được đổ bằng tay với sự chăm chút tối đa tại xưởng với tiêu chuẩn
                nghiêm ngặt.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" distance={50} duration={0.7} className="md:order-1">
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-soft-lg group">
              {aboutImage2 && (
                <Image
                  src={aboutImage2.imageUrl}
                  alt={aboutImage2.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={aboutImage2.imageHint}
                />
              )}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal direction="up" distance={30} className="text-center mb-14">
            <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
              Giá trị cốt lõi
            </span>
            <h2 className="font-headline text-3xl lg:text-4xl mt-3">
              Điều chúng tôi <span className="italic">tin tưởng</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {values.map((value, i) => (
              <StaggerItem key={i} direction="zoom">
                <Card className="group h-full border-0 bg-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-headline text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
