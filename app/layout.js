"use client";

import Nav from "./components/Nav";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import "./i18n";
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [t, i18n] = useTranslation();
  return (
    <html dir={i18n.language == "ar" ? "rtl" : "ltr"} lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Nav />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
