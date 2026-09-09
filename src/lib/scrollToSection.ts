import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function navBottom() {
  const header = document.getElementById('site-nav');
  if (!header) return 96;
  return header.getBoundingClientRect().bottom;
}

export function scrollToSection(id: string) {
  if (id === 'about') {
    if (lenis) lenis.scrollTo(0, { duration: 1.05 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
    return;
  }

  const section = document.getElementById(id);
  if (!section) return;

  const currentScroll = lenis?.scroll ?? window.scrollY;
  const top = section.getBoundingClientRect().top + currentScroll;
  const height = section.offsetHeight;
  const offset = navBottom();
  const available = window.innerHeight - offset;
  const slack = available - height;
  const target = slack > 0
    ? top - offset - slack / 2
    : top - offset - 12;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const next = clamp(target, 0, maxScroll);

  if (lenis) lenis.scrollTo(next, { duration: 1.05 });
  else window.scrollTo({ top: next, behavior: 'smooth' });

  window.history.pushState(null, '', `#${id}`);
}
