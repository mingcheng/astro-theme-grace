# astro-theme-grace — Astro 个人网站模板

一个以宣纸白底、绛红点缀、衬线字体和克制网格为视觉基础的简体中文个人网站模板，设计风格源自 [gracecode.com](https://www.gracecode.com/)。包含主页、文章列表、动态文章详情、运行状态仪表盘与元素规范页面。

示例内容中的作者「林知夏」仅为占位，请在 `src/data/site.ts` 中替换为你自己的信息。

## 从模板创建项目

本项目既是 GitHub Template，也是可供 Astro CLI 直接使用的主题模板，无需发布到 npm。

### GitHub Template

点击仓库页面的 **Use this template → Create a new repository**，然后克隆新仓库；也可以使用 GitHub CLI：

```bash
gh repo create my-site --template mingcheng/astro-theme-grace --public --clone
cd my-site
```

后续按下方开发步骤安装依赖。模板会复制网站源码、示例内容和工作流，不会继承原仓库的提交历史。

### Astro CLI（Node.js / pnpm）

安装 [mise](https://mise.jdx.dev/getting-started.html) 后，在目标项目的父目录执行：

```bash
mise install node@24.21.0 pnpm@10.28.0
mise exec node@24.21.0 pnpm@10.28.0 -- pnpm create astro@latest my-site --template mingcheng/astro-theme-grace --no-install
cd my-site
mise trust
mise install node pnpm
mise exec -- pnpm install
mise exec -- pnpm dev
```

已具备兼容 Node.js / pnpm 的环境可以直接运行 `pnpm create astro@latest my-site --template mingcheng/astro-theme-grace`，由向导安装依赖。Astro 支持 Node.js 22.12.0 或更新的受支持偶数版本；项目通过 mise 固定 Node.js 24 与 pnpm 10。

这是一份可独立修改的网站源码模板，不是通过 `astro add` 安装的 integration。Astro CLI 默认从仓库 `main` 分支下载，需先将模板配置和锁文件推送到该分支，远程创建命令才会使用新配置。

## 开发

项目统一使用 Node.js / pnpm，工具链由 [mise.toml](./mise.toml) 固定版本，CI 也使用相同配置：

```bash
mise trust
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm dev
```

若已在 shell 中[激活 mise](https://mise.jdx.dev/getting-started.html#activate-mise)，可省略 `mise exec --`：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

依赖与命令统一声明在 [package.json](./package.json)，[pnpm-lock.yaml](./pnpm-lock.yaml) 锁定依赖版本。使用 `pnpm <命令>` 运行 `dev`、`check`、`build`、`preview`、`test` 和 `test:watch`；`build` 会先运行 `astro check`，类型错误会阻止构建。

### 更新依赖

通过 `pnpm add` / `pnpm remove` 管理依赖，或修改 [package.json](./package.json) 后更新锁文件：

```bash
pnpm install
```

将 [package.json](./package.json) 与 [pnpm-lock.yaml](./pnpm-lock.yaml) 一并提交。CI 使用 `pnpm install --frozen-lockfile` 校验锁文件。

## 质量检查

```bash
pnpm test
pnpm check
pnpm build
```

[CI 与部署工作流](./.github/workflows/deploy.yml) 统一验证依赖安装、测试与构建；Pull Request 不执行部署。

## 目录结构

```text
src/
├── content.config.ts     # 内容集合定义与 frontmatter 校验
├── content/notes/        # 文章（Markdown），文件名即 URL
├── components/           # 按用途分组：layout / ui / forms / feedback / navigation / content / data / styleguide
├── data/                 # 站点配置（site.ts）、仪表盘示例数据、图标与元素规范示例数据
├── layouts/BaseLayout.astro
├── lib/                  # 与框架无关的工具函数（日期、分页、状态、文章查询、代码块标题栏），附单元测试
├── pages/                # 路由：/、/notes、/notes/[slug]、/dashboard、/elements
├── scripts/              # 仅有的客户端脚本：代码块复制按钮（copy-code.ts）
└── styles/               # tokens / base / utilities / controls / prose / code，由 global.css 统一引入
```

## 写一篇文章

在 `src/content/notes/` 新建 `kebab-case` 命名的 Markdown 文件，例如 `my-first-note.md`，访问地址即 `/notes/my-first-note`（也可以用 frontmatter 的 `slug` 指定地址，但不能是纯数字，以免与 `/notes/2` 等分页地址冲突）：

````markdown
---
title: 文章标题
excerpt: 一句不少于十个字的摘要，用于列表与页面描述。 # 可选
category: 设计 # 思考 | 设计 | 生活 | 未分类
publishedAt: 2026-10-01
featured: false # 可选，为 true 时出现在首页“编辑推荐”
draft: false # 可选，为 true 时只在 dev 模式中显示，不会被构建发布
---

## 第一节小标题

正文段落……

> 引用会以绛红色的大字呈现。

行内公式 $E = mc^2$ 与块级公式：

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

```ts title="src/hello.ts"
console.log('代码块会被高亮，并带有复制按钮');
```
````

frontmatter 会在 `pnpm check` / `pnpm build` 时按 `src/content.config.ts` 的 schema 校验。二级标题会自动编号。`$...$` / `$$...$$` 由 [remark-math](https://github.com/remarkjs/remark-math) 与 [KaTeX](https://katex.org/) 渲染，配置见 `astro.config.mjs`。

围栏代码块由 Astro 内置的 [Shiki](https://shiki.style/) 在构建时高亮（`css-variables` 主题，配色为 `tokens.css` 中的 `--astro-code-*` 变量），`src/lib/code-block.ts` 中的转换器为其加上标题栏：默认显示语言，围栏上写 `title="文件名"` 时显示文件名。标题栏右侧的「复制」按钮由约 1 KB 的 `src/scripts/copy-code.ts` 驱动，仅在浏览器支持剪贴板 API 时显示，禁用脚本时代码块照常可读。

## 配置

- 站点名称、简介、导航与每页文章数：`src/data/site.ts`
- 仪表盘示例数据：`src/data/dashboard.ts`
- 色彩、字体等设计变量：`src/styles/tokens.css`
- 构建时通过 `SITE_URL` 设置完整站点地址（包含项目路径），用于 `site`、`base`、canonical 链接与 sitemap；默认 `https://mingcheng.github.io/astro-theme-grace/`。站内链接与静态资源路径会自动加上 `base` 前缀。

从模板创建项目后，请替换作者信息、站点配置、示例文章与图片，并将 `SITE_URL` 设置为自己的站点地址；非 GitHub Pages 部署尤其需要显式配置，避免 canonical / sitemap 指向模板演示站。`.env` 及 `.env.*` 默认不会提交，切勿将 GitHub token 等凭据写入源码或模板。

文章归档默认每页展示 10 篇，第一页为 `/notes`，后续页面由 Astro 的 `paginate()` 自动生成 `/notes/2` 等静态路由。

仪表盘组件包括指标卡、状态标签、进度条、环形图、趋势图和响应式数据表格；内容组件包括标题、代码块与多级目录。

`/elements` 页面按类别展示全部可复用组件，除代码块复制按钮外均为零 JavaScript 的静态实现：

- 正文元素：行内强调、高亮、键盘按键、列表、分隔线、引用（`Quote`）、描述列表（`DescriptionList`）、KaTeX 数学公式（行内 / 块级）与带复制按钮的高亮代码块
- 图片：图片头像（`Avatar`，含作者署名与叠放头像组）、正文插图（`Figure`，支持图注、比例裁切、收窄居中与图文环绕）以及 Markdown 插图样式
- 基础元素：标签（`Pill`）、按钮（`.button` / `.button.quiet`）、头像（`Avatar`）、提示气泡（`Tooltip`）、下拉菜单（`Dropdown`）
- 表单控件：`TextField`（单行 / 多行）、`SelectField`、`RadioGroup`、`Choice`（复选框 / 单选 / 开关）与通用 `Field` 包装
- 反馈提示：`Alert`、`EmptyState`、`Skeleton` 加载占位与基于原生 popover 的 `Dialog`
- 导航：`Breadcrumb`、`Tabs`、`Steps` 与 `Pagination`
- 内容卡片：`NoteCard`、`Card`、`Accordion` 折叠面板与 `Timeline` 时间线

`Heading.astro` 统一眉题、标题与说明文字的排版，语义层级（`level`）与视觉尺寸（`size`）可分别设置。`Icon.astro` 提供一套本地细线图标，可通过类型安全的名称、尺寸和无障碍标签复用。

## 部署到 GitHub Pages

仓库自带工作流 `.github/workflows/deploy.yml`：推送到 `main` 或手动触发时，会通过 mise 安装 Node.js / pnpm、运行 `pnpm install --frozen-lockfile` 校验锁文件、执行 `pnpm test` 与 `pnpm build`（含 `astro check`），并把 `dist` 发布到 GitHub Pages；Pull Request 只做测试与构建，不发布。

1. 新模板仓库不会继承 Pages 设置。在首次部署前，在仓库 Settings → Pages 中，将 Source 设为 **GitHub Actions**；不使用 Pages 时，可禁用此部署工作流。
2. 默认使用 GitHub Pages 返回的完整地址，包括仓库路径（如 `https://mingcheng.github.io/astro-theme-grace/`），可直接部署到项目页面。如需使用自定义域名，在 Settings → Secrets and variables → Actions → Variables 中设置 `SITE_URL` 为完整地址（如 `https://www.example.com/`）。

本地开发默认使用项目路径 `http://localhost:4321/astro-theme-grace/`；若需要在域名根路径下开发或构建，可设置 `SITE_URL=https://example.com/`。

```bash
SITE_URL=https://example.com/ pnpm build
```

## 许可

Copyright 2026 mingcheng. 本项目采用 [Apache License 2.0](./LICENSE)，允许依照许可证使用、修改与分发。再分发时请保留许可证及适用的版权与归属声明，修改的文件应注明已作更改。第三方依赖与素材仍受各自的许可证约束。
