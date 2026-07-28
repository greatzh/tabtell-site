"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./guide.module.css";

type Language = "zh" | "en";

type GuideImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  shape: "panel" | "wide" | "medium";
};

type GuideChapter = {
  id: string;
  number: string;
  nav: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: Array<{
    title: string;
    body: string;
  }>;
  note?: string;
  images: GuideImage[];
  troubleshooting?: Array<{
    problem: string;
    answer: string;
  }>;
};

type GuideCopy = {
  home: string;
  guide: string;
  privacy: string;
  language: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    start: string;
    badges: string[];
    indexLabel: string;
  };
  contents: string;
  noteLabel: string;
  troubleshootingLabel: string;
  chapters: GuideChapter[];
  footer: {
    title: string;
    body: string;
    home: string;
    privacy: string;
    developer: string;
  };
};

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

const COPY: Record<Language, GuideCopy> = {
  zh: {
    home: "首页",
    guide: "使用指南",
    privacy: "隐私",
    language: "语言",
    hero: {
      eyebrow: "TabTell 3.0 · 使用指南",
      title: "从安装到第一次对话，\n每一步都在这里。",
      intro:
        "先连接自己的模型，再打开一个网页。TabTell 会把当前页面的正文放进侧边栏，之后的提问、总结、翻译和写作都围绕这份原文继续。",
      start: "从安装开始",
      badges: ["约 5 分钟上手", "自带 API Key", "数据保存在浏览器"],
      indexLabel: "八个章节",
    },
    contents: "目录",
    noteLabel: "说明",
    troubleshootingLabel: "常见问题",
    chapters: [
      {
        id: "install",
        number: "01",
        nav: "安装与打开",
        eyebrow: "先把侧边栏打开",
        title: "安装 TabTell，固定到工具栏",
        intro:
          "正式版上线后，可以从 Chrome Web Store 直接安装。发布前的本地测试版也能通过开发者模式载入。",
        steps: [
          {
            title: "从商店安装",
            body:
              "在 Chrome Web Store 打开 TabTell，点击「添加至 Chrome」。审核通过前，商店按钮会保持为准备上线状态。",
          },
          {
            title: "本地载入测试版",
            body:
              "解压发布包，打开 chrome://extensions，开启开发者模式，点击「加载已解压的扩展程序」，选择解压后的 TabTell 文件夹。",
          },
          {
            title: "固定并打开",
            body:
              "点击浏览器工具栏的扩展程序按钮，把 TabTell 固定在工具栏。打开普通网页后点击图标，侧边栏会出现在页面右侧。",
          },
        ],
        note:
          "Chrome 内置页面、扩展商店和部分受保护页面不允许扩展读取正文。请先在普通的 http 或 https 网页上测试。",
        images: [
          {
            src: "/guide/start-zh.png",
            alt: "TabTell 中文侧边栏的初始界面",
            caption: "打开后，当前网页、快捷处理、Skills 和输入框都在同一个侧边栏里。",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "models",
        number: "02",
        nav: "连接模型",
        eyebrow: "API Key 只填一次",
        title: "选择供应商、模型和保存方式",
        intro:
          "TabTell 已经维护常见供应商的接口地址、协议和推荐模型。预设供应商只需要 API Key，也可以保留多个模型供对话时切换。",
        steps: [
          {
            title: "进入模型设置",
            body:
              "点击侧边栏右上角的更多按钮，打开「模型、快捷处理与 Skills」，或者直接点击顶部的连接状态。",
          },
          {
            title: "连接供应商",
            body:
              "找到 OpenAI、DeepSeek、Gemini、Anthropic、千问、Kimi 等供应商，点击连接，再粘贴从供应商控制台取得的 API Key。",
          },
          {
            title: "勾选聊天模型",
            body:
              "在推荐模型列表中多选。只有勾选的模型会出现在侧边栏输入框下方，之后仍可随时调整。",
          },
          {
            title: "选择 Key 的保存方式",
            body:
              "「保存在本机」适合自己的设备；「仅本次会话」会在浏览器会话结束后清除。点击测试连接，成功后再保存。",
          },
        ],
        note:
          "自定义远程接口必须使用 HTTPS；localhost、127.0.0.1 和 [::1] 可用于本机模型。API Key 不会进入配置备份。",
        images: [
          {
            src: "/guide/providers-zh.png",
            alt: "TabTell 中文模型供应商连接窗口",
            caption: "填入 API Key、勾选模型、选择保存方式，然后测试并保存连接。",
            width: 1180,
            height: 900,
            shape: "wide",
          },
        ],
      },
      {
        id: "first-chat",
        number: "03",
        nav: "第一次对话",
        eyebrow: "边生成，边阅读",
        title: "让回答直接出现在原文旁边",
        intro:
          "首次读取网页时，TabTell 会先说明数据处理方式。确认后，它会提取标题、URL 和可读正文，但不会自动把正文发送给模型。",
        steps: [
          {
            title: "直接提问",
            body:
              "在输入框中写下问题并发送。当前网页会作为这段对话的共同上下文，不用再复制粘贴长篇正文。",
          },
          {
            title: "查看流式回答",
            body:
              "兼容的模型会逐字返回内容。标题、列表、引用、代码块、链接和表格会按 Markdown 重新排版。",
          },
          {
            title: "随时停止",
            body:
              "生成期间，发送按钮会变成停止按钮。点击后会终止当前请求，已经显示的部分仍保留在对话中。",
          },
          {
            title: "接着追问",
            body:
              "回答完成后直接输入下一条问题即可。TabTell 会带上同一网页和当前对话，不需要重新选择快捷处理。",
          },
        ],
        images: [
          {
            src: "/guide/streaming-zh.png",
            alt: "TabTell 中文回答正在流式生成",
            caption: "回答生成时可以继续阅读；右下角按钮可停止当前请求。",
            width: 480,
            height: 800,
            shape: "panel",
          },
          {
            src: "/guide/conversation-zh.png",
            alt: "TabTell 中文网页连续对话",
            caption: "Markdown 渲染完成后，可以继续围绕当前网页追问。",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "conversations",
        number: "04",
        nav: "对话与网页",
        eyebrow: "每个网页各自保存",
        title: "新对话保持空白，旧对话仍能找回",
        intro:
          "TabTell 按网页保存原文快照和对话。切换标签页时，侧边栏会跟着切到对应页面；只要侧边栏仍然打开，正在生成的回答不会因为切换网页而停下。",
        steps: [
          {
            title: "新建空白对话",
            body:
              "点击对话卡片右侧的加号。新对话不会继承上一条快捷处理或某个助手身份，只保留当前网页原文。",
          },
          {
            title: "打开历史对话",
            body:
              "点击加号旁的对话记录按钮，重新打开当前网页保存过的会话。旧会话继续使用它开始时保存的原文快照。",
          },
          {
            title: "在不同网页之间切换",
            body:
              "A 网页和 B 网页拥有各自的记录。回到 A 网页后，仍会看到 A 的原文、对话和正在生成或已经完成的回答。",
          },
        ],
        note:
          "如果网页内容已经更新，可以重新读取页面。已有对话仍保留原来的快照，新对话会使用最新提取结果。",
        images: [
          {
            src: "/guide/start-zh.png",
            alt: "TabTell 中文对话入口和新建按钮",
            caption: "对话卡片右侧提供新建与历史入口；底部仍可独立切换模型。",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "quick-actions",
        number: "05",
        nav: "快捷处理与上下文",
        eyebrow: "省掉第一段提示词",
        title: "快捷处理只负责开场",
        intro:
          "快速总结、翻译助手和写稿助手会替你准备第一条请求。任务开始后，它们就退场，后续仍是普通的网页对话。",
        steps: [
          {
            title: "选择快捷处理",
            body:
              "侧边栏默认显示排在最前面的四项。点击任意一项会立即按预设规则处理当前网页，展开「全部」可查看其他项目。",
          },
          {
            title: "管理显示顺序",
            body:
              "在设置的「快捷处理」页面拖动排序。前四项会显示在侧边栏，也可以修改名称、用途说明和首轮提示词。",
          },
          {
            title: "查看上下文占用",
            body:
              "输入框下方会估算网页原文、指令、对话和预留输出占用了多少模型上下文。接近上限时，可新建对话或换用更大上下文模型。",
          },
          {
            title: "切换当前模型",
            body:
              "输入框下方的模型菜单只影响当前对话。供应商设置决定有哪些模型可选，日常切换不用离开侧边栏。",
          },
        ],
        images: [
          {
            src: "/guide/quick-actions-zh.jpg",
            alt: "TabTell 中文快捷处理管理页面",
            caption: "拖动顺序、修改首轮规则，排在最前面的四项会出现在侧边栏。",
            width: 1920,
            height: 1006,
            shape: "wide",
          },
        ],
      },
      {
        id: "source",
        number: "06",
        nav: "原文与 Markdown",
        eyebrow: "原文随时可查",
        title: "展开原文，编辑、复制或下载",
        intro:
          "顶部的当前网页卡片可以展开。你看到的是 TabTell 保存的可读正文，也是模型回答时使用的网页上下文。",
        steps: [
          {
            title: "检查和编辑原文",
            body:
              "展开网页卡片后，可以直接修改提取结果。删除导航、广告或无关段落后，下一次提问会使用编辑后的版本。",
          },
          {
            title: "复制全文",
            body:
              "点击原文工具栏中的「复制」，把当前编辑后的全文放入剪贴板。",
          },
          {
            title: "下载 Markdown",
            body:
              "点击「下载」保存 Markdown 文件。完整对话也能从侧边栏菜单单独下载为 Markdown。",
          },
          {
            title: "返回对话",
            body:
              "原文工具栏右侧保留「返回对话」，不需要收起整个侧边栏或重新打开页面。",
          },
        ],
        note:
          "有些网页会延迟加载正文。内容不完整时，等待页面加载后再点重新读取，或者在原文区手动补充。",
        images: [
          {
            src: "/guide/source-zh.png",
            alt: "TabTell 中文网页原文和复制下载工具栏",
            caption: "原文区提供复制、下载和返回对话；编辑结果会成为后续回答的依据。",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "skills",
        number: "07",
        nav: "Skills",
        eyebrow: "按问题加载能力",
        title: "让 Skill 自动匹配，也可以手动指定",
        intro:
          "快捷处理是一条首轮提示词；Skill 是可以导入和复用的能力包。它能为某一条消息补充指令和文字参考资料。",
        steps: [
          {
            title: "自动模式",
            body:
              "默认模式会根据当前问题、页面标题以及 Skill 的名称和简介，判断是否需要加载一个 Skill。只有允许自动匹配的 Skill 才会参与。",
          },
          {
            title: "手动或关闭",
            body:
              "在输入框的 Skill 菜单中为下一条消息指定一个 Skill，或选择关闭。消息发出后，选项会恢复到自动模式。",
          },
          {
            title: "导入通用格式",
            body:
              "设置页支持导入 ZIP、完整文件夹或单独的 SKILL.md，也能读取兼容的 Agent Skills、Codex、Claude 和 Gemini CLI Extension 结构。",
          },
          {
            title: "先检查第三方 Skill",
            body:
              "第三方 Skill 导入后默认仅手动使用。TabTell 只读取受限的文字指令和参考文件，不会执行脚本、Shell 命令、MCP 声明或平台专属权限。",
          },
        ],
        note:
          "自动匹配可能先把问题、页面标题和候选 Skill 的名称与简介发送给当前模型供应商。完整说明请查看隐私政策。",
        images: [
          {
            src: "/guide/skills-zh.jpg",
            alt: "TabTell 中文 Skill 管理页面",
            caption: "Skill 管理页支持导入文件夹或 Skill 包，并明确标出兼容范围。",
            width: 1920,
            height: 936,
            shape: "wide",
          },
        ],
      },
      {
        id: "data",
        number: "08",
        nav: "备份、删除与排错",
        eyebrow: "换设备之前先导出",
        title: "迁移配置，也能把本地记录清干净",
        intro:
          "设置中的「关于与支持」集中放置备份、删除和隐私入口。所有操作都在当前浏览器中完成。",
        steps: [
          {
            title: "导出配置备份",
            body:
              "备份包含供应商与模型选择、快捷处理、Skills 和界面偏好，不包含 API Key、网页正文或对话。",
          },
          {
            title: "在另一台设备导入",
            body:
              "先检查备份文件，再在新设备上导入并合并。导入后仍需为每个供应商重新填写 API Key。",
          },
          {
            title: "删除网页记录",
            body:
              "「删除全部网页记录」只清除保存的网页与对话；也可以在侧边栏删除当前网页的记录。",
          },
          {
            title: "清除全部本地数据",
            body:
              "「清除全部本地数据」还会删除 API Key、供应商设置、快捷处理、Skills 和界面偏好。确认前请先导出需要保留的配置。",
          },
        ],
        note:
          "备份里的自定义接口地址、快捷处理提示词和 Skill 文字可能包含敏感信息。发送给别人之前，请先打开文件检查。",
        images: [
          {
            src: "/guide/backup-data-zh.jpg",
            alt: "TabTell 中文备份、迁移和本地数据删除设置",
            caption: "备份与删除入口放在同一处，并明确说明哪些内容不会进入备份。",
            width: 675,
            height: 881,
            shape: "medium",
          },
        ],
        troubleshooting: [
          {
            problem: "侧边栏没有读到正文",
            answer:
              "确认当前是普通网页，重新载入页面后再点读取。如果曾拒绝权限，请在 Chrome 的扩展程序详情中调整「网站访问权限」。",
          },
          {
            problem: "模型连接测试失败",
            answer:
              "检查 API Key、账户余额、所选模型和供应商状态。自定义接口还要核对 URL、协议与模型名称。",
          },
          {
            problem: "上下文接近上限",
            answer:
              "删去无关原文、新建对话，或切换到上下文更大的模型。旧对话不会因此被删除。",
          },
          {
            problem: "回答没有逐字显示",
            answer:
              "部分接口不支持流式输出，TabTell 会在请求完成后一次性显示完整回答。",
          },
        ],
      },
    ],
    footer: {
      title: "准备好后，打开一个网页试试。",
      body:
        "先连接模型，再从快速总结开始。完成第一条任务后，直接追问就是一段普通的网页对话。",
      home: "返回首页",
      privacy: "查看隐私政策",
      developer: "由 imzh 开发",
    },
  },
  en: {
    home: "Home",
    guide: "Guide",
    privacy: "Privacy",
    language: "Language",
    hero: {
      eyebrow: "TabTell 3.0 · User guide",
      title: "From installation to\nyour first conversation.",
      intro:
        "Connect your own model, open a webpage, and keep the source beside the conversation. Questions, summaries, translations, and drafts all stay grounded in that page.",
      start: "Start with installation",
      badges: ["About 5 minutes", "Bring your own API key", "Browser-local data"],
      indexLabel: "Eight chapters",
    },
    contents: "Contents",
    noteLabel: "Note",
    troubleshootingLabel: "Troubleshooting",
    chapters: [
      {
        id: "install",
        number: "01",
        nav: "Install and open",
        eyebrow: "Open the side panel",
        title: "Install TabTell and pin it to the toolbar",
        intro:
          "Once the public listing is live, install TabTell directly from the Chrome Web Store. A local test build can also be loaded in developer mode.",
        steps: [
          {
            title: "Install from the store",
            body:
              "Open the TabTell listing in the Chrome Web Store and choose Add to Chrome. Until review is complete, the store action remains marked as coming soon.",
          },
          {
            title: "Load a local test build",
            body:
              "Extract the release package, open chrome://extensions, enable Developer mode, choose Load unpacked, and select the extracted TabTell folder.",
          },
          {
            title: "Pin and open it",
            body:
              "Open Chrome’s extension menu, pin TabTell, visit a normal webpage, and click the TabTell icon. The side panel opens beside the page.",
          },
        ],
        note:
          "Chrome internal pages, the extension store, and some protected pages cannot be read by extensions. Start with a normal http or https webpage.",
        images: [
          {
            src: "/guide/start-en.png",
            alt: "The initial TabTell side-panel screen in English",
            caption:
              "The current page, quick actions, Skills, model selector, and composer share one side panel.",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "models",
        number: "02",
        nav: "Connect a model",
        eyebrow: "Enter the API key once",
        title: "Choose a provider, models, and storage mode",
        intro:
          "TabTell maintains endpoints, protocols, and recommended models for common providers. Preset providers need only an API key, and you can keep several models available in chat.",
        steps: [
          {
            title: "Open model settings",
            body:
              "Use the overflow menu in the side panel and open Model providers, quick actions & Skills, or click the connection status in the header.",
          },
          {
            title: "Connect a provider",
            body:
              "Choose OpenAI, DeepSeek, Gemini, Anthropic, Qwen, Kimi, or another preset, then paste the API key from that provider’s console.",
          },
          {
            title: "Select chat models",
            body:
              "Select one or more recommended models. Only selected models appear in the side-panel composer, and the list can be changed later.",
          },
          {
            title: "Choose key storage",
            body:
              "Store locally on a trusted personal device, or keep the key for the current browser session only. Test the connection before saving.",
          },
        ],
        note:
          "Custom remote endpoints must use HTTPS. localhost, 127.0.0.1, and [::1] are available for local models. API keys are never included in configuration backups.",
        images: [
          {
            src: "/guide/providers-en.png",
            alt: "The TabTell provider connection dialog in English",
            caption:
              "Enter an API key, select models, choose storage, then test and save the connection.",
            width: 1180,
            height: 900,
            shape: "wide",
          },
        ],
      },
      {
        id: "first-chat",
        number: "03",
        nav: "First conversation",
        eyebrow: "Read while it generates",
        title: "Put the answer next to the source",
        intro:
          "Before reading the first page, TabTell explains its data handling and waits for consent. It extracts the title, URL, and readable text without automatically sending that text to a model.",
        steps: [
          {
            title: "Ask directly",
            body:
              "Write a question in the composer and send it. The current webpage becomes shared context for the conversation, so there is no long copy-and-paste step.",
          },
          {
            title: "Read the streamed answer",
            body:
              "Compatible providers return text as it is generated. Headings, lists, quotes, code, links, and tables are rendered as Markdown.",
          },
          {
            title: "Stop when needed",
            body:
              "While a request is running, the send button becomes a stop button. Stopping keeps the text that has already appeared in the conversation.",
          },
          {
            title: "Follow up",
            body:
              "Send the next question normally. TabTell keeps the same source and conversation without asking you to choose a quick action again.",
          },
        ],
        images: [
          {
            src: "/guide/streaming-en.png",
            alt: "An English TabTell answer streaming in the side panel",
            caption:
              "Read as the response arrives, or use the lower-right button to stop the request.",
            width: 480,
            height: 800,
            shape: "panel",
          },
          {
            src: "/guide/conversation-en.png",
            alt: "A continued English webpage conversation in TabTell",
            caption:
              "Once Markdown rendering is complete, keep asking about the same page.",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "conversations",
        number: "04",
        nav: "Chats and pages",
        eyebrow: "A workspace for every page",
        title: "Start blank and keep earlier conversations",
        intro:
          "TabTell saves source snapshots and chats by page. When you switch tabs, the side panel switches workspaces too. A response running on page A continues in the background.",
        steps: [
          {
            title: "Start a blank conversation",
            body:
              "Use the plus button on the conversation card. A new chat does not inherit the last quick action or an assistant identity; it starts with the current page only.",
          },
          {
            title: "Open chat history",
            body:
              "Use the history button beside the plus button to reopen conversations saved for the current page. An older chat keeps the source snapshot it started with.",
          },
          {
            title: "Move between pages",
            body:
              "Page A and page B keep separate records. Return to page A to see its source, chats, and the partial or completed response again.",
          },
        ],
        note:
          "If a webpage has changed, read it again. Existing conversations retain their old snapshot, while a new conversation uses the latest extraction.",
        images: [
          {
            src: "/guide/start-en.png",
            alt: "New-chat and history controls in the English TabTell side panel",
            caption:
              "The conversation card holds new-chat and history controls; the model selector remains in the composer.",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "quick-actions",
        number: "05",
        nav: "Quick actions and context",
        eyebrow: "Skip the first block of prompting",
        title: "Quick actions handle the opening turn only",
        intro:
          "Quick Summary, Translation Assistant, and other quick actions prepare the first request. After that turn, the conversation is open-ended again.",
        steps: [
          {
            title: "Choose a quick action",
            body:
              "The first four actions appear in the side panel. Choose one to process the current page immediately, or open All to see the rest.",
          },
          {
            title: "Manage the order",
            body:
              "Drag actions into order in settings. Edit the name, description, first-turn rules, and task; the first four become the side-panel shortcuts.",
          },
          {
            title: "Watch context usage",
            body:
              "The line below the composer estimates how much of the model window is used by the source, instructions, conversation, and reserved output.",
          },
          {
            title: "Switch the current model",
            body:
              "Use the model menu under the composer for the current conversation. Provider settings control which models are available here.",
          },
        ],
        images: [
          {
            src: "/guide/start-en.png",
            alt: "Quick actions and the model selector in the English TabTell side panel",
            caption:
              "Quick actions start a task; the composer below remains available for ordinary follow-up questions.",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "source",
        number: "06",
        nav: "Source and Markdown",
        eyebrow: "Keep the source visible",
        title: "Expand, edit, copy, or download the page text",
        intro:
          "Expand the current-page card at the top of the panel to inspect the readable text saved by TabTell. That is the source used in later model requests.",
        steps: [
          {
            title: "Inspect and edit",
            body:
              "Remove navigation, ads, or irrelevant sections directly in the source view. The next request uses the edited version.",
          },
          {
            title: "Copy the full source",
            body:
              "Use Copy in the source toolbar to place the current edited text on the clipboard.",
          },
          {
            title: "Download Markdown",
            body:
              "Use Download to save the source as Markdown. The complete conversation can also be downloaded separately from the side-panel menu.",
          },
          {
            title: "Return to chat",
            body:
              "The right side of the source toolbar keeps a Return to chat action, so there is no need to close the side panel.",
          },
        ],
        note:
          "Some pages load their article text late. If content is missing, wait for the page to finish, read it again, or add the missing text in the source editor.",
        images: [
          {
            src: "/guide/source-en.png",
            alt: "The English TabTell source view with copy and download actions",
            caption:
              "Copy, download, and Return to chat stay next to the editable source.",
            width: 480,
            height: 800,
            shape: "panel",
          },
        ],
      },
      {
        id: "skills",
        number: "07",
        nav: "Skills",
        eyebrow: "Load capabilities per question",
        title: "Let a Skill match automatically—or choose one yourself",
        intro:
          "A quick action is a starter prompt. A Skill is an importable capability package that can add instructions and readable reference material to one message.",
        steps: [
          {
            title: "Automatic mode",
            body:
              "TabTell can compare the current question and page title with Skill names and descriptions, then load at most one Skill that is allowed to match automatically.",
          },
          {
            title: "Manual or off",
            body:
              "Use the Skill menu in the composer to select one for the next message or turn Skills off. The selector returns to automatic mode after sending.",
          },
          {
            title: "Import portable formats",
            body:
              "Settings accept a ZIP, a complete folder, or a standalone SKILL.md, including compatible Agent Skills, Codex, Claude, and Gemini CLI Extension layouts.",
          },
          {
            title: "Review third-party Skills",
            body:
              "Imported third-party Skills start as manual-only. TabTell reads bounded text instructions and resources, but never executes scripts, shell commands, MCP declarations, or platform permissions.",
          },
        ],
        note:
          "Automatic matching may send the question, page title, and candidate Skill names and descriptions to the current provider first. See the privacy policy for details.",
        images: [
          {
            src: "/guide/skills-zh.jpg",
            alt: "The TabTell Skill management screen",
            caption:
              "The layout follows the selected interface language; this captured Chinese screen shows folder and Skill-package import controls.",
            width: 1920,
            height: 936,
            shape: "wide",
          },
        ],
      },
      {
        id: "data",
        number: "08",
        nav: "Backup, deletion, and fixes",
        eyebrow: "Export before changing devices",
        title: "Move settings or clear local records",
        intro:
          "Backup, deletion, and privacy controls live under About & support. Every action works on data stored in the current browser.",
        steps: [
          {
            title: "Export a configuration backup",
            body:
              "The backup includes provider and model selections, quick actions, Skills, and interface preferences. It excludes API keys, webpage text, and conversations.",
          },
          {
            title: "Import on another device",
            body:
              "Review the backup file, then import and merge it on the new device. Enter each provider API key again after importing.",
          },
          {
            title: "Delete webpage records",
            body:
              "Delete all webpage data removes saved pages and chats only. The side panel can also delete the current page record.",
          },
          {
            title: "Clear all local data",
            body:
              "Clear all local data also removes API keys, provider settings, quick actions, Skills, and preferences. Export anything you need first.",
          },
        ],
        note:
          "Custom endpoints, quick-action prompts, and Skill text inside a backup may contain sensitive information. Open and review the file before sharing it.",
        images: [
          {
            src: "/guide/backup-data-zh.jpg",
            alt: "TabTell backup, migration, and local data deletion controls",
            caption:
              "The layout follows the selected interface language; this captured screen shows backup and deletion controls together.",
            width: 675,
            height: 881,
            shape: "medium",
          },
        ],
        troubleshooting: [
          {
            problem: "The side panel finds no article text",
            answer:
              "Use a normal webpage, reload it, and read again. If site access was declined earlier, grant it again from extension settings.",
          },
          {
            problem: "The provider connection test fails",
            answer:
              "Check the API key, account balance, selected model, and provider status. For a custom endpoint, also verify its URL, protocol, and model name.",
          },
          {
            problem: "Context usage is near the limit",
            answer:
              "Remove irrelevant source text, start a new conversation, or switch to a model with a larger context window. Older chats remain saved.",
          },
          {
            problem: "The answer does not stream",
            answer:
              "Some endpoints do not support streaming. TabTell falls back to showing the complete response after the request finishes.",
          },
        ],
      },
    ],
    footer: {
      title: "When ready, open a page and try it.",
      body:
        "Connect a model and begin with Quick Summary. After that first task, keep asking questions as a normal webpage conversation.",
      home: "Back to home",
      privacy: "Read the privacy policy",
      developer: "Built by imzh",
    },
  },
};

export default function GuidePage() {
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
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [language]);

  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.brand} href={sitePath("/")} aria-label="TabTell">
          <Image
            src={sitePath("/tabtell-icon.png")}
            width={40}
            height={40}
            alt=""
            priority
          />
          <span>
            <strong>TabTell</strong>
            <small>{copy.guide}</small>
          </span>
        </a>

        <nav className={styles.topNav} aria-label={copy.guide}>
          <a href={sitePath("/")}>{copy.home}</a>
          <a href={sitePath("/privacy/")}>{copy.privacy}</a>
          <div className={styles.languageSwitch} aria-label={copy.language}>
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
          <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className={styles.heroIntro}>{copy.hero.intro}</p>
          <a className={styles.primaryLink} href="#install">
            {copy.hero.start}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.manualMark} aria-hidden="true">
          <span>01</span>
          <i />
          <span>08</span>
          <small>{copy.hero.indexLabel}</small>
        </div>
      </section>

      <div className={styles.badgeStrip}>
        <div>
          {copy.hero.badges.map((badge, index) => (
            <p key={badge}>
              <span>0{index + 1}</span>
              {badge}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.guideShell}>
        <aside className={styles.contents}>
          <p>{copy.contents}</p>
          <nav aria-label={copy.contents}>
            {copy.chapters.map((chapter) => (
              <a href={`#${chapter.id}`} key={chapter.id}>
                <span>{chapter.number}</span>
                {chapter.nav}
              </a>
            ))}
          </nav>
        </aside>

        <div className={styles.chapters}>
          {copy.chapters.map((chapter) => (
            <section
              className={styles.chapter}
              id={chapter.id}
              key={chapter.id}
            >
              <header className={styles.chapterHeader}>
                <span className={styles.chapterNumber}>{chapter.number}</span>
                <div>
                  <p className={styles.chapterEyebrow}>{chapter.eyebrow}</p>
                  <h2>{chapter.title}</h2>
                  <p className={styles.chapterIntro}>{chapter.intro}</p>
                </div>
              </header>

              <div className={styles.steps}>
                {chapter.steps.map((step, index) => (
                  <article className={styles.step} key={step.title}>
                    <span>{chapter.number}.{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                ))}
              </div>

              {chapter.note ? (
                <aside className={styles.note}>
                  <span>{copy.noteLabel}</span>
                  <p>{chapter.note}</p>
                </aside>
              ) : null}

              <div
                className={`${styles.screenshots} ${
                  chapter.images.length > 1 ? styles.screenshotPair : ""
                }`}
              >
                {chapter.images.map((image) => (
                  <figure
                    className={`${styles.screenshot} ${
                      styles[
                        image.shape as keyof Pick<
                          typeof styles,
                          "panel" | "wide" | "medium"
                        >
                      ]
                    }`}
                    key={image.src}
                  >
                    <div>
                      <Image
                        src={sitePath(image.src)}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        sizes={
                          image.shape === "panel"
                            ? "(max-width: 800px) 86vw, 390px"
                            : "(max-width: 1100px) 92vw, 880px"
                        }
                        unoptimized
                      />
                    </div>
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>

              {chapter.troubleshooting ? (
                <div className={styles.troubleshooting}>
                  <p className={styles.chapterEyebrow}>
                    {copy.troubleshootingLabel}
                  </p>
                  {chapter.troubleshooting.map((item) => (
                    <details key={item.problem}>
                      <summary>{item.problem}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <section className={styles.closing}>
        <div>
          <p className={styles.eyebrow}>TabTell</p>
          <h2>{copy.footer.title}</h2>
          <p>{copy.footer.body}</p>
        </div>
        <div className={styles.closingLinks}>
          <a href={sitePath("/")}>{copy.footer.home}</a>
          <a href={sitePath("/privacy/")}>{copy.footer.privacy}</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href={sitePath("/")}>
          <Image
            src={sitePath("/tabtell-icon.png")}
            width={30}
            height={30}
            alt=""
          />
          <span>
            <strong>TabTell</strong>
          </span>
        </a>
        <a href="https://imzh.me" target="_blank" rel="noreferrer">
          {copy.footer.developer}
        </a>
      </footer>
    </main>
  );
}
