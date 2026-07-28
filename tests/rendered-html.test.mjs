import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://tabtell.imzh.me${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the TabTell product page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>TabTell — Ask the current page<\/title>/i);
  assert.match(html, /让网页，变成一段对话。/);
  assert.match(html, /Chrome Web Store · 准备上线/);
  assert.match(html, /不经过 TabTell 服务器/);
  assert.match(html, /https:\/\/tabtell\.imzh\.me\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("ships the public privacy page and finished brand assets", async () => {
  const [privacy, page, layout, packageJson, ogStats] = await Promise.all([
    readFile(new URL("../public/privacy/index.html", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    stat(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(privacy, /Privacy Policy/);
  assert.match(privacy, /隐私政策/);
  assert.match(privacy, /iamzhzhang@gmail\.com/);
  assert.match(privacy, /href="\.\.\/"/);
  assert.doesNotMatch(privacy, /options\.html|src\/i18n/);

  assert.match(page, /Buy Me a Coffee/);
  assert.match(page, /\/privacy\//);
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /site-creator-vinext-starter|react-loading-skeleton/);
  assert.ok(ogStats.size > 100_000);

  await Promise.all([
    access(new URL("../public/favicon.png", import.meta.url)),
    access(new URL("../public/tabtell-icon.png", import.meta.url)),
    access(new URL("../public/tabtell-zh.png", import.meta.url)),
    access(new URL("../public/tabtell-en.png", import.meta.url)),
  ]);
});
