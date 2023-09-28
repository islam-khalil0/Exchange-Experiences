import Nav from "./components/Nav";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Exchange experiences",
//   description: "application for exchanging experiences",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Exchange Experiences</title>
        <meta name="keyWords" content="Exchange Experiences App"></meta>
      </Head>
      <body className={inter.className}>
        <AuthContextProvider>
          <Nav />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
