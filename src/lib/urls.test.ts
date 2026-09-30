import { describe, expect, it } from 'vitest';
import { withBase } from './urls';

describe('withBase', () => {
  it('keeps links unchanged at the domain root', () => {
    expect(withBase('/', '/')).toBe('/');
    expect(withBase('/notes/2', '/')).toBe('/notes/2');
  });

  it('prefixes site paths without doubling separators', () => {
    expect(withBase('/', '/astro-theme-grace/')).toBe('/astro-theme-grace/');
    expect(withBase('/notes', '/astro-theme-grace/')).toBe('/astro-theme-grace/notes');
    expect(withBase('/notes/2', '/astro-theme-grace')).toBe('/astro-theme-grace/notes/2');
    expect(withBase('/favicon.svg', '/astro-theme-grace/')).toBe('/astro-theme-grace/favicon.svg');
  });

  it('leaves anchors, emails and external URLs alone', () => {
    expect(withBase('#navigation', '/astro-theme-grace/')).toBe('#navigation');
    expect(withBase('mailto:hello@example.com', '/astro-theme-grace/')).toBe('mailto:hello@example.com');
    expect(withBase('https://example.com/', '/astro-theme-grace/')).toBe('https://example.com/');
    expect(withBase('//example.com/image.jpg', '/astro-theme-grace/')).toBe('//example.com/image.jpg');
  });
});
