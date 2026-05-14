import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketDetail } from "@/components/market/MarketDetail";
import { getMarketBySlug, seedMarkets } from "@/data/markets";

interface MarketPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return seedMarkets.map((market) => ({ slug: market.slug }));
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 md:py-12">
      <Link href="/" className="mb-6 inline-flex text-sm font-bold text-cyan-200 underline underline-offset-4">
        ← Back to markets
      </Link>
      <MarketDetail market={market} />
    </main>
  );
}
