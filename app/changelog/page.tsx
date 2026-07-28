"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "./changelog.module.css";

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
    brandAria: "TabTell 首页",
    home: "首页",
    roadmap: "路线图",
    privacy: "隐私政策",
    navAria: "更新日志导航",
    languageAria: "语言",
    eyebrow: "开发记录",
    titleLead: "从网页提取器，",
    titleAccent: "走到 3.0。",
    intro:
      "TabTell 3.0.0 是准备提交 Chrome Web Store 的发布候选。更早的版本记录的是开发过程，没有作为 TabTell 在商店公开发布。",
    releaseLabel: "当前版本",
    releaseStatus: "发布候选",
    releaseDate: "构建于 2026.07.28",
    releaseTitle: "TabTell 3.0.0",
    releaseIntro:
      "这次更新把逐页对话、模型配置、快捷处理、Skills 和数据管理收进同一套产品结构，也完成了新的名称、图标与双语界面。",
    releaseItems: [
      {
        number: "01",
        title: "每个网页一套上下文",
        body: "不同网页分别保存原文、对话和历史。切换标签页时，正在生成的回答不会被暂停。",
      },
      {
        number: "02",
        title: "边生成，边阅读",
        body: "支持流式 Markdown、停止生成、请求超时、模型切换和上下文占用估算。",
      },
      {
        number: "03",
        title: "十个预设供应商",
        body: "填写 API Key 后即可选择推荐模型，同时保留自定义接口与会话级 Key 存储。",
      },
      {
        number: "04",
        title: "快捷处理回到第一轮",
        body: "总结、翻译和写稿只替用户准备开场，后续对话不再绑定某个助手身份。",
      },
      {
        number: "05",
        title: "可导入的 Skills",
        body: "兼容开放 Agent Skills、Codex、Claude 和 Gemini CLI Extension，可自动匹配、手动指定或关闭。",
      },
      {
        number: "06",
        title: "配置和原文都能带走",
        body: "加入配置备份、导入预览、原文编辑与 Markdown 导出，并补齐本地数据删除入口。",
      },
    ],
    historyKicker: "Development milestones",
    historyTitle: "3.0 之前，功能是一块块长出来的。",
    historyIntro:
      "以下版本号来自 Git 提交和扩展清单。它们是内部开发里程碑，不代表曾在 Chrome Web Store 公开上架。",
    milestoneLabel: "开发里程碑",
    history: [
      {
        version: "2.9.0",
        date: "2026.07.24",
        title: "快捷处理只负责开场",
        body: "重新整理快捷处理与 Skills 的职责，并加入自动 Skill 路由。",
      },
      {
        version: "2.8.0",
        date: "2026.07.24",
        title: "Skill 变成便携能力包",
        body: "开始支持 SKILL.md、ZIP、文件夹和兼容清单的导入。",
      },
      {
        version: "2.7.0",
        date: "2026.07.23",
        title: "切换标签页也继续生成",
        body: "把生成任务留在后台运行，回到原网页时恢复实时或完整回答。",
      },
      {
        version: "2.6.0",
        date: "2026.07.22",
        title: "加入预设模型目录",
        body: "供应商接口、协议和推荐模型开始由扩展代码维护。",
      },
      {
        version: "2.5.0",
        date: "2026.07.22",
        title: "逐页工作区与流式对话",
        body: "网页开始拥有独立的原文快照和聊天记录，回答可以逐字显示。",
      },
      {
        version: "2.4.1",
        date: "2026.07.22",
        title: "排序与模型切换",
        body: "快捷处理可以拖动排序，模型选择回到对话输入框。",
      },
      {
        version: "2.4.0",
        date: "2026.07.22",
        title: "从助手列表转向网页对话",
        body: "产品当时名为 SumHere，开始把网页上下文和连续追问放在主界面。",
      },
      {
        version: "2.2.0",
        date: "2026.07.22",
        title: "第一次加入 AI 对话",
        body: "产品当时名为 SumBuddy，支持自带模型接口、Markdown 回答和可复用配置。",
      },
      {
        version: "0.1.0",
        date: "2026.07.08",
        title: "网页正文提取器",
        body: "最初版本只做一件事：从当前网页提取可读、可编辑的正文。",
      },
    ],
    nextKicker: "What is next",
    nextTitle: "现在，先把 3.0 稳稳送进商店。",
    nextBody:
      "路线图只记录已经排进发布检查和维护计划的工作，不提前挂名没有开始的功能。",
    nextLink: "查看路线图",
    footerNote: "Ask the current page.",
  },
  en: {
    brandAria: "TabTell home",
    home: "Home",
    roadmap: "Roadmap",
    privacy: "Privacy",
    navAria: "Changelog navigation",
    languageAria: "Language",
    eyebrow: "Development log",
    titleLead: "From a page extractor",
    titleAccent: "to TabTell 3.0.",
    intro:
      "TabTell 3.0.0 is the release candidate being prepared for the Chrome Web Store. Earlier versions were development milestones, not public TabTell store releases.",
    releaseLabel: "Current version",
    releaseStatus: "Release candidate",
    releaseDate: "Built 2026.07.28",
    releaseTitle: "TabTell 3.0.0",
    releaseIntro:
      "This release brings page-scoped conversations, model setup, quick actions, Skills, and data controls into one product structure, alongside a new name, icon, and bilingual interface.",
    releaseItems: [
      {
        number: "01",
        title: "One context per page",
        body: "Each page keeps its own source, chats, and history. Switching tabs no longer pauses an answer in progress.",
      },
      {
        number: "02",
        title: "Read while it generates",
        body: "Streaming Markdown, stop, request timeouts, model switching, and context-window estimates are all included.",
      },
      {
        number: "03",
        title: "Ten provider presets",
        body: "Enter an API key, choose maintained models, or connect a custom endpoint. Session-only key storage remains available.",
      },
      {
        number: "04",
        title: "Quick actions start the chat",
        body: "Summary, translation, and writing actions prepare the opening request without locking later turns to an assistant.",
      },
      {
        number: "05",
        title: "Portable Skills",
        body: "Import open Agent Skills, Codex, Claude, and Gemini CLI Extension packages, then use automatic, manual, or off mode.",
      },
      {
        number: "06",
        title: "Take settings and sources with you",
        body: "Configuration backup, import review, editable source text, Markdown export, and local-data deletion are now available.",
      },
    ],
    historyKicker: "Development milestones",
    historyTitle: "The pieces that became 3.0.",
    historyIntro:
      "These version numbers come from the Git history and extension manifests. They are internal development milestones, not earlier Chrome Web Store releases.",
    milestoneLabel: "Development milestone",
    history: [
      {
        version: "2.9.0",
        date: "2026.07.24",
        title: "Quick actions became first-turn tasks",
        body: "Quick actions and Skills received separate jobs, with automatic Skill routing added.",
      },
      {
        version: "2.8.0",
        date: "2026.07.24",
        title: "Portable Skill packages",
        body: "Added imports for SKILL.md, ZIP archives, folders, and compatible manifests.",
      },
      {
        version: "2.7.0",
        date: "2026.07.23",
        title: "Generation continued across tabs",
        body: "Requests stayed active in the background and restored their live or completed answer on return.",
      },
      {
        version: "2.6.0",
        date: "2026.07.22",
        title: "Preset provider catalog",
        body: "Provider endpoints, protocols, and recommended models moved into the extension code.",
      },
      {
        version: "2.5.0",
        date: "2026.07.22",
        title: "Page workspaces and streaming",
        body: "Pages gained separate source snapshots and chats, while answers began rendering incrementally.",
      },
      {
        version: "2.4.1",
        date: "2026.07.22",
        title: "Ordering and model switching",
        body: "Quick actions became draggable and model selection returned to the chat composer.",
      },
      {
        version: "2.4.0",
        date: "2026.07.22",
        title: "From assistant lists to page chat",
        body: "Then called SumHere, the product centered its interface on page context and follow-up questions.",
      },
      {
        version: "2.2.0",
        date: "2026.07.22",
        title: "The first AI conversation",
        body: "Then called SumBuddy, it added bring-your-own-model chat, Markdown answers, and reusable configurations.",
      },
      {
        version: "0.1.0",
        date: "2026.07.08",
        title: "Page text extractor",
        body: "The first build did one job: extract readable, editable text from the active webpage.",
      },
    ],
    nextKicker: "What is next",
    nextTitle: "First, get 3.0 safely into the store.",
    nextBody:
      "The roadmap lists work already present in release checks and maintenance plans. It does not advertise features that have not started.",
    nextLink: "View the roadmap",
    footerNote: "Ask the current page.",
  },
} as const;

export default function ChangelogPage() {
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
    <main className={styles.page}>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href={sitePath("/")}
          aria-label={copy.brandAria}
        >
          <img
            src={sitePath("/tabtell-icon.png")}
            width="38"
            height="38"
            alt=""
          />
          <strong>TabTell</strong>
        </a>
        <nav className={styles.nav} aria-label={copy.navAria}>
          <a href={sitePath("/")}>{copy.home}</a>
          <a href={sitePath("/roadmap/")}>{copy.roadmap}</a>
          <a href={sitePath("/privacy/")}>{copy.privacy}</a>
          <div
            className={styles.languageSwitch}
            aria-label={copy.languageAria}
          >
            <button
              type="button"
              className={language === "zh" ? styles.active : ""}
              onClick={() => setSelectedLanguage("zh")}
              aria-pressed={language === "zh"}
            >
              中
            </button>
            <button
              type="button"
              className={language === "en" ? styles.active : ""}
              onClick={() => setSelectedLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroVersion} aria-hidden="true">
          3.0
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>
            {copy.titleLead}
            <span>{copy.titleAccent}</span>
          </h1>
          <p className={styles.heroIntro}>{copy.intro}</p>
        </div>
        <div className={styles.heroStamp}>
          <span>{copy.releaseStatus}</span>
          <strong>RC</strong>
          <small>{copy.releaseDate}</small>
        </div>
      </section>

      <section className={styles.release}>
        <header className={styles.releaseHeading}>
          <div>
            <p className={styles.lightEyebrow}>{copy.releaseLabel}</p>
            <h2>{copy.releaseTitle}</h2>
          </div>
          <span className={styles.status}>{copy.releaseStatus}</span>
          <p>{copy.releaseIntro}</p>
        </header>
        <div className={styles.releaseGrid}>
          {copy.releaseItems.map((item) => (
            <article className={styles.releaseItem} key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.history}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{copy.historyKicker}</p>
          <h2>{copy.historyTitle}</h2>
          <p>{copy.historyIntro}</p>
        </header>
        <div className={styles.timeline}>
          {copy.history.map((item) => (
            <article className={styles.timelineItem} key={item.version}>
              <div className={styles.timelineMeta}>
                <strong>{item.version}</strong>
                <time>{item.date}</time>
              </div>
              <div className={styles.timelineCopy}>
                <span>{copy.milestoneLabel}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.next}>
        <div>
          <p className={styles.lightEyebrow}>{copy.nextKicker}</p>
          <h2>{copy.nextTitle}</h2>
        </div>
        <div>
          <p>{copy.nextBody}</p>
          <a href={sitePath("/roadmap/")}>{copy.nextLink}</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href={sitePath("/")}>
          <img
            src={sitePath("/tabtell-icon.png")}
            width="30"
            height="30"
            alt=""
          />
          <strong>TabTell</strong>
        </a>
        <p>{copy.footerNote}</p>
        <div>
          <a href={sitePath("/")}>{copy.home}</a>
          <a href={sitePath("/privacy/")}>{copy.privacy}</a>
        </div>
      </footer>
    </main>
  );
}
