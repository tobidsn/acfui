import { Providers } from "@/components/providers";
import { ReactScan } from "@/components/react-scan";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type * as React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "acfui",
    "acfui.com",
    "acfui.com",
    "advanced custom fields",
    "acf",
    "acf ui",
    "acf ui library",
    "acf ui components",
    "acf ui components library",
    "acf ui components library",
    "react",
    "ui",
    "ui-library",
    "shadcn-ui",
    "accessibility",
    "wai-aria",
  ],
  authors: [
    {
      name: "tobidsn",
      url: "https://github.com/tobidsn",
    },
  ],
  creator: "tobidsn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image.png",
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image.png",
        alt: siteConfig.name,
      },
    ],
    creator: "@tobidsn",
  },
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "isolate min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <TailwindIndicator />
        <Toaster />
        <ReactScan />
        <Providers
          theme={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
        >
          {children}
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(e,t,o,c,a,n,i,s){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)};
              n=t.createElement(o);s=t.getElementsByTagName(o)[0];n.async=1;n.src=c;s.parentNode.insertBefore(n,s);
              }(window,document,'script','https://static.clicky.com/js','clicky');
              clicky('init', 101462264);
            `,
          }}
        />
        <div
          id="clicky"
          role="button"
          tabIndex={0}
          style={{ position: "absolute", top: 0, left: 0, visibility: "hidden" }}
          data-site-id="acfui.com"
        />
      </body>
    </html>
  );
}
