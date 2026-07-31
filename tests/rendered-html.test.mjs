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
  assert.match(html, /<title>TabTell — 打开网页，直接开聊<\/title>/i);
  assert.match(html, /打开网页，/);
  assert.match(html, /直接开聊/);
  assert.match(html, /安装 TabTell/);
  assert.match(
    html,
    /https:\/\/chromewebstore\.google\.com\/detail\/tabtell\/meapdcifnfnkaceamkbjoebohiippbeo/,
  );
  assert.match(html, /无中转服务器/);
  assert.match(html, /href="\/guide\/"[^>]*target="_blank"/);
  assert.match(html, /真实截图讲清模型设置/);
  assert.match(html, /https:\/\/tabtell\.imzh\.me\/og\.png/);
  assert.doesNotMatch(html, /准备上线|发布候选/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("launch pages describe the public Chrome Web Store release", async () => {
  const guide = await (await render("/guide")).text();
  const changelog = await (await render("/changelog")).text();
  const roadmap = await (await render("/roadmap")).text();

  assert.match(guide, /从 Chrome 商店安装/);
  assert.match(changelog, /正式发布/);
  assert.match(changelog, /LIVE/);
  assert.match(roadmap, /3\.0\.0 已上线/);
  assert.match(roadmap, /首发完成/);
});

test("ships the public privacy page and finished brand assets", async () => {
  const [
    privacy,
    page,
    guide,
    changelog,
    roadmap,
    layout,
    packageJson,
    ogStats,
  ] = await Promise.all([
    readFile(new URL("../public/privacy/index.html", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/guide/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/changelog/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/roadmap/page.tsx", import.meta.url), "utf8"),
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
  assert.match(
    `${page}\n${guide}`,
    /https:\/\/chromewebstore\.google\.com\/detail\/tabtell\/meapdcifnfnkaceamkbjoebohiippbeo/,
  );
  assert.doesNotMatch(
    `${page}\n${guide}\n${changelog}\n${roadmap}`,
    /准备上线|Coming soon|发布候选|Release candidate|审核通过前|Until review is complete/,
  );
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /site-creator-vinext-starter|react-loading-skeleton/);
  assert.ok(ogStats.size > 100_000);

  await Promise.all([
    access(new URL("../public/favicon.png", import.meta.url)),
    access(new URL("../public/tabtell-icon.png", import.meta.url)),
    access(new URL("../public/tabtell-zh.png", import.meta.url)),
    access(new URL("../public/tabtell-en.png", import.meta.url)),
    access(new URL("../public/guide/start-zh.png", import.meta.url)),
    access(new URL("../public/guide/providers-zh.png", import.meta.url)),
    access(new URL("../public/guide/streaming-zh.png", import.meta.url)),
  ]);
});
