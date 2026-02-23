import { Inter, Knewave } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const knewave = Knewave({
  variable: "--font-knewave",
  subsets: ["latin"],
  weight: ["400"]
});


export const metadata = {
  title: "PrimeLet",
  description: "Electronics & Acessories Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${knewave.variable} antialiased`}
        ><Provider>
        {children}
      </Provider>
      </body>
    </html>
  );
}
