import { describe, expect, it } from 'vitest';
import { codeFrameTransformer, getCodeLanguageLabel, parseCodeTitle } from './code-block';

type Root = Parameters<NonNullable<typeof codeFrameTransformer.root>>[0];

function runTransformer(lang: string, meta?: string) {
  const pre = { type: 'element', tagName: 'pre', properties: {}, children: [] } as const;
  const root = { type: 'root', children: [pre] } as unknown as Root;
  const context = { options: { lang, meta: meta ? { __raw: meta } : undefined } };
  codeFrameTransformer.root!.call(context as never, root);
  return { root, pre };
}

describe('getCodeLanguageLabel', () => {
  it('labels plain text blocks in Chinese', () => {
    expect(getCodeLanguageLabel(undefined)).toBe('纯文本');
    expect(getCodeLanguageLabel('plaintext')).toBe('纯文本');
    expect(getCodeLanguageLabel('text')).toBe('纯文本');
  });

  it('keeps real language ids', () => {
    expect(getCodeLanguageLabel('python')).toBe('python');
  });
});

describe('parseCodeTitle', () => {
  it('reads quoted and bare titles', () => {
    expect(parseCodeTitle('title="src/app.ts"')).toBe('src/app.ts');
    expect(parseCodeTitle("{1,3} title='a b.py'")).toBe('a b.py');
    expect(parseCodeTitle('title=config.json')).toBe('config.json');
  });

  it('ignores missing or empty titles', () => {
    expect(parseCodeTitle(undefined)).toBeUndefined();
    expect(parseCodeTitle('subtitle="x"')).toBeUndefined();
    expect(parseCodeTitle('title=""')).toBeUndefined();
  });
});

describe('codeFrameTransformer', () => {
  it('wraps the pre in a figure with a caption and hidden copy button', () => {
    const { root, pre } = runTransformer('python');
    const figure = root.children[0] as { tagName: string; children: unknown[] };

    expect(figure.tagName).toBe('figure');
    expect(figure.children[1]).toBe(pre);
    const html = JSON.stringify(figure.children[0]);
    expect(html).toContain('"python"');
    expect(html).toContain('"dataCopyCode"');
    expect(html).toContain('"hidden":true');
  });

  it('shows the title and keeps the language as a secondary label', () => {
    const { root } = runTransformer('ts', 'title="src/monitor.ts"');
    const caption = JSON.stringify((root.children[0] as { children: unknown[] }).children[0]);

    expect(caption).toContain('"src/monitor.ts"');
    expect(caption).toContain('"code-frame-language"');
    expect(caption).toContain('"ts"');
  });
});
