import { describe, expect, it } from 'vitest';
import { createId } from './ids';

describe('createId', () => {
  it('returns a new id on every call', () => {
    const first = createId('spark');
    const second = createId('spark');

    expect(first).toMatch(/^spark-\d+$/);
    expect(second).not.toBe(first);
  });
});
