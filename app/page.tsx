"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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
    homeLabel: "TabTell 首页",
    primaryNavigation: "主导航",
    languageLabel: "语言",
    navProduct: "产品",
    navGuide: "使用指南",
    navChangelog: "更新日志",
    navRoadmap: "正在开发",
    navPrivacy: "隐私",
    eyebrow: "当前网页 · 连续对话",
    title: "打开网页，\n直接开聊",
    intro:
      "在支持读取的网页上发起 AI 对话，让信息检索、阅读和创作更直接。问题和原文留在同一份上下文里。",
    guideCta: "5 分钟上手",
    storeStatus: "Chrome Web Store · 准备上线",
    trust: ["自带 API Key", "记录保存在浏览器", "无中转服务器"],
    quickstartTitle: "第一次使用，只需要三步",
    quickstart: [
      {
        index: "01",
        title: "连接模型",
        body: "找到供应商，填入 API Key，再选择你想在对话里使用的模型。",
      },
      {
        index: "02",
        title: "打开网页",
        body: "打开一个普通网页，再打开 TabTell。标题和可读正文会进入当前页工作区。",
      },
      {
        index: "03",
        title: "开始提问",
        body: "直接提问，或先点一次快捷处理。回答会边生成边显示。",
      },
    ],
    manualKicker: "5 分钟上手",
    manualSteps: [
      {
        index: "01",
        title: "连接模型",
        body: "预设供应商的接口和推荐模型由 TabTell 维护。你只要填入 API Key，勾选模型并保存。",
        action: "设置供应商与模型",
        image: "/guide/providers-zh.png",
        alt: "TabTell 模型供应商连接界面",
      },
      {
        index: "02",
        title: "打开网页",
        body: "打开一篇文章，再打开 TabTell。顶部网页卡片会显示标题、网址和已读取的正文长度。",
        action: "确认当前网页",
        image: "/guide/start-zh.png",
        alt: "TabTell 读取当前网页后的起始界面",
      },
      {
        index: "03",
        title: "开始提问",
        body: "输入问题，或用快速总结开场。后续仍是普通对话，不会被某个助手身份绑住。",
        action: "查看流式回答",
        image: "/guide/streaming-zh.png",
        alt: "TabTell 正在流式生成 Markdown 回答",
      },
    ],
    guidePanelKicker: "使用指南 · 新标签页打开",
    guidePanelTitle: "从零开始，一步步把 TabTell 用起来。",
    guidePanelBody:
      "完整指南不挤在首页里。它会在新标签页打开，用真实截图讲清模型设置、网页对话、快捷处理、Skills、原文导出和备份迁移。",
    guideChapters: [
      "模型设置",
      "网页对话",
      "快捷处理",
      "Skills",
      "原文与导出",
      "备份迁移",
    ],
    guidePanelLink: "查看完整指南",
    modelKicker: "模型设置",
    modelTitle: "找到供应商，只填 API Key，再选择模型",
    modelBody:
      "智谱、DeepSeek、OpenAI、Gemini、Anthropic、千问、Kimi、OpenRouter、硅基流动和火山方舟都有预设入口。API Key 可以保存在本机，也可以仅保留到本次浏览器会话结束。",
    modelLink: "指南：连接第一个模型",
    changelogKicker: "更新日志",
    changelogTitle: "TabTell 3.0.0",
    changelogDate: "2026-07-28 · 发布候选",
    changelogBody:
      "逐页工作区、流式 Markdown、切换标签页仍继续生成、模型供应商预设、快捷处理、开放格式 Skills 和配置迁移，都在这次版本里。",
    changelogLink: "查看完整更新日志",
    roadmapKicker: "接下来",
    roadmapTitle: "公开写下正在做的事",
    roadmapIntro:
      "这里记录方向，不承诺发布日期。完成一项，就把它移进更新日志。",
    roadmap: [
      {
        index: "01",
        title: "正在进行",
        body: "完成 Chrome Web Store 首次发布，复核最终安装包和公开页面。",
      },
      {
        index: "02",
        title: "接下来",
        body: "继续改善长网页、动态网页、登录页面和无正文页面的兼容性。",
      },
      {
        index: "03",
        title: "持续维护",
        body: "跟进供应商接口、推荐模型、Chrome 权限政策和 Skills 格式。",
      },
    ],
    roadmapLink: "查看正在开发",
    privacyKicker: "本地优先",
    privacyTitle: "不需要 TabTell 账号，也没有中转服务器。",
    privacyBody:
      "网页快照、对话、快捷处理与 Skills 保存在当前浏览器。只有你主动提问或测试连接时，相关内容才会直接发送给所选模型供应商。",
    privacyLink: "完整隐私政策",
    supportKicker: "独立开发",
    supportTitle: "TabTell 是一个独立项目。",
    supportBody:
      "如果它替你省下了时间，可以自愿支持后续维护。支持不会解锁功能，也不会改变产品体验。",
    supportLink: "Buy Me a Coffee",
    contact: "联系开发者",
    footerTagline: "把 AI 带到你正在阅读的网页。",
    footerResources: "资源",
    footerSupport: "支持",
    footerLegal: "法律",
    footerBuilt: "由",
    footerBuiltSuffix: "开发",
  },
  en: {
    homeLabel: "TabTell home",
    primaryNavigation: "Primary navigation",
    languageLabel: "Language",
    navProduct: "Product",
    navGuide: "Guide",
    navChangelog: "Changelog",
    navRoadmap: "In progress",
    navPrivacy: "Privacy",
    eyebrow: "Current page · Continuous conversation",
    title: "Open a page.\nStart talking.",
    intro:
      "Start an AI conversation on supported webpages. Keep retrieval, reading, and writing grounded in the source already open in your tab.",
    guideCta: "Start in 5 minutes",
    storeStatus: "Chrome Web Store · Coming soon",
    trust: ["Bring your own API key", "Records stay in this browser", "No relay server"],
    quickstartTitle: "Your first conversation takes three steps",
    quickstart: [
      {
        index: "01",
        title: "Connect a model",
        body: "Choose a provider, paste an API key, then select the models you want in chat.",
      },
      {
        index: "02",
        title: "Open a page",
        body: "Visit a normal webpage and open TabTell. Its title and readable text become the page workspace.",
      },
      {
        index: "03",
        title: "Ask",
        body: "Type a question or begin with one quick action. The answer appears as it is generated.",
      },
    ],
    manualKicker: "Start in 5 minutes",
    manualSteps: [
      {
        index: "01",
        title: "Connect a model",
        body: "TabTell maintains the provider endpoint and recommended models. Paste your API key, pick models, and save.",
        action: "Set up a provider",
        image: "/guide/providers-en.png",
        alt: "TabTell provider connection screen",
      },
      {
        index: "02",
        title: "Open a page",
        body: "Open an article, then open TabTell. The page card shows its title, URL, and extracted text length.",
        action: "Check the current page",
        image: "/guide/start-en.png",
        alt: "TabTell start screen after reading the current page",
      },
      {
        index: "03",
        title: "Ask",
        body: "Type a question or start with a quick summary. Follow-ups return to a normal, open-ended conversation.",
        action: "Watch a streamed answer",
        image: "/guide/streaming-en.png",
        alt: "TabTell streaming a Markdown answer",
      },
    ],
    guidePanelKicker: "Complete guide · Opens in a new tab",
    guidePanelTitle: "Start from zero and learn TabTell one step at a time.",
    guidePanelBody:
      "The full guide has its own page. Real screenshots cover model setup, page chat, quick actions, Skills, source export, and backup migration.",
    guideChapters: [
      "Model setup",
      "Page chat",
      "Quick actions",
      "Skills",
      "Source export",
      "Backup migration",
    ],
    guidePanelLink: "Open the complete guide",
    modelKicker: "Model setup",
    modelTitle: "Find your provider, paste an API key, then pick models",
    modelBody:
      "TabTell includes presets for Zhipu, DeepSeek, OpenAI, Gemini, Anthropic, Qwen, Kimi, OpenRouter, SiliconFlow, and Volcano Engine. Keep a key on this device or only for the current browser session.",
    modelLink: "Guide: connect your first model",
    changelogKicker: "Changelog",
    changelogTitle: "TabTell 3.0.0",
    changelogDate: "2026-07-28 · Release candidate",
    changelogBody:
      "Page-scoped workspaces, streamed Markdown, generation that continues across tab switches, provider presets, quick actions, portable Skills, and configuration migration arrive together.",
    changelogLink: "Read the full changelog",
    roadmapKicker: "Next",
    roadmapTitle: "Build in the open",
    roadmapIntro:
      "These are directions, not promised dates. Finished work moves into the changelog.",
    roadmap: [
      {
        index: "01",
        title: "In progress",
        body: "Finish the first Chrome Web Store release and verify the final package and public pages.",
      },
      {
        index: "02",
        title: "Next",
        body: "Improve compatibility with long, dynamic, signed-in, and low-content pages.",
      },
      {
        index: "03",
        title: "Ongoing",
        body: "Track provider APIs, recommended models, Chrome policies, and portable Skill formats.",
      },
    ],
    roadmapLink: "See what is in progress",
    privacyKicker: "Local first",
    privacyTitle: "No TabTell account. No relay server.",
    privacyBody:
      "Page snapshots, chats, quick actions, and Skills stay in this browser. Relevant content goes directly to the selected provider only after you ask or test a connection.",
    privacyLink: "Full privacy policy",
    supportKicker: "Independent",
    supportTitle: "TabTell is an independent project.",
    supportBody:
      "If it saves you time, you can voluntarily support ongoing maintenance. Support never unlocks features or changes the product experience.",
    supportLink: "Buy Me a Coffee",
    contact: "Contact the developer",
    footerTagline: "Bring AI to the page you are already reading.",
    footerResources: "Resources",
    footerSupport: "Support",
    footerLegal: "Legal",
    footerBuilt: "Built by",
    footerBuiltSuffix: "",
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

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const guideHref = sitePath("/guide/");

  return (
    <main>
      <header className="site-header">
        <a className="brand" href={sitePath("/")} aria-label={copy.homeLabel}>
          <img
            src={sitePath("/tabtell-icon.png")}
            width="42"
            height="42"
            alt=""
          />
          <strong>TabTell</strong>
        </a>
        <nav aria-label={copy.primaryNavigation}>
          <div className="nav-links">
            <a href="#product">{copy.navProduct}</a>
            <a href={guideHref} target="_blank" rel="noreferrer">
              {copy.navGuide}
            </a>
            <a href={sitePath("/changelog/")}>{copy.navChangelog}</a>
            <a href={sitePath("/roadmap/")}>{copy.navRoadmap}</a>
            <a href={sitePath("/privacy/")}>{copy.navPrivacy}</a>
          </div>
          <div className="language-switch" aria-label={copy.languageLabel}>
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

      <section className="hero" id="product">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {copy.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-actions">
            <a
              className="primary-link"
              href={guideHref}
              target="_blank"
              rel="noreferrer"
            >
              {copy.guideCta}
            </a>
            <span className="store-status">{copy.storeStatus}</span>
          </div>
          <ul className="trust-list" aria-label={copy.trust.join("、")}>
            {copy.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <img
            className="hero-product"
            src={sitePath(
              language === "zh"
                ? "/guide/start-zh.png"
                : "/guide/start-en.png",
            )}
            alt={
              language === "zh"
                ? "TabTell 中文侧边栏界面"
                : "TabTell English side-panel interface"
            }
          />
          <img
            className="hero-symbol"
            src={sitePath("/tabtell-icon.png")}
            alt=""
          />
        </div>
      </section>

      <section className="quickstart-strip" aria-labelledby="quickstart-title">
        <h2 className="sr-only" id="quickstart-title">
          {copy.quickstartTitle}
        </h2>
        <div className="quickstart-grid">
          {copy.quickstart.map((step) => (
            <article key={step.index}>
              <span>{step.index}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manual-section" aria-label={copy.manualKicker}>
        <div className="manual-main">
          <p className="section-tab">{copy.manualKicker}</p>
          {copy.manualSteps.map((step) => (
            <article className="manual-step" key={step.index}>
              <div className="manual-number">{step.index}</div>
              <div className="manual-copy">
                <h2>{step.title}</h2>
                <p>{step.body}</p>
                <strong>{step.action}</strong>
              </div>
              <div className="manual-image">
                <img src={sitePath(step.image)} alt={step.alt} />
              </div>
            </article>
          ))}
        </div>

        <aside className="guide-panel">
          <p className="section-tab">{copy.guidePanelKicker}</p>
          <h2>{copy.guidePanelTitle}</h2>
          <p>{copy.guidePanelBody}</p>
          <ol>
            {copy.guideChapters.map((chapter, index) => (
              <li key={chapter}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {chapter}
              </li>
            ))}
          </ol>
          <a href={guideHref} target="_blank" rel="noreferrer">
            {copy.guidePanelLink}
          </a>
        </aside>
      </section>

      <section className="information-grid">
        <article className="information-panel model-panel">
          <p className="section-tab">{copy.modelKicker}</p>
          <h2>{copy.modelTitle}</h2>
          <p>{copy.modelBody}</p>
          <a href={`${guideHref}#models`} target="_blank" rel="noreferrer">
            {copy.modelLink}
          </a>
        </article>

        <article className="information-panel changelog-panel">
          <p className="section-tab">{copy.changelogKicker}</p>
          <h2>{copy.changelogTitle}</h2>
          <time dateTime="2026-07-28">{copy.changelogDate}</time>
          <p>{copy.changelogBody}</p>
          <a href={sitePath("/changelog/")}>{copy.changelogLink}</a>
        </article>
      </section>

      <section className="roadmap-section">
        <div className="roadmap-heading">
          <p className="section-tab">{copy.roadmapKicker}</p>
          <h2>{copy.roadmapTitle}</h2>
          <p>{copy.roadmapIntro}</p>
          <a href={sitePath("/roadmap/")}>{copy.roadmapLink}</a>
        </div>
        <div className="roadmap-grid">
          {copy.roadmap.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-section">
        <div>
          <p className="section-tab">{copy.privacyKicker}</p>
          <h2>{copy.privacyTitle}</h2>
        </div>
        <div>
          <p>{copy.privacyBody}</p>
          <a href={sitePath("/privacy/")}>{copy.privacyLink}</a>
        </div>
      </section>

      <section className="support-section">
        <div>
          <p className="section-tab">{copy.supportKicker}</p>
          <h2>{copy.supportTitle}</h2>
          <p>{copy.supportBody}</p>
        </div>
        <div className="support-actions">
          <a
            className="support-primary"
            href="https://buymeacoffee.com/zhzhang"
            target="_blank"
            rel="noreferrer"
          >
            {copy.supportLink}
          </a>
          <a href="mailto:iamzhzhang@gmail.com">{copy.contact}</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand-block">
          <div className="brand footer-brand">
            <img
              src={sitePath("/tabtell-icon.png")}
              width="34"
              height="34"
              alt=""
            />
            <strong>TabTell</strong>
          </div>
          <p>{copy.footerTagline}</p>
        </div>
        <div className="footer-column">
          <strong>{copy.footerResources}</strong>
          <a href={guideHref} target="_blank" rel="noreferrer">
            {copy.navGuide}
          </a>
          <a href={sitePath("/changelog/")}>{copy.navChangelog}</a>
          <a href={sitePath("/roadmap/")}>{copy.navRoadmap}</a>
        </div>
        <div className="footer-column">
          <strong>{copy.footerSupport}</strong>
          <a href="mailto:iamzhzhang@gmail.com">{copy.contact}</a>
          <a
            href="https://buymeacoffee.com/zhzhang"
            target="_blank"
            rel="noreferrer"
          >
            {copy.supportLink}
          </a>
        </div>
        <div className="footer-column">
          <strong>{copy.footerLegal}</strong>
          <a href={sitePath("/privacy/")}>{copy.navPrivacy}</a>
          <p className="built-by">
            {copy.footerBuilt}{" "}
            <a href="https://imzh.me" target="_blank" rel="noreferrer">
              imzh
            </a>{" "}
            {copy.footerBuiltSuffix}
          </p>
        </div>
      </footer>
    </main>
  );
}
