// Astro 组件的 frontmatter 每次渲染都会重新执行，计数器需放在模块作用域中才能跨实例递增。
let counter = 0;

/** 生成页面内唯一的元素 id（例如 SVG 渐变），构建结果保持确定性。 */
export const createId = (prefix: string) => `${prefix}-${++counter}`;
