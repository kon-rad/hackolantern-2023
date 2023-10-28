import { Source_Sans_3 } from "next/font/google";
import { cookies, headers } from "next/headers";
import Script from "next/script";

import { AppProvider } from "@/lib/context/AppProvider";

import { App } from "./App";
import "./globals.css";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "twilight zone",
  description: "twilight zone - talk to yourself form the future",
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  return (
    <html lang="en">
      <body
        className={`bg-white text-black min-h-screen flex flex-col dark:bg-black dark:text-white w-full ${sourceSans3.className}`}
      >
        <AppProvider>
          <App>
            <div className="flex-1">{children}</div>
          </App>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
