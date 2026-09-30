# astro-theme-grace — Astro 个人网站模板

一个以宣纸白底、绛红点缀、衬线字体和克制网格为视觉基础的简体中文个人网站模板，设计风格源自 [gracecode.com](https://www.gracecode.com/)。包含主页、文章列表、动态文章详情、运行状态仪表盘与元素规范页面。

示例内容中的作者「林知夏」仅为占位，请在 `src/data/site.ts` 中替换为你自己的信息。

## 开发

```bash
npm install
npm run dev
```

## 质量检查

```bash
npm test
npm run check
npm run build
```

## 目录结构

```text
src/
├── content.config.ts     # 内容集合定义与 frontmatter 校验
├── content/notes/        # 文章（Markdown），文件名即 URL
├── components/           # 按用途分组：layout / ui / forms / feedback / navigation / content / data / styleguide
├── data/                 # 站点配置（site.ts）、仪表盘示例数据、图标与元素规范示例数据
├── layouts/BaseLayout.astro
├── lib/                  # 与框架无关的工具函数（日期、分页、状态、文章查询），附单元测试
├── pages/                # 路由：/、/notes、/notes/[slug]、/dashboard、/elements
└── styles/               # tokens / base / utilities / controls / prose，由 global.css 统一引入
```

## 写一篇文章

在 `src/content/notes/` 新建 `kebab-case` 命名的 Markdown 文件，例如 `my-first-note.md`，访问地址即 `/notes/my-first-note`：

```markdown
---
title: 文章标题
excerpt: 一句不少于十个字的摘要，用于列表与页面描述。
category: 设计 # 思考 | 设计 | 生活
publishedAt: 2026-10-01
readingMinutes: 5
featured: false # 可选，为 true 时出现在首页“编辑推荐”
---

## 第一节小标题

正文段落……

> 引用会以绛红色的大字呈现。
```

frontmatter 会在 `npm run check` / `npm run build` 时按 `src/content.config.ts` 的 schema 校验。二级标题会自动编号。

## 配置

- 站点名称、简介、导航与每页文章数：`src/data/site.ts`
- 仪表盘示例数据：`src/data/dashboard.ts`
- 色彩、字体等设计变量：`src/styles/tokens.css`
- 构建时通过 `SITE_URL` 设置完整站点地址（包含项目路径），用于 `site`、`base`、canonical 链接与 sitemap；默认 `https://mingcheng.github.io/astro-theme-grace/`。站内链接与静态资源路径会自动加上 `base` 前缀。

文章归档默认每页展示 10 篇，第一页为 `/notes`，后续页面由 Astro 的 `paginate()` 自动生成 `/notes/2` 等静态路由。

仪表盘组件包括指标卡、状态标签、进度条、环形图、趋势图和响应式数据表格；内容组件包括标题、代码块与多级目录。

`/elements` 页面按类别展示全部可复用组件，均为零 JavaScript 的静态实现：

- 正文元素：行内强调、高亮、键盘按键、列表、分隔线、引用（`Quote`）与描述列表（`DescriptionList`）
- 基础元素：标签（`Pill`）、按钮（`.button` / `.button.quiet`）、头像（`Avatar`）、提示气泡（`Tooltip`）、下拉菜单（`Dropdown`）
- 表单控件：`TextField`（单行 / 多行）、`SelectField`、`RadioGroup`、`Choice`（复选框 / 单选 / 开关）与通用 `Field` 包装
- 反馈提示：`Alert`、`EmptyState`、`Skeleton` 加载占位与基于原生 popover 的 `Dialog`
- 导航：`Breadcrumb`、`Tabs`、`Steps` 与 `Pagination`
- 内容卡片：`NoteCard`、`Card`、`Accordion` 折叠面板与 `Timeline` 时间线

`Heading.astro` 统一眉题、标题与说明文字的排版，语义层级（`level`）与视觉尺寸（`size`）可分别设置。`Icon.astro` 提供一套本地细线图标，可通过类型安全的名称、尺寸和无障碍标签复用。

## 部署到 GitHub Pages

仓库自带工作流 `.github/workflows/deploy.yml`：推送到 `main` 或手动触发时，会通过 mise 安装 Node 与 pnpm，依次运行测试、`pnpm build`（含 `astro check`），并把 `dist` 发布到 GitHub Pages；Pull Request 只做测试与构建，不发布。

1. 在仓库 Settings → Pages 中，将 Source 设为 **GitHub Actions**。
2. 默认使用 GitHub Pages 返回的完整地址，包括仓库路径（如 `https://mingcheng.github.io/astro-theme-grace/`），可直接部署到项目页面。如需使用自定义域名，在 Settings → Secrets and variables → Actions → Variables 中设置 `SITE_URL` 为完整地址（如 `https://www.example.com/`）。

本地开发默认使用项目路径 `http://localhost:4321/astro-theme-grace/`；若需要在域名根路径下开发或构建，可设置 `SITE_URL=https://example.com/`。
