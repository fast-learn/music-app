/**
 * 将px转为rem
 * @param px
 */
export function px2rem(px: any = 0) {
  if (IS_H5) {
    const html = window.document.documentElement;
    const base = html.style.fontSize || '18px';
    return +String(px).replace('px', '') / +String(base).replace('px', '') + 'rem';
  }
  return px;
}
