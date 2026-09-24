import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <CustomCursor />
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
