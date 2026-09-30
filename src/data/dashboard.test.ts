import { describe, expect, it } from 'vitest';
import { getAverage, hosts, storageSegments } from './dashboard';

describe('dashboard data', () => {
  it('calculates rounded averages and handles empty collections', () => {
    expect(getAverage([20, 31, 40])).toBe(30);
    expect(getAverage([])).toBe(0);
  });

  it('keeps host resource values within a percentage range', () => {
    for (const host of hosts) {
      expect(host.cpu).toBeGreaterThanOrEqual(0);
      expect(host.cpu).toBeLessThanOrEqual(100);
      expect(host.memory).toBeGreaterThanOrEqual(0);
      expect(host.memory).toBeLessThanOrEqual(100);
      expect(host.latency).toBeGreaterThanOrEqual(0);
    }
  });

  it('splits storage into segments that add up to 100%', () => {
    expect(storageSegments.reduce((sum, segment) => sum + segment.value, 0)).toBe(100);
  });
});
