import { expect, test } from "@playwright/test";

async function clearStorage(page: { evaluate: (fn: () => void) => Promise<void> }) {
  await page.evaluate(() => window.localStorage.clear());
}

test("학습자가 마켓을 찾고 YES 거래 기록을 남긴다", async ({ page }) => {
  await page.goto("/");
  await clearStorage(page);
  await page.reload();

  await expect(page.getByRole("heading", { name: /예측시장 원리를 배웁니다/i })).toBeVisible();
  await page.getByRole("link", { name: /AI 어시스턴트가 초보 개발자의 기본 코딩 도구/i }).click();

  const probability = page.getByTestId("yes-probability");
  await expect(probability).toBeVisible();
  const before = await probability.textContent();

  await page.getByLabel("지분 금액").fill("50");
  await page.getByRole("button", { name: "YES 사기" }).click();
  await expect(page.getByRole("status")).toContainText(/YES 거래/i);
  await expect(probability).not.toHaveText(before ?? "");
  await expect(page.getByTestId("portfolio-balance")).toContainText("950");
  await expect(page.getByTestId("trade-history")).toContainText(/50 플레이 크레딧/i);
});

test("학습자가 NO 거래로 확률을 반대 방향으로 움직일 수 있다", async ({ page }) => {
  await page.goto("/markets/nextjs-beginner-deploy");
  await clearStorage(page);
  await page.reload();

  const probability = page.getByTestId("yes-probability");
  const before = Number((await probability.textContent())?.replace("%", ""));

  await page.getByLabel("지분 금액").fill("100");
  await page.getByRole("button", { name: "NO 사기" }).click();
  await expect(page.getByRole("status")).toContainText(/NO 거래/i);

  const after = Number((await probability.textContent())?.replace("%", ""));
  expect(after).toBeLessThan(before);
  await expect(page.getByTestId("trade-history")).toContainText(/100 플레이 크레딧/i);
});

test("모의 정산과 목업 지갑은 안전하고 핵심 흐름을 막지 않는다", async ({ page }) => {
  await page.goto("/markets/ai-assistant-weekly-coding");
  await clearStorage(page);
  await page.reload();

  await page.getByLabel("지분 금액").fill("25");
  await page.getByRole("button", { name: "YES 사기" }).click();
  await page.getByRole("button", { name: "데모를 YES로 정산하기" }).click();
  await expect(page.getByTestId("settlement-result")).toContainText(/확정 결과: YES/i);
  await expect(page.getByRole("status")).toContainText(/플레이 크레딧 전용/i);

  await expect(page.getByLabel("목업 지갑 실험")).toContainText(/메인넷에 연결하지 않습니다/i);
  await page.getByRole("button", { name: "목업 지갑 연결" }).click();
  await expect(page.getByTestId("mock-wallet-status")).toContainText(/0xDEMO/i);
});

test("잘못된 지분은 잔액을 망가뜨리지 않고 거부된다", async ({ page }) => {
  await page.goto("/markets/nextjs-beginner-deploy");
  await clearStorage(page);
  await page.reload();

  await page.getByLabel("지분 금액").fill("1001");
  await page.getByRole("button", { name: "NO 사기" }).click();

  await expect(page.getByRole("status")).toContainText(/초과할 수 없습니다/i);
  await expect(page.getByTestId("portfolio-balance")).toContainText("1,000");
});

test("안전 문구가 교육용 사용과 무제휴를 명시한다", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/Polymarket과 공식 제휴가 없으며/i)).toBeVisible();
  await expect(page.getByText(/Polymarket 로고, 브랜드 자산/i)).toBeVisible();
  await expect(page.getByText(/메인넷·실거래 없음/i)).toBeVisible();
});
