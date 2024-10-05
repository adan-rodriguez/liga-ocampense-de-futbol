import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header/header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Liga Ocampense de Fútbol",
  description: "Todo sobre la Liga Ocampense de Fútbol.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
