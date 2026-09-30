import type { ShikiTransformer } from 'shiki';

type HastRoot = Parameters<NonNullable<ShikiTransformer['root']>>[0];
type HastElement = Extract<HastRoot['children'][number], { type: 'element' }>;

const plainLanguages = new Set(['plaintext', 'plain', 'text', 'txt']);

/** 代码块标题栏显示的语言名；纯文本统一显示为「纯文本」。 */
export function getCodeLanguageLabel(language: string | undefined): string {
  if (!language || plainLanguages.has(language)) return '纯文本';
  return language;
}

/** 从代码围栏的 meta 中读取 `title="文件名"`（也支持单引号或不带引号的写法）。 */
export function parseCodeTitle(meta: string | undefined): string | undefined {
  const match = meta?.match(/(?:^|\s)title=(?:"([^"]*)"|'([^']*)'|(\S+))/);
  const title = match?.[1] ?? match?.[2] ?? match?.[3];
  return title?.trim() || undefined;
}

function element(tagName: string, properties: HastElement['properties'], children: HastElement['children']): HastElement {
  return { type: 'element', tagName, properties, children };
}

function text(value: string) {
  return { type: 'text' as const, value };
}

/**
 * Shiki 转换器：把 <pre> 包进 <figure class="code-frame">，
 * 标题栏显示文件名或语言，并附带一个复制按钮（默认 hidden，由 copy-code 脚本在支持剪贴板时显示）。
 */
export const codeFrameTransformer: ShikiTransformer = {
  name: 'grace:code-frame',
  root(root) {
    const pre = root.children.find((node): node is HastElement => node.type === 'element' && node.tagName === 'pre');
    if (!pre) return;

    const label = getCodeLanguageLabel(this.options.lang);
    const title = parseCodeTitle(this.options.meta?.__raw);

    const actions: HastElement['children'] = [];
    if (title) actions.push(element('span', { className: ['code-frame-language'] }, [text(label)]));
    actions.push(
      element('button', { type: 'button', className: ['code-copy'], dataCopyCode: '', hidden: true }, [
        element('span', { dataCopyLabel: '', ariaLive: 'polite' }, [text('复制')]),
      ]),
    );

    root.children = [
      element('figure', { className: ['code-frame'], dataLanguage: this.options.lang }, [
        element('figcaption', { className: ['code-frame-bar'] }, [
          element('span', { className: ['code-frame-title'] }, [text(title ?? label)]),
          element('span', { className: ['code-frame-actions'] }, actions),
        ]),
        pre,
      ]),
    ];
  },
};
