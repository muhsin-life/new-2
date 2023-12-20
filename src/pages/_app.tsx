import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={cn(
          "relative h-full antialiased flex flex-col min-h-screen",
          poppins.className
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </QueryClientProvider>
  );
}
