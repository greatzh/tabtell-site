"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "./roadmap.module.css";

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
    changelog: "更新日志",
    privacy: "隐私政策",
    navAria: "路线图导航",
    languageAria: "语言",
    eyebrow: "Product roadmap",
    titleLead: "下一步，",
    titleAccent: "先把基础做牢。",
    intro:
      "这里不写发布日期，也不提前承诺没有开始的功能。路线图只列出发布检查、兼容性验证和长期维护中已经明确的工作。",
    statusLabel: "发布状态",
    statusValue: "3.0.0 已上线",
    inProgress: {
      marker: "Shipped",
      title: "首发完成",
      intro: "商店提交、审核复现和最终发布包复测已经完成。",
      items: [
        {
          index: "01",
          title: "Chrome Web Store 正式发布",
          body: "TabTell 3.0.0 已在 Chrome Web Store 上线，可以直接安装。",
        },
        {
          index: "02",
          title: "审核流程可以复现",
          body: "从首次授权、连接模型到网页总结的测试路径已经补齐，审核凭据没有进入公开资料。",
        },
        {
          index: "03",
          title: "最终发布包通过复测",
          body: "3.0.0 发布包完成首次授权、网页读取、模型连接和 Markdown 下载检查。",
        },
      ],
    },
    next: {
      marker: "Next",
      title: "接下来",
      intro: "先处理最容易影响真实使用的问题。",
      items: [
        {
          index: "01",
          title: "真实接口与故障场景",
          body: "覆盖更多预设供应商，并检查无效 Key、限流、模型不可用、超时、离线和自定义接口错误。",
        },
        {
          index: "02",
          title: "更难处理的网页",
          body: "继续测试长内容、动态页面、登录页面、特殊编码、没有可读正文的页面和浏览器限制页面。",
        },
        {
          index: "03",
          title: "键盘与屏幕阅读器",
          body: "逐项检查侧边栏、设置页、菜单和弹窗的键盘路径、焦点顺序与可访问名称。",
        },
      ],
    },
    ongoing: {
      marker: "Ongoing",
      title: "持续维护",
      intro: "这些内容不会等到某个大版本才处理。",
      items: [
        {
          index: "01",
          title: "供应商接口与模型目录",
          body: "跟进接口路径、协议和推荐模型变化，尽量避免用户因为目录更新而重新填写无关设置。",
        },
        {
          index: "02",
          title: "正文提取",
          body: "继续修正网站结构变化造成的漏读、错序和噪声，让原文保持可编辑、可导出。",
        },
        {
          index: "03",
          title: "Skills 格式兼容",
          body: "跟进开放格式变化，同时继续把脚本、Shell、MCP 和平台权限当作不可执行元数据处理。",
        },
        {
          index: "04",
          title: "权限与隐私说明",
          body: "按 Chrome Web Store 政策更新权限、数据处理说明和公开文档，保持产品行为与文案一致。",
        },
      ],
    },
    boundaryKicker: "Scope",
    boundaryTitle: "路线图只写已经排进工作的事项。",
    boundaryBody:
      "账号、云同步、订阅或团队功能目前没有进入这份路线图。若方向发生变化，会在开始实施后再公开说明。",
    changelogLink: "查看 3.0 发布记录",
    footerNote: "Ask the current page.",
  },
  en: {
    brandAria: "TabTell home",
    home: "Home",
    changelog: "Changelog",
    privacy: "Privacy",
    navAria: "Roadmap navigation",
    languageAria: "Language",
    eyebrow: "Product roadmap",
    titleLead: "Next,",
    titleAccent: "make the foundation solid.",
    intro:
      "There are no promised dates or features that have not started. This roadmap covers concrete release checks, compatibility work, and ongoing maintenance.",
    statusLabel: "Release status",
    statusValue: "3.0.0 is live",
    inProgress: {
      marker: "Shipped",
      title: "First release complete",
      intro: "Store submission, reviewer reproduction, and final-package checks are complete.",
      items: [
        {
          index: "01",
          title: "Published in the Chrome Web Store",
          body: "TabTell 3.0.0 is live in the Chrome Web Store and ready to install.",
        },
        {
          index: "02",
          title: "Reproducible review flow",
          body: "The path from first-run consent and model setup to page summarization is documented without exposing review credentials.",
        },
        {
          index: "03",
          title: "Final package verified",
          body: "The 3.0.0 package passed checks for consent, page access, model connection, and Markdown downloads.",
        },
      ],
    },
    next: {
      marker: "Next",
      title: "Next",
      intro: "Start with issues most likely to affect everyday use.",
      items: [
        {
          index: "01",
          title: "Real providers and failure states",
          body: "Cover more provider presets and test invalid keys, rate limits, unavailable models, timeouts, offline use, and custom-endpoint errors.",
        },
        {
          index: "02",
          title: "Harder webpages",
          body: "Continue testing long documents, dynamic pages, authenticated content, unusual encodings, pages without readable text, and restricted browser pages.",
        },
        {
          index: "03",
          title: "Keyboard and screen-reader paths",
          body: "Review focus order, accessible names, and keyboard flows across the side panel, settings, menus, and dialogs.",
        },
      ],
    },
    ongoing: {
      marker: "Ongoing",
      title: "Ongoing maintenance",
      intro: "This work should not wait for a major release.",
      items: [
        {
          index: "01",
          title: "Provider endpoints and model catalog",
          body: "Track endpoint, protocol, and recommended-model changes without asking users to re-enter unrelated settings.",
        },
        {
          index: "02",
          title: "Readable-text extraction",
          body: "Keep correcting omissions, ordering errors, and noise caused by changing website structures while preserving editable exports.",
        },
        {
          index: "03",
          title: "Skill format compatibility",
          body: "Follow open-format changes while continuing to treat scripts, shell commands, MCP declarations, and platform permissions as non-executable metadata.",
        },
        {
          index: "04",
          title: "Permissions and privacy documentation",
          body: "Update permissions, data-handling explanations, and public documents as Chrome Web Store policies change.",
        },
      ],
    },
    boundaryKicker: "Scope",
    boundaryTitle: "Only scheduled work belongs on this page.",
    boundaryBody:
      "Accounts, cloud sync, subscriptions, and team features are not on this roadmap. If that changes, they will be documented after implementation begins.",
    changelogLink: "Read the 3.0 release notes",
    footerNote: "Ask the current page.",
  },
} as const;

export default function RoadmapPage() {
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
  const phases = [copy.inProgress, copy.next, copy.ongoing];

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
          <a href={sitePath("/changelog/")}>{copy.changelog}</a>
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
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>
            {copy.titleLead}
            <span>{copy.titleAccent}</span>
          </h1>
          <p>{copy.intro}</p>
        </div>
        <aside className={styles.focusCard}>
          <span>{copy.statusLabel}</span>
          <strong>{copy.statusValue}</strong>
          <div aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </aside>
      </section>

      <div className={styles.phases}>
        {phases.map((phase, phaseIndex) => (
          <section
            className={`${styles.phase} ${styles[`phase${phaseIndex + 1}`]}`}
            key={phase.marker}
          >
            <header className={styles.phaseHeading}>
              <span>{phase.marker}</span>
              <h2>{phase.title}</h2>
              <p>{phase.intro}</p>
            </header>
            <div className={styles.phaseGrid}>
              {phase.items.map((item) => (
                <article className={styles.phaseItem} key={item.index}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className={styles.boundary}>
        <div>
          <p className={styles.lightEyebrow}>{copy.boundaryKicker}</p>
          <h2>{copy.boundaryTitle}</h2>
        </div>
        <div>
          <p>{copy.boundaryBody}</p>
          <a href={sitePath("/changelog/")}>{copy.changelogLink}</a>
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
