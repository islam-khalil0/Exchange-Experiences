import Nav from "./components/Nav";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exchange experiences",
  description: "application for exchanging experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Nav />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
