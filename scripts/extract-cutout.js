const sharp = require("sharp");

const PURPLE = [154, 80, 224];
const YELLOW = [246, 175, 23];

function dist(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

async function run() {
  const src = "public/images/maryam-hero-v3.jpg";
  const { data, info } = await sharp(src)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const out = Buffer.alloc(width * height * 4);

  const INNER = 40; // fully opaque below this distance from both bg colors
  const OUTER = 85; // fully transparent above this distance

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const pixel = [r, g, b];

    const dP = dist(pixel, PURPLE);
    const dY = dist(pixel, YELLOW);
    const dBg = Math.min(dP, dY);

    let alpha;
    if (dBg <= INNER) alpha = 0;
    else if (dBg >= OUTER) alpha = 255;
    else alpha = Math.round(((dBg - INNER) / (OUTER - INNER)) * 255);

    const outIdx = i * 4;
    out[outIdx] = r;
    out[outIdx + 1] = g;
    out[outIdx + 2] = b;
    out[outIdx + 3] = alpha;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile("public/images/maryam-cutout.png");

  console.log("done", width, height);
}

run();
