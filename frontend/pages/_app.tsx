import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // Add theme script to prevent flash of incorrect theme
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'system';
    const root = window.document.documentElement;

    if (theme === 'system') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemPreference);
    } else {
      root.classList.add(theme);
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
