export interface Profile {
  name: string;
  role: string;
  location: string;
  bio: string;
  email: string;
  availability: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export const profile: Profile = {
  name: '无标题文档',
  role: '全栈工程师与写作者',
  location: '杭州，中国',
  bio: '关注数字产品、文字与日常生活之间的关系。我相信克制的设计，能让复杂的信息变得亲切。',
  email: 'hello@example.com',
  availability: '目前接受 2026 年冬季的合作邀约',
};

export const SITE = {
  name: profile.name,
  description: '一个关于设计、文字与生活的个人空间。',
  locale: 'zh-CN',
  ogLocale: 'zh_CN',
  // 与 styles/tokens.css 中的 --paper 保持一致（meta 标签无法读取 CSS 变量）
  themeColor: '#faf9f6',
  notesPerPage: 10,
} as const;

export const navLinks: NavLink[] = [
  { href: '/', label: '首页' },
  { href: '/notes', label: '文章' },
  { href: '/dashboard', label: '状态' },
  { href: '/elements', label: '元素' },
];

export const footerLinks: NavLink[] = [
  { href: `mailto:${profile.email}`, label: '邮件' },
  { href: '/notes', label: '文章' },
  { href: '/elements', label: '元素规范' },
];
