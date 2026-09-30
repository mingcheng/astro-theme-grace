export type PaginationItem = number | 'ellipsis';

/** 第 1 页使用列表根路径，其余页面为 `${basePath}/${page}`，与 Astro `paginate()` 的 `[...page]` 路由一致。 */
export const getPageUrl = (basePath: string, page: number) => (page <= 1 ? basePath : `${basePath}/${page}`);

/**
 * 生成分页按钮序列：总页数不超过 7 时全部展示，
 * 否则保留首页、末页与当前页前后各一页，其余以省略号代替。
 */
export const getPaginationItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (page) => totalPages <= 7 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
  );

  return visiblePages.flatMap<PaginationItem>((page, index) => {
    const previous = visiblePages[index - 1];
    return previous !== undefined && page - previous > 1 ? ['ellipsis', page] : [page];
  });
};
