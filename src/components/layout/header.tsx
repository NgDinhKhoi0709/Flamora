"use client";

import Link from "next/link";
import {
  Menu,
  Search,
  User,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { FlamoraLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartIcon } from "@/components/cart/cart-icon";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/sale", label: "Sale" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Giới thiệu" },
];

export function Header() {
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-soft border-b border-border/50"
          : "bg-background/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        {/* Left: logo */}
        <div className="flex items-center flex-none">
          <Link href="/" className="flex items-center group">
            <FlamoraLogo
              className="h-14 w-14 md:h-16 md:w-16 transition-transform duration-300 group-hover:scale-105"
              imageClassName="object-left"
            />
          </Link>
        </div>

        {/* Center: nav (hidden on small screens) */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-10 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors duration-300 hover:text-primary ${
                isActive(link.href) ? "text-primary" : "text-foreground/60"
              }`}
            >
              <span
                className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:origin-left after:scale-x-0 after:transition-transform after:duration-400 after:ease-out ${
                  isActive(link.href) ? "after:scale-x-100" : ""
                } hover:after:scale-x-100 after:w-full`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <Link href="/" className="mb-8 block">
              <FlamoraLogo className="h-12 w-48" imageClassName="object-left" />
            </Link>
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium transition-colors duration-300 hover:text-primary hover:translate-x-1 transform ${
                    isActive(link.href) ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border/50" />
              {status === "authenticated" ? (
                <>
                  <Link href="/account" className="text-lg font-medium hover:text-primary transition-colors">
                    Tài khoản của tôi
                  </Link>
                  <Link href="/orders" className="text-lg font-medium hover:text-primary transition-colors">
                    Đơn hàng
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin" className="text-lg font-medium hover:text-primary transition-colors">
                      Quản trị
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="text-lg font-medium text-destructive text-left hover:opacity-80 transition-opacity"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-lg font-medium hover:text-primary transition-colors">
                  Đăng nhập
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center flex-none">
          <nav className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex hover:bg-primary/10 transition-colors duration-300"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>

            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-300">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Tài khoản</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Tài khoản</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>Đơn hàng</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Quản trị</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : status === "unauthenticated" ? (
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 transition-colors duration-300">
                <Link href="/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Đăng nhập</span>
                </Link>
              </Button>
            ) : (
              <div className="h-10 w-10 animate-pulse bg-muted rounded-full" />
            )}

            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
}
