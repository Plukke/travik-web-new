import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import { Inter } from "next/font/google";

import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import StoreProvider from "@/store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travik",
  description: "La mejor forma de viajar...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <StoreProvider lastUpdate={new Date().getTime()}>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
