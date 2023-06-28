import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
   title: "Staycation App",
   description: "Staycation with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={font.className}>
            <ClientOnly>
               <ToasterProvider />
               <RegisterModal />
               <Navbar />
            </ClientOnly>
            {children}
         </body>
      </html>
   );
}
