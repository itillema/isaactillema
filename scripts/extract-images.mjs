// One-shot helper: pulls base64-encoded PNGs out of the Google-Docs markdown
// export at public/posts/geography-of-generosity/The Economic Geography of Generosity.md
// and writes them as real .png files alongside, using content-based names.
//
// Run from the repo root:  node scripts/extract-images.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const POST_DIR = join(ROOT, "public", "posts", "geography-of-generosity");
const MD_PATH = join(POST_DIR, "The Economic Geography of Generosity.md");

// imageN slug → output filename (matches what geography-of-generosity.mdx references)
const MAPPING = {
  image1: "histogram-raw-tip-pct.png",     // Figure 1.1
  image2: "histogram-log-tip-pct.png",     // Figure 1.2
  image3: "scatter-tip-vs-income.png",     // Figure 2.1
  image4: "bar-trips-by-day.png",          // Figure 3.1
  image5: "boxplot-tip-by-day.png",        // Figure 3.2
  image6: "heatmap-tip-vs-fare.png",       // Figure 3.3
  image7: "scatter-fare-vs-duration.png",  // Figure 3.4
  image8: "residuals-vs-fitted.png",       // Figure 4.1
  image9: "qq-plot.png",                   // Figure 4.2
  image10: "geography-bar-chart.png",      // Geography of Generosity bar chart
  image11: "dataframes-screenshot.png",    // Figure B.4
};

const md = readFileSync(MD_PATH, "utf8");

// Match lines like: [image1]: <data:image/png;base64,iVBOR...>
const lineRe = /^\[(image\d+)\]:\s*<data:image\/png;base64,([^>]+)>\s*$/gm;

let count = 0;
let match;
while ((match = lineRe.exec(md)) !== null) {
  const [, key, b64] = match;
  const outName = MAPPING[key];
  if (!outName) {
    console.warn(`No mapping for ${key} — skipping`);
    continue;
  }
  const buf = Buffer.from(b64, "base64");
  writeFileSync(join(POST_DIR, outName), buf);
  console.log(`wrote ${outName} (${buf.length.toLocaleString()} bytes)`);
  count++;
}

console.log(`\nDone — ${count} images extracted to ${POST_DIR}`);
