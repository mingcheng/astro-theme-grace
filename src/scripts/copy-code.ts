// 代码块复制按钮：按钮默认 hidden，仅在浏览器支持剪贴板 API 时显示（渐进增强）。
const RESET_DELAY = 2000;
const timers = new WeakMap<HTMLButtonElement, number>();

function setLabel(button: HTMLButtonElement, label: string, state?: 'copied' | 'failed') {
  const target = button.querySelector('[data-copy-label]') ?? button;
  target.textContent = label;
  if (state) button.dataset.state = state;
  else delete button.dataset.state;
}

async function copy(button: HTMLButtonElement) {
  const code = button.closest('.code-frame')?.querySelector('pre')?.textContent ?? '';

  try {
    await navigator.clipboard.writeText(code);
    setLabel(button, '已复制', 'copied');
  } catch {
    setLabel(button, '复制失败', 'failed');
  }

  window.clearTimeout(timers.get(button));
  timers.set(button, window.setTimeout(() => setLabel(button, '复制'), RESET_DELAY));
}

if (navigator.clipboard) {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy-code]')) {
    button.hidden = false;
  }

  document.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-copy-code]');
    if (button) void copy(button);
  });
}
