import { describe, expect, it } from 'vitest';
import { getPageUrl, getPaginationItems } from './pagination';

describe('pagination helpers', () => {
  it('uses the base path for the first page', () => {
    expect(getPageUrl('/notes', 1)).toBe('/notes');
    expect(getPageUrl('/notes', 3)).toBe('/notes/3');
  });

  it('shows every page when there are seven or fewer', () => {
    expect(getPaginationItems(1, 3)).toEqual([1, 2, 3]);
    expect(getPaginationItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('collapses distant pages into ellipses', () => {
    expect(getPaginationItems(4, 8)).toEqual([1, 'ellipsis', 3, 4, 5, 'ellipsis', 8]);
    expect(getPaginationItems(1, 10)).toEqual([1, 2, 'ellipsis', 10]);
    expect(getPaginationItems(10, 10)).toEqual([1, 'ellipsis', 9, 10]);
  });
});
