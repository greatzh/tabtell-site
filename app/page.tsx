"use client";

import { useState, useSyncExternalStore } from "react";

type Language = "zh" | "en";

const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

function sitePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

function subscribeToBrowserLanguage(): () => void {
  return () => {};
}

function getBrowserLanguage(): Language {
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function getServerLanguage(): Language {
  return "zh";
}

const COPY = {
  zh: {
    navFeatures: "产品特点",
    navPrivacy: "隐私政策",
    navSupport: "支持",
    eyebrow: "当前网页 · 连续对话",
    title: "让网页，变成一段对话。",
    intro:
      "TabTell 读取当前标签页的正文。你可以直接提问、点一下快捷处理，再围绕同一份原文继续追问。",
    comingSoon: "Chrome Web Store · 准备上线",
    privacy: "查看隐私政策",
    note: "自带 API Key · 数据留在浏览器 · 不经过 TabTell 服务器",
    featuresTitle: "阅读时少做几次复制粘贴",
    featuresIntro:
      "页面上下文、模型、快捷任务和 Skills 都放在该出现的位置，不把设置塞进对话。",
    features: [
      {
        index: "01",
        title: "当前网页，不串台",
        body: "A 网页和 B 网页各自保留原文与对话。切回去时，记录还在原来的页面里。",
      },
      {
        index: "02",
        title: "先快捷处理，再自由追问",
        body: "总结、翻译和写稿只是第一条提示词。任务完成后，后续对话不再被助手身份绑住。",
      },
      {
        index: "03",
        title: "Skills 会判断，也听你的",
        body: "允许自动匹配的 Skill 会按问题选择；第三方 Skill 导入后默认只允许手动使用。",
      },
      {
        index: "04",
        title: "模型与 Key 由你决定",
        body: "内置常见供应商、维护接口与模型列表。API Key 只发给你选择的模型接口。",
      },
    ],
    privacyTitle: "没有账号，也没有中转服务器。",
    privacyBody:
      "网页快照、对话、快捷处理与 Skills 保存在当前浏览器。只有你主动提问、测试连接或点击快捷处理时，相关内容才会直接发送给所选模型供应商。",
    privacyLink: "读完整隐私政策",
    contact: "隐私问题",
    supportTitle: "TabTell 是一个独立项目。",
    supportBody:
      "如果它替你省下了时间，可以自愿支持后续维护。支持不会解锁功能，也不会影响产品体验。",
    supportLink: "Buy Me a Coffee",
    email: "联系开发者",
    footer: "由香港特别行政区的独立开发者维护",
  },
  en: {
    navFeatures: "Features",
    navPrivacy: "Privacy",
    navSupport: "Support",
    eyebrow: "Current page · Continuous conversation",
    title: "Turn the current page into a conversation.",
    intro:
      "TabTell reads the article in your active tab. Ask directly, start with a quick action, and keep following up against the same source.",
    comingSoon: "Chrome Web Store · Coming soon",
    privacy: "Read the privacy policy",
    note: "Bring your own API key · Local browser data · No TabTell relay",
    featuresTitle: "Spend less time copying context",
    featuresIntro:
      "Page context, models, quick actions, and Skills live where they belong instead of crowding the conversation.",
    features: [
      {
        index: "01",
        title: "One workspace per page",
        body: "Page A and page B keep separate sources and chats. Return to a page and its conversation is still there.",
      },
      {
        index: "02",
        title: "Start quickly, then chat normally",
        body: "Summary, translation, and writing actions seed the first prompt only. Follow-up turns stay open-ended.",
      },
      {
        index: "03",
        title: "Skills can route—or stay off",
        body: "Allowed Skills can match the next question automatically. Imported third-party Skills start as manual-only.",
      },
      {
        index: "04",
        title: "Your model, your API key",
        body: "Common providers come with maintained endpoints and model lists. Your key goes only to the endpoint you select.",
      },
    ],
    privacyTitle: "No account. No relay server.",
    privacyBody:
      "Page snapshots, chats, quick actions, and Skills stay in this browser. Relevant content leaves only after you ask, test a connection, or choose an AI action, and it goes directly to your selected provider.",
    privacyLink: "Read the full privacy policy",
    contact: "Privacy questions",
    supportTitle: "TabTell is an independent project.",
    supportBody:
      "If it saves you time, you can voluntarily support ongoing maintenance. Support never unlocks features or changes the product experience.",
    supportLink: "Buy Me a Coffee",
    email: "Contact the developer",
    footer: "Maintained by an independent developer in Hong Kong SAR",
  },
} as const;

export default function Home() {
  const browserLanguage = useSyncExternalStore(
    subscribeToBrowserLanguage,
    getBrowserLanguage,
    getServerLanguage,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null,
  );
  const language = selectedLanguage ?? browserLanguage;

  const copy = COPY[language];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href={sitePath("/")} aria-label="TabTell home">
          <img
            src={sitePath("/tabtell-icon.png")}
            width="40"
            height="40"
            alt=""
          />
          <strong>TabTell</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#features">{copy.navFeatures}</a>
          <a href={sitePath("/privacy/")}>{copy.navPrivacy}</a>
          <a href="#support">{copy.navSupport}</a>
          <div className="language-switch" aria-label="Language">
            <button
              type="button"
              className={language === "zh" ? "active" : ""}
              onClick={() => setSelectedLanguage("zh")}
              aria-pressed={language === "zh"}
            >
              中
            </button>
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => setSelectedLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-actions">
            <span className="store-status">{copy.comingSoon}</span>
            <a className="text-link" href={sitePath("/privacy/")}>
              {copy.privacy}
            </a>
          </div>
          <p className="trust-note">{copy.note}</p>
        </div>
        <div className="product-frame">
          <img
            src={sitePath(
              language === "zh" ? "/tabtell-zh.png" : "/tabtell-en.png",
            )}
            alt={language === "zh" ? "TabTell 中文界面" : "TabTell interface"}
          />
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <p className="section-kicker">TabTell 3.0</p>
          <h2>{copy.featuresTitle}</h2>
          <p>{copy.featuresIntro}</p>
        </div>
        <div className="feature-grid">
          {copy.features.map((feature) => (
            <article className="feature-card" key={feature.index}>
              <span>{feature.index}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div>
          <p className="section-kicker">Local first</p>
          <h2>{copy.privacyTitle}</h2>
        </div>
        <div>
          <p>{copy.privacyBody}</p>
          <div className="inline-links">
            <a href={sitePath("/privacy/")}>{copy.privacyLink}</a>
            <a href="mailto:iamzhzhang@gmail.com">{copy.contact}</a>
          </div>
        </div>
      </section>

      <section className="support-section" id="support">
        <div>
          <p className="section-kicker">Independent</p>
          <h2>{copy.supportTitle}</h2>
          <p>{copy.supportBody}</p>
        </div>
        <div className="support-actions">
          <a
            className="primary-link"
            href="https://buymeacoffee.com/zhzhang"
            target="_blank"
            rel="noreferrer"
          >
            {copy.supportLink}
          </a>
          <a className="secondary-link" href="mailto:iamzhzhang@gmail.com">
            {copy.email}
          </a>
        </div>
      </section>

      <footer>
        <div className="brand footer-brand">
          <img
            src={sitePath("/tabtell-icon.png")}
            width="30"
            height="30"
            alt=""
          />
          <strong>TabTell</strong>
        </div>
        <p>{copy.footer}</p>
        <a href={sitePath("/privacy/")}>{copy.navPrivacy}</a>
      </footer>
    </main>
  );
}
