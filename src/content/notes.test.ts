import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Frontmatter 由 src/content.config.ts 中的 schema 在构建时校验；这里只约束文章 URL：
// glob 加载器优先使用 frontmatter 的 slug，缺省时使用文件名。
const notesDir = new URL('./notes/', import.meta.url);
const noteFiles = readdirSync(notesDir).filter((file) => file.endsWith('.md'));

const getNoteId = (file: string) => {
  const source = readFileSync(new URL(file, notesDir), 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const slug = frontmatter.match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1];
  return slug ?? file.replace(/\.md$/, '');
};

describe('notes content', () => {
  it('contains at least one note', () => {
    expect(noteFiles.length).toBeGreaterThan(0);
  });

  it('uses URL-safe kebab-case ids', () => {
    for (const file of noteFiles) {
      expect(getNoteId(file), file).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('never uses a purely numeric id, which would collide with /notes/2 pagination', () => {
    for (const file of noteFiles) {
      expect(getNoteId(file), file).not.toMatch(/^\d+$/);
    }
  });

  it('gives every note a unique id', () => {
    const ids = noteFiles.map(getNoteId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
