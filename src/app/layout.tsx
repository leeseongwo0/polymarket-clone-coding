import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Markets Lab",
  description: "A play-credit market board for learning how chance, positions, and resolution move.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
