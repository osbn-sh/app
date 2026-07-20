import localFont from "next/font/local";
import "./globals.css";
import { DirectionProvider } from "@base-ui/react";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { SideBarLayout } from "@/components/layouts/sideBar/main";
import { TooltipProvider } from "@/components/ui/tooltip";




const arad = localFont({
  src: "../public/font/AradVF.woff2",
  variable: "--font-arad",
  display: "swap",

});

export const metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "اٌستادبان",
    template: "%s | اٌستادبان",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {








  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${arad.className} antialiased relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >


          <DirectionProvider direction="rtl">
            <Toaster position="bottom-right" style={{ fontFamily: 'aradVF' }} />
            <SideBarLayout>
              <TooltipProvider>{children}</TooltipProvider>
            </SideBarLayout>
          </DirectionProvider>

        </ThemeProvider>


      </body>
    </html>
  );
}
