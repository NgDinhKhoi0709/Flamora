import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FlamoraLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <FlamoraLogo />
            <p className="text-muted-foreground text-base">
              A softer kind of light.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Về Flamora</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/about" className="text-base text-muted-foreground hover:text-foreground">Câu chuyện</Link></li>
                  <li><Link href="/shop" className="text-base text-muted-foreground hover:text-foreground">Sản phẩm</Link></li>
                  <li><Link href="#" className="text-base text-muted-foreground hover:text-foreground">Hợp tác</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Hỗ trợ</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#" className="text-base text-muted-foreground hover:text-foreground">FAQs</Link></li>
                  <li><Link href="#" className="text-base text-muted-foreground hover:text-foreground">Chính sách</Link></li>
                  <li><Link href="#" className="text-base text-muted-foreground hover:text-foreground">Liên hệ</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:gap-8">
               <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Đăng ký nhận tin</h3>
                 <p className="mt-4 text-base text-muted-foreground">
                  Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt.
                </p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <Input type="email" name="email-address" id="email-address" required className="w-full" placeholder="Nhập email của bạn" />
                  <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <Button type="submit">Đăng ký</Button>
                  </div>
                </form>
               </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-base text-muted-foreground xl:text-center">&copy; 2024 Flamora Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
