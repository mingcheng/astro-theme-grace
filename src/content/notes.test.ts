import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Frontmatter 由 src/content.config.ts 中的 schema 在构建时校验；这里只约束文件名，因为它决定文章 URL。
const noteFiles = readdirSync(new URL('./notes', import.meta.url)).filter((file) => file.endsWith('.md'));

describe('notes content', () => {
  it('contains at least one note', () => {
    expect(noteFiles.length).toBeGreaterThan(0);
  });

  it('uses URL-safe kebab-case file names', () => {
    for (const file of noteFiles) {
      expect(file).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/);
    }
  });
});
