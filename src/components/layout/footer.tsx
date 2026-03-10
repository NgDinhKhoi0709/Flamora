"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { FlamoraLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { usePathname } from "next/navigation";

const COLUMN_HEADING = "text-[11px] font-semibold tracking-widest uppercase text-primary font-body mb-4";
const NAV_LINK = "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200";

export function Footer() {
  const pathname = usePathname();
  const hideOnPaths = ["/login", "/register", "/forgot-password", "/403"];

  if (
    pathname &&
    hideOnPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return null;
  }

  return (
    <footer className="relative bg-secondary/60">
      {/* Gold gradient top border */}
      <div className="gradient-divider" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-16 lg:pb-10">
        <ScrollReveal direction="up" distance={24} duration={0.6}>

          {/*
           * ── Main 5-column grid ──────────────────────────────────────────
           * Desktop : 5 equal columns, all top-aligned in one row
           * Tablet  : 3 + 2 cols
           * Mobile  : 1 col (stacked)
           */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">

            {/* ── Col 1: Logo + Slogan ─────────────────────────────────── */}
            <div className="flex flex-col items-center text-center gap-2">
              <FlamoraLogo className="h-12 w-44" />
              <p className="text-xs text-muted-foreground font-body whitespace-nowrap">
                Just Hang It, Just Breathe Fresh.
              </p>
            </div>

            {/* ── Col 2: Thông tin liên hệ ─────────────────────────────── */}
            <div className="flex flex-col">
              <h3 className={COLUMN_HEADING}>Thông tin liên hệ</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                  <span className="leading-relaxed">
                    3/2 Street, Ninh Kieu District, Can Tho City
                  </span>
                </div>
                <a
                  href="mailto:flamora.atlier@gmail.com"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary/70 group-hover:text-primary transition-colors" />
                  <span>flamora.atlier@gmail.com</span>
                </a>
                <a
                  href="tel:0983868386"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary/70 group-hover:text-primary transition-colors" />
                  <span>0983 868 386</span>
                </a>

                {/* Social icons */}
                <div className="flex items-center gap-2 mt-1">
                  {[
                    { icon: Facebook, label: "Facebook" },
                    { icon: Instagram, label: "Instagram" },
                    { icon: Twitter, label: "Twitter" },
                  ].map(({ icon: Icon, label }) => (
                    <Link
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex items-center justify-center w-8 h-8 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Col 3: Về Flamora ─────────────────────────────────────── */}
            <div className="flex flex-col">
              <h3 className={COLUMN_HEADING}>Về Flamora</h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { href: "/about", label: "Giới thiệu" },
                  { href: "/san-pham", label: "Sản phẩm" },
                  { href: "#", label: "Hợp tác" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={NAV_LINK}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Hỗ trợ ────────────────────────────────────────── */}
            <div className="flex flex-col">
              <h3 className={COLUMN_HEADING}>Hỗ trợ</h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { href: "#", label: "FAQs" },
                  { href: "#", label: "Chính sách" },
                  { href: "#", label: "Liên hệ" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={NAV_LINK}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 5: Đăng ký nhận tin ───────────────────────────────── */}
            <div className="flex flex-col sm:col-span-2 md:col-span-1">
              <h3 className={COLUMN_HEADING}>Đăng ký nhận tin</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt từ Flamora.
              </p>
              <form
                className="flex flex-col gap-2.5"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="footer-email" className="sr-only">
                  Địa chỉ email
                </label>
                <Input
                  type="email"
                  id="footer-email"
                  name="email-address"
                  required
                  className="rounded-full px-4 h-9 text-sm bg-background/70 border-border/70 focus:border-primary/60"
                  placeholder="Nhập email của bạn"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-full h-9 text-sm px-6 font-body w-fit"
                >
                  Đăng ký
                </Button>
              </form>
            </div>

          </div>
          {/* ── End 5-column grid ─────────────────────────────────────────── */}

        </ScrollReveal>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-foreground/70 font-medium">Flamora Atelier Co., Ltd.</span>
            {" "}All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            <span className="gradient-text font-semibold">Flamora</span>
            {" "}— Just Hang It, Just Breathe Fresh.
          </p>
        </div>

      </div>
    </footer>
  );
}
