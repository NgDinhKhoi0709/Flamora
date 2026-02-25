"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FlamoraLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export function Footer() {
  return (
    <footer className="relative bg-secondary/50 overflow-hidden">
      {/* Gradient top border */}
      <div className="gradient-divider" />

      <div className="container mx-auto py-14 px-4 sm:px-6 lg:py-20 lg:px-8">
        <ScrollReveal direction="up" distance={30} duration={0.6}>
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="gap-y-2 xl:col-span-1 flex flex-col items-center text-center">
              <FlamoraLogo className="h-14 w-56" />
              <p className="text-muted-foreground text-base mt-0 mb-6">
                A softer kind of light.
              </p>
              <div className="flex space-x-5 mt-2">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                ].map(({ icon: Icon, label }) => (
                  <Link
                    key={label}
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                    Về Flamora
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      { href: "/about", label: "Giới thiệu" },
                      { href: "/san-pham", label: "Sản phẩm" },
                      { href: "#", label: "Hợp tác" },
                    ].map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-base text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                    Hỗ trợ
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      { href: "#", label: "FAQs" },
                      { href: "#", label: "Chính sách" },
                      { href: "#", label: "Liên hệ" },
                    ].map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-base text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                    Đăng ký nhận tin
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground">
                    Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt.
                  </p>
                  <form className="mt-4 sm:flex sm:max-w-md">
                    <label htmlFor="footer-email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      type="email"
                      name="email-address"
                      id="footer-email"
                      required
                      className="w-full rounded-full px-4"
                      placeholder="Nhập email của bạn"
                    />
                    <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <Button type="submit" className="rounded-full">
                        Đăng ký
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <div className="mt-12 border-t border-border/50 pt-8">
          <p className="text-sm text-muted-foreground xl:text-center">
            &copy; 2024 Flamora Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
