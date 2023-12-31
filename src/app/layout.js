// Module
import { ChakraProvider } from "@chakra-ui/react";
import { DataContextProvider } from "@/context/dataReducer";
// Components
import Sidebar from "@/components/sidebar";
import Providers from "@/config/providers";

import "./style.css";

export const metadata = {
  title: "Dashbaord ",
  description: "Take Home Test Delman.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DataContextProvider>
            <ChakraProvider>
              <Sidebar>{children}</Sidebar>
            </ChakraProvider>
          </DataContextProvider>
        </Providers>
      </body>
    </html>
  );
}
