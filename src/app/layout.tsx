import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "폴리마켓 메커니즘 실험실",
  description: "초보자가 예측시장 원리를 안전하게 배우는 시뮬레이션 전용 클론코딩 실습입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
