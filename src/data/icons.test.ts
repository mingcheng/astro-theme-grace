import { describe, expect, it } from 'vitest';
import { iconLabels, iconPaths } from './icons';

describe('icon registry', () => {
  it('provides a label and drawable path for every icon', () => {
    const names = Object.keys(iconPaths);

    expect(names.length).toBeGreaterThanOrEqual(16);
    expect(Object.keys(iconLabels)).toEqual(names);
    for (const name of names) {
      expect(iconPaths[name as keyof typeof iconPaths].length).toBeGreaterThan(0);
      expect(iconLabels[name as keyof typeof iconLabels].length).toBeGreaterThan(0);
    }
  });

  it('uses valid non-empty SVG path definitions', () => {
    for (const paths of Object.values(iconPaths)) {
      expect(paths.every((path) => path.trim().length > 2)).toBe(true);
    }
  });
});
