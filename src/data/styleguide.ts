import type { IconName } from '@/data/icons';
import type { StatusTone } from '@/lib/status';

/** 元素规范页的章节顺序；编号与目录均由此生成。 */
export const styleguideSections = [
  { id: 'colors', label: '颜色' },
  { id: 'type', label: '中文排版' },
  { id: 'headings', label: '标题元素' },
  { id: 'prose', label: '正文元素' },
  { id: 'images', label: '图片' },
  { id: 'components', label: '基础元素' },
  { id: 'forms', label: '表单控件' },
  { id: 'feedback', label: '反馈提示' },
  { id: 'navigation', label: '导航' },
  { id: 'cards', label: '内容卡片' },
  { id: 'data-display', label: '数据展示' },
  { id: 'content-tools', label: '内容工具' },
  { id: 'icons', label: '细线图标' },
] as const;

export type StyleguideSectionId = (typeof styleguideSections)[number]['id'];

/** 与 styles/tokens.css 对应，仅用于展示色值。 */
export const colorTokens = [
  { name: '宣纸', token: '--paper', value: '#FAF9F6' },
  { name: '素绢', token: '--paper-deep', value: '#F2EFEA' },
  { name: '墨色', token: '--ink', value: '#1A1817' },
  { name: '淡墨', token: '--muted', value: '#6B6561' },
  { name: '界线', token: '--line', value: '#DCD6CF' },
  { name: '描线', token: '--line-strong', value: '#B8AFA6' },
  { name: '绛红', token: '--accent', value: '#880000' },
  { name: '深绛', token: '--accent-dark', value: '#5E0B0B' },
];

export const headingScale = [
  { size: 'display', note: 'display · H1 默认 · 40px', title: '清醒地创造' },
  { size: 'section', note: 'section · H2 默认 · 32px', title: '好的设计从理解开始' },
  { size: 'title', note: 'title · H3 默认 · 28px', title: '为中文阅读留出呼吸' },
  { size: 'subtitle', note: 'subtitle · H4 默认 · 24px', title: '节奏、行长与字重' },
  { size: 'label', note: 'label · H5–H6 默认 · 16px', title: '附注与小节标题' },
] as const;

/** 图片示例共用的素材，位于 public/images。 */
export const sampleImage = {
  src: '/images/avatar.jpeg',
  alt: '黑色背景上，白色小怪物双手捧着一杯冒着热气的咖啡',
  width: 460,
  height: 460,
};

export const avatarGroup = [
  { name: '林知夏', src: sampleImage.src },
  { name: '周予安' },
  { name: 'Ada Lovelace' },
  { name: '陈默', src: sampleImage.src },
];

export const dropdownItems: { label: string; href: string; icon: IconName }[] = [
  { label: '编辑资料', href: '#components', icon: 'settings' },
  { label: '发送邮件', href: '#components', icon: 'mail' },
  { label: '查看日程', href: '#components', icon: 'calendar' },
];

export const regionOptions = [
  { value: 'shanghai', label: '华东 · 上海' },
  { value: 'beijing', label: '华北 · 北京' },
  { value: 'guangzhou', label: '华南 · 广州' },
  { value: 'hongkong', label: '亚太 · 香港', disabled: true },
];

export const collaborationOptions = [
  { value: 'design', label: '产品设计', description: '界面与交互' },
  { value: 'writing', label: '内容写作', description: '文章与文案' },
  { value: 'consulting', label: '咨询', description: '暂不接受', disabled: true },
];

export const faqItems = [
  { title: '模板是否依赖客户端脚本？', content: '不依赖。折叠面板、下拉菜单与对话框分别基于 details 与 popover 等原生能力实现，保持零 JavaScript。' },
  { title: '如何调整全站配色？', content: '所有颜色都定义在 src/styles/tokens.css 的自定义属性中，修改变量即可同步影响全部组件。' },
  { title: '可以直接用于正式项目吗？', content: '可以。组件均为静态渲染，替换示例数据与文案即可发布。' },
];

export const timelineItems: { time: string; title: string; description?: string; tone?: StatusTone }[] = [
  { time: '2026.09', title: '发布 v1.2 元素规范', description: '补充表单、反馈、导航与内容组件。', tone: 'healthy' },
  { time: '2026.08', title: '调整品牌配色', description: '以宣纸与绛红为基础重新校准全站色彩。' },
  { time: '2026.06', title: '上线运行状态仪表盘', tone: 'warning' },
  { time: '2026.03', title: '项目启动' },
];

export const signupSteps = [
  { title: '填写资料', description: '基础联系方式' },
  { title: '选择方案', description: '确认合作类型' },
  { title: '完成提交', description: '等待回复' },
];

export const nodeTable = {
  columns: [
    { key: 'host', label: '节点' },
    { key: 'status', label: '状态' },
    { key: 'cpu', label: 'CPU', align: 'right' as const },
    { key: 'latency', label: '延迟', align: 'right' as const },
  ],
  rows: [
    { host: 'edge-shanghai-01', status: '正常', cpu: '34%', latency: '18 ms' },
    { host: 'api-beijing-02', status: '关注', cpu: '78%', latency: '42 ms' },
    { host: 'backup-hongkong-01', status: '故障', cpu: '92%', latency: '136 ms' },
  ],
};

export const exampleCode = `const service = {
  name: 'edge-shanghai-01',
  status: 'healthy',
  latency: 18,
};

if (service.latency > 100) {
  console.warn('节点延迟过高');
}`;
