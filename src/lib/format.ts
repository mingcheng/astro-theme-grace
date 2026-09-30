// 日期统一按北京时间显示，避免 UTC 午夜前后的日期在显示文本与 datetime 属性之间错位一天。
const TIME_ZONE = 'Asia/Shanghai';

const chineseDateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: TIME_ZONE,
});

// en-CA 的日期格式恰好是 YYYY-MM-DD
const isoDateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: TIME_ZONE,
});

/** 以简体中文长日期显示，例如 “2026年9月12日”。 */
export const formatChineseDate = (date: Date) => chineseDateFormatter.format(date);

/** 用于 `<time datetime>` 的 ISO 日期（YYYY-MM-DD），与 formatChineseDate 使用同一时区。 */
export const toISODate = (date: Date) => isoDateFormatter.format(date);

export const formatPercent = (value: number) => `${Math.round(value)}%`;

/** 补零的序号，例如 1 → “01”。 */
export const padNumber = (value: number, length = 2) => String(value).padStart(length, '0');
