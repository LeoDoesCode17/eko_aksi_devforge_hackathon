import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  // variable: "--font-nunito",
});

export const metadata = {
  title: "EkoAksi - Gerakan Peduli Lingkungan",
  description: "Tukarkan sampahmu dan jadilah bagian dari perubahan untuk bumi yang lebih baik.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
