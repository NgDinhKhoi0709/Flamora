import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { FlamoraLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartIcon } from '@/components/cart/cart-icon';

const navLinks = [
  { href: '/shop', label: 'Cửa hàng' },
  { href: '/category/nen-hu-tron', label: 'Nến thơm' },
  { href: '/category/phu-kien-qua-tang', label: 'Quà tặng' },
  { href: '/about', label: 'Câu chuyện' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <FlamoraLogo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mb-6">
              <FlamoraLogo />
            </Link>
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile Logo */}
            <div className="md:hidden flex justify-center">
              <Link href="/">
                <FlamoraLogo />
              </Link>
            </div>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Search className="h-6 w-6" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
}
