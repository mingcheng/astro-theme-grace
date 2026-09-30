import { describe, expect, it } from 'vitest';
import { formatChineseDate, formatPercent, padNumber, toISODate } from './format';

describe('format helpers', () => {
  it('formats dates for simplified Chinese readers in Asia/Shanghai', () => {
    expect(formatChineseDate(new Date('2026-09-12'))).toBe('2026年9月12日');
    expect(formatChineseDate(new Date('2026-09-11T20:00:00Z'))).toBe('2026年9月12日');
  });

  it('produces ISO dates for datetime attributes', () => {
    expect(toISODate(new Date('2026-09-12'))).toBe('2026-09-12');
  });

  it('rounds percentages', () => {
    expect(formatPercent(67.6)).toBe('68%');
  });

  it('pads sequence numbers', () => {
    expect(padNumber(1)).toBe('01');
    expect(padNumber(12)).toBe('12');
    expect(padNumber(7, 3)).toBe('007');
  });
});
