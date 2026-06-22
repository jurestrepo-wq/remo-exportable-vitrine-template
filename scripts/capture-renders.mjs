import { chromium, devices } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const baseUrl = process.env.REMO_VITRINA_URL ?? "http://127.0.0.1:4177";
const out = path.join(root, "screenshots");

const targets = [
  {
    name: "listing-desktop",
    url: `${baseUrl}/index.html#/vitrina-exportable`,
    viewport: { width: 1440, height: 1200 }
  },
  {
    name: "section-suppliers-desktop",
    url: `${baseUrl}/index.html#/vitrina-exportable`,
    viewport: { width: 1440, height: 900 },
    selector: "#suppliers"
  },
  {
    name: "section-validation-desktop",
    url: `${baseUrl}/index.html#/vitrina-exportable`,
    viewport: { width: 1440, height: 900 },
    selector: "#validation"
  },
  {
    name: "section-how-it-works-desktop",
    url: `${baseUrl}/index.html#/vitrina-exportable`,
    viewport: { width: 1440, height: 900 },
    selector: "#how-it-works"
  },
  {
    name: "section-contact-desktop",
    url: `${baseUrl}/index.html#/vitrina-exportable`,
    viewport: { width: 1440, height: 900 },
    selector: "#contact"
  },
  {
    name: "detail-desktop",
    url: `${baseUrl}/index.html#/vitrina-exportable/pulpa-mango-congelada-natural`,
    viewport: { width: 1440, height: 1400 }
  },
  {
    name: "listing-mobile",
    url: `${baseUrl}/index.html#/vitrina-exportable`,
    viewport: { width: 390, height: 1600 },
    deviceScaleFactor: 1,
    isMobile: true
  },
  {
    name: "detail-mobile",
    url: `${baseUrl}/index.html#/vitrina-exportable/pulpa-mango-congelada-natural`,
    viewport: { width: 390, height: 1800 },
    deviceScaleFactor: 1,
    isMobile: true
  }
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});

for (const target of targets) {
  const context = await browser.newContext({
    ...devices["Desktop Chrome"],
    viewport: target.viewport,
    deviceScaleFactor: target.deviceScaleFactor ?? 1,
    isMobile: target.isMobile ?? false
  });
  const page = await context.newPage();
  await page.goto(target.url, { waitUntil: "networkidle" });
  if (target.selector) {
    await page.locator(target.selector).screenshot({ path: path.join(out, `${target.name}.png`) });
  } else {
    await page.screenshot({ path: path.join(out, `${target.name}.png`), fullPage: false });
  }
  await context.close();
}

const pdfContext = await browser.newContext({
  viewport: { width: 1440, height: 1800 },
  deviceScaleFactor: 1
});
const pdfPage = await pdfContext.newPage();
await pdfPage.goto(`${baseUrl}/index.html#/vitrina-exportable/pulpa-mango-congelada-natural`, { waitUntil: "networkidle" });
await pdfPage.pdf({
  path: path.join(root, "REMO_exportable_product_sheet_template.pdf"),
  format: "A4",
  printBackground: true,
  margin: { top: "12mm", right: "10mm", bottom: "12mm", left: "10mm" }
});
await pdfContext.close();

await browser.close();

console.log(`Rendered ${targets.length} screenshots and product-sheet PDF in ${root}`);
