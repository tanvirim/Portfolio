import { chromium } from "playwright";

const shot = (n) => `C:\\Users\\User\\AppData\\Local\\Temp\\claude\\d--projects-Portfolio\\0831c4c7-2c4e-400b-90ce-44de4ccb08d0\\scratchpad\\${n}.png`;

const browser = await chromium.launch();
const errors = [];

async function run(colorScheme, prefix) {
  const context = await browser.newContext({ colorScheme, viewport: { width: 1280, height: 1400 } });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${prefix}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${prefix}] pageerror: ${err.message}`));

  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page.locator("text=CONTACT").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: shot(`${prefix}_contact_section`), fullPage: false });

  const trigger = page.locator('button[aria-label="Contact options"]').last();
  await trigger.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: shot(`${prefix}_popover_open`) });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  const editor = page.locator(".ProseMirror");
  await editor.click();
  await editor.type("Hello, this is a test message.");
  await page.locator('button[aria-label="Bold"]').click();
  await page.screenshot({ path: shot(`${prefix}_editor_typed`) });

  await context.close();
}

await run("light", "light");
await run("dark", "dark");

await browser.close();

console.log("ERRORS:", JSON.stringify(errors, null, 2));
