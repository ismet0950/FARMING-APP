import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Container from "@/components/Container";
import { Toaster } from "sonner";
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} antialiased`}>
        <Container className="bg-red-200 min-h-screen">
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-right" richColors closeButton/>
        </Container>
      </body>
    </html>
  );
}