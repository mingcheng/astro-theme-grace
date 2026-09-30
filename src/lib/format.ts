const chineseDateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Shanghai',
});

/** 以简体中文长日期显示，例如 “2026年9月12日”。 */
export const formatChineseDate = (date: Date) => chineseDateFormatter.format(date);

/** 用于 `<time datetime>` 的 ISO 日期（YYYY-MM-DD）。 */
export const toISODate = (date: Date) => date.toISOString().slice(0, 10);

export const formatPercent = (value: number) => `${Math.round(value)}%`;

/** 补零的序号，例如 1 → “01”。 */
export const padNumber = (value: number, length = 2) => String(value).padStart(length, '0');
