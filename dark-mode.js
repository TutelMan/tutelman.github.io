// Dark mode toggle: adds a button, persists choice in localStorage, and
// applies `html.dark` class when dark mode is active.
(function () {
  const THEME_KEY = 'site-theme';
  const DARK_CLASS = 'dark';

  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.classList.add(DARK_CLASS);
    else document.documentElement.classList.remove(DARK_CLASS);
  }

  // Read saved preference or system preference default
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // Create toggle button
  function createToggle() {
    const btn = document.createElement('button');
    btn.id = 'dark-mode-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    updateButtonIcon(btn);

    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle(DARK_CLASS);
      const newTheme = isDark ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, newTheme);
      updateButtonIcon(btn);
    });

    return btn;
  }

  function updateButtonIcon(btn) {
    const isDark = document.documentElement.classList.contains(DARK_CLASS);
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-pressed', String(isDark));
  }

  // Insert the toggle early in the document
  function insertToggle() {
    try {
      const btn = createToggle();
      document.documentElement.appendChild(btn);
    } catch (e) {
      // If DOM isn't ready, try again shortly
      setTimeout(insertToggle, 50);
    }
  }

  // Run on next tick to avoid blocking page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertToggle);
  } else {
    insertToggle();
  }
})();
