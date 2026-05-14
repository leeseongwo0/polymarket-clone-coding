import { describe, expect, it } from "vitest";
import { formatCredits, formatProbability, formatShortDate } from "@/lib/format";

describe("format helpers", () => {
  it("formats probability as a rounded percentage", () => {
    expect(formatProbability(62.4)).toBe("62%");
    expect(formatProbability(62.6)).toBe("63%");
  });

  it("formats play credits without currency symbols or USD language", () => {
    const formatted = formatCredits(1234.5);

    expect(formatted).toBe("1,234.5 play credits");
    expect(formatted).not.toContain("$");
    expect(formatted.toLowerCase()).not.toContain("usd");
  });

  it("formats dates for beginner-readable market cards", () => {
    expect(formatShortDate("2026-06-30")).toContain("2026");
  });
});
