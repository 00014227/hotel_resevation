"use client"

import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer.jsx";
import ReduxProvider from "./store.provider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import GetInitialState from "./GetInitialState";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <GetInitialState>
            <Navbar />
            {children}
            <ToastContainer />
            <Footer />
          </GetInitialState>
        </body>
      </ReduxProvider>
    </html>
  );
}
