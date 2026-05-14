import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Polymarket Mechanics Lab",
  description:
    "A beginner-friendly, simulation-only clone-coding lab for prediction-market mechanics.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
