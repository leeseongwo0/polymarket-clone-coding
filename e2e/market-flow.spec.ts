import { expect, test } from "@playwright/test";

async function clearStorage(page: { evaluate: (fn: () => void) => Promise<void> }) {
  await page.evaluate(() => window.localStorage.clear());
}

test("learner discovers markets and completes a YES trade with history", async ({ page }) => {
  await page.goto("/");
  await clearStorage(page);
  await page.reload();

  await expect(page.getByRole("heading", { name: /Learn prediction-market mechanics/i })).toBeVisible();
  await page.getByRole("link", { name: /AI assistants become a default coding tool/i }).click();

  const probability = page.getByTestId("yes-probability");
  await expect(probability).toBeVisible();
  const before = await probability.textContent();

  await page.getByLabel("Stake amount").fill("50");
  await page.getByRole("button", { name: "Buy YES" }).click();
  await expect(page.getByRole("status")).toContainText(/YES trade used/i);
  await expect(probability).not.toHaveText(before ?? "");
  await expect(page.getByTestId("portfolio-balance")).toContainText("950");
  await expect(page.getByTestId("trade-history")).toContainText(/YES with 50 play credits/i);
});

test("learner can place a NO trade and move probability in the opposite direction", async ({ page }) => {
  await page.goto("/markets/nextjs-beginner-deploy");
  await clearStorage(page);
  await page.reload();

  const probability = page.getByTestId("yes-probability");
  const before = Number((await probability.textContent())?.replace("%", ""));

  await page.getByLabel("Stake amount").fill("100");
  await page.getByRole("button", { name: "Buy NO" }).click();
  await expect(page.getByRole("status")).toContainText(/NO trade used/i);

  const after = Number((await probability.textContent())?.replace("%", ""));
  expect(after).toBeLessThan(before);
  await expect(page.getByTestId("trade-history")).toContainText(/NO with 100 play credits/i);
});

test("simulated settlement and mock wallet stay safe and non-blocking", async ({ page }) => {
  await page.goto("/markets/ai-assistant-weekly-coding");
  await clearStorage(page);
  await page.reload();

  await page.getByLabel("Stake amount").fill("25");
  await page.getByRole("button", { name: "Buy YES" }).click();
  await page.getByRole("button", { name: "Resolve demo as YES" }).click();
  await expect(page.getByTestId("settlement-result")).toContainText(/Resolved outcome: YES/i);
  await expect(page.getByRole("status")).toContainText(/play-credit behavior only/i);

  await expect(page.getByLabel("Mock wallet experiment")).toContainText(/never connects to mainnet/i);
  await page.getByRole("button", { name: "Connect mock wallet" }).click();
  await expect(page.getByTestId("mock-wallet-status")).toContainText(/0xDEMO/i);
});

test("invalid stake is rejected without corrupting the balance", async ({ page }) => {
  await page.goto("/markets/nextjs-beginner-deploy");
  await clearStorage(page);
  await page.reload();

  await page.getByLabel("Stake amount").fill("1001");
  await page.getByRole("button", { name: "Buy NO" }).click();

  await expect(page.getByRole("status")).toContainText(/cannot exceed/i);
  await expect(page.getByTestId("portfolio-balance")).toContainText("1,000");
});

test("safety copy states educational use and no affiliation", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/not affiliated with Polymarket/i)).toBeVisible();
  await expect(page.getByText(/does not use Polymarket logos/i)).toBeVisible();
  await expect(page.getByText(/No mainnet or real trading/i)).toBeVisible();
});
