import { describe, expect, it } from 'vitest';
import { getUsageTone } from './status';

describe('status helpers', () => {
  it('maps usage thresholds to semantic states', () => {
    expect(getUsageTone(42)).toBe('healthy');
    expect(getUsageTone(70)).toBe('warning');
    expect(getUsageTone(89.9)).toBe('warning');
    expect(getUsageTone(90)).toBe('critical');
  });
});
