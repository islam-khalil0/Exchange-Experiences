import Nav from "./components/Nav";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import "./i18n";
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exchange experiences",
  description: "application for exchanging experiences",
};

export default function RootLayout({ children }) {
  const [t, i18n] = useTranslation();
  return (
    <html dir={i18n.language == "ar" ? "rtl" : "ltr"} lang="en">
      {/* <Head>
        <title>Exchange Experiences</title>
        <meta name="keyWords" content="Exchange Experiences App"></meta>
      </Head> */}
      <body className={inter.className}>
        <AuthContextProvider>
          <Nav />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
