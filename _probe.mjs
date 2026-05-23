import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const logs = [];
page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (err) => logs.push(`[pageerror] ${err.message}`));

await page.goto('http://127.0.0.1:5180/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelector('#reflection .reflection-visual').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(800);

const findings = await page.evaluate(() => {
  const visual = document.querySelector('#reflection .reflection-visual');
  const sheet = document.querySelector('#reflection .reflection-ambient-sheet');
  const out = {
    runtime_injected_sheet: !!sheet,
    visual_dataset: { ...visual.dataset },
    visual_children: [...visual.children].map((c) => ({ tag: c.tagName, class: c.className })),
    visual_has_reveal_is_visible: visual.classList.contains('is-visible'),
    visual_classes: visual.className,
  };
  // Use getAnimations() — authoritative animation state
  const animations = visual.getAnimations({ subtree: true });
  out.getAnimations_count = animations.length;
  out.getAnimations_list = animations.map((a) => ({
    target: a.effect?.target?.tagName + '.' + (a.effect?.target?.className || ''),
    pseudo: a.effect?.pseudoElement,
    name: a.animationName,
    playState: a.playState,
    currentTime: a.currentTime,
  }));
  return out;
});

console.log('=== INITIAL ===');
console.log(JSON.stringify(findings, null, 2));

console.log('\n=== CONSOLE LOGS / ERRORS ===');
logs.forEach((l) => console.log(l));

// Sample currentTime from getAnimations() — that's the real proof of animation progress
const samples = [];
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(700);
  const sample = await page.evaluate(() => {
    const visual = document.querySelector('#reflection .reflection-visual');
    const animations = visual.getAnimations({ subtree: true });
    return animations.map((a) => ({ name: a.animationName, pseudo: a.effect?.pseudoElement, t: a.currentTime }));
  });
  samples.push({ wall: i * 700 + 700, anims: sample });
}

console.log('\n=== ANIMATION CURRENT TIME SAMPLES ===');
samples.forEach((s) => console.log(`wall+${s.wall}ms`, JSON.stringify(s.anims)));

// Now grab 6 screenshots and md5-them to verify VISUAL frame difference
import('node:crypto').then(async ({ createHash }) => {
  const { writeFileSync } = await import('node:fs');
  const hashes = [];
  for (let i = 0; i < 6; i++) {
    const buf = await page.locator('#reflection .reflection-visual').screenshot();
    writeFileSync(`_probe_frame_${i}.png`, buf);
    hashes.push(createHash('sha1').update(buf).digest('hex').slice(0, 12));
    await page.waitForTimeout(1500);
  }
  console.log('\n=== SCREENSHOT HASHES (each 1.5s) — identical = no visual motion ===');
  hashes.forEach((h, i) => console.log(`frame${i}: ${h}`));
  await browser.close();
});
