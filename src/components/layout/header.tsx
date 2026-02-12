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
  { href: "/shop", label: "Cửa hàng" },
  { href: "/category/nen-hu-tron", label: "Nến thơm" },
  { href: "/category/phu-kien-qua-tang", label: "Quà tặng" },
  { href: "/about", label: "Câu chuyện" },
];

export function Header() {
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        {/* Left: logo (keeps same left padding as container) */}
        <div className="flex items-center flex-none">
          <Link href="/" className="flex items-center">
            <FlamoraLogo
              className="h-14 w-56 md:h-16 md:w-64"
              imageClassName="object-left"
            />
          </Link>
        </div>

        {/* Center: nav (hidden on small screens) */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-colors text-foreground/60 hover:text-[#BCA657] ${isActive(link.href) ? "text-[#BCA657]" : ""}`}
            >
              <span
                className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#BCA657] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out ${isActive(link.href) ? "after:scale-x-100" : ""} hover:after:scale-x-100`}
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
          <SheetContent side="left">
            <Link href="/" className="mb-6 block">
              <FlamoraLogo className="h-12 w-48" imageClassName="object-left" />
            </Link>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-lg font-medium transition-colors text-foreground/60 hover:text-[#BCA657] ${isActive(link.href) ? "text-[#BCA657]" : ""}`}
                >
                  <span
                    className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#BCA657] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out ${isActive(link.href) ? "after:scale-x-100" : ""} hover:after:scale-x-100`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <hr />
              {status === "authenticated" ? (
                <>
                  <Link href="/account" className="text-lg font-medium">
                    Tài khoản của tôi
                  </Link>
                  <Link href="/orders" className="text-lg font-medium">
                    Đơn hàng
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin" className="text-lg font-medium">
                      Quản trị
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="text-lg font-medium text-destructive text-left"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-lg font-medium">
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
              className="hidden md:inline-flex"
            >
              <Search className="h-6 w-6" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>

            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
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
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-6 w-6" />
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
