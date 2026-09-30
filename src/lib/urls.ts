/** 将站点根路径下的链接映射到 Astro 的部署前缀，保留锚点及外部链接。 */
export const withBase = (path: string, base = import.meta.env.BASE_URL) =>
  path.startsWith('/') && !path.startsWith('//') ? `${base.replace(/\/$/, '')}${path}` : path;
