// Run against a locally served clone. Playwright is an optional test tool, not an app dependency.
const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    headless: true,
  });
  try {
    const page = await browser.newPage();
    page.on("dialog", (dialog) => dialog.dismiss());
    const url = process.env.TEST_URL || "http://127.0.0.1:8000";
    await page.goto(url);
    await page.waitForFunction(() => typeof window.addItem === "function");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForFunction(() => typeof window.addItem === "function");
    const name = '<img src=x onerror="window.__itemMarkupExecuted=true">';
    await page.locator(".form-input").fill(name);
    await page.locator("form").evaluate((form) => form.requestSubmit());
    await assertLiteralName(page, name);
    await page.reload();
    await assertLiteralName(page, name);
    await page.locator(".edit-btn").click();
    assert.equal(await page.locator(".form-input").inputValue(), name, "Editing preloads the existing name");
    assert.equal(await page.locator('button[type="submit"]').innerText(), "Update");
    await page.locator(".form-input").fill('LED <b>strip</b> "warm"');
    await page.locator("form").evaluate((form) => form.requestSubmit());
    await assertLiteralName(page, 'LED <b>strip</b> "warm"');
    await page.locator('.single-item input[type="checkbox"]').check();
    await page.reload();
    assert.equal(await page.locator('.single-item input[type="checkbox"]').isChecked(), true);
    await page.locator(".remove-btn").click();
    await page.waitForFunction(() => document.querySelectorAll(".single-item").length === 0);
    await page.reload();
    assert.equal(await page.locator(".single-item").count(), 0, "Deletion persists after reload");
    console.log("Literal item rendering, editing, completion and persistence checks passed.");
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });

async function assertLiteralName(page, name) {
  await page.waitForSelector(".single-item");
  assert.equal(await page.locator(".single-item p").textContent(), name, "Item names render as literal text");
  assert.equal(await page.locator(".single-item img, .single-item b").count(), 0, "Item names do not create markup");
  assert.equal(await page.evaluate(() => window.__itemMarkupExecuted === true), false, "Item markup cannot execute");
}
