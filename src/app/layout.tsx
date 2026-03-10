import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AppProviders } from "@/context/app-providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Flamora Atelier - Just Hang It, Just Breathe Fresh",
  description:
    "Khám phá thế giới sáp thơm tinh tế từ Flamora. Chỉ cần treo lên hoặc đặt đúng chỗ, hương thơm sẽ lan tỏa dịu nhẹ, giúp không gian sống của bạn luôn dễ chịu và thư thái.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;700&family=Playfair+Display:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col")}>
        <AppProviders>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
