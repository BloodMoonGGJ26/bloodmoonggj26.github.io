/**
 * File: scripts.js
 * Info: JavaScript for our homepages
 */

const storageKey = 'theme-preference';

const themeToggle = document.querySelector('#theme-toggle');
const themeHint   = document.querySelector('#theme-hint');

const theme = {
  value: 'light'
};

// 1. Load preference
function getColorPreference() {
  const stored = localStorage.getItem(storageKey);
  if (stored) return stored;

  // Default to light
  return 'light';
}

// 2. Apply preference
function reflectPreference() {
  document.documentElement.setAttribute('data-theme', theme.value);

  if (themeToggle) {
    themeToggle.checked = (theme.value === 'dark');
    themeToggle.setAttribute('aria-label', theme.value);
  }
}

// 3. Save preference
function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

// 4. Handle toggle
function onToggleChange(e) {
  theme.value = e.currentTarget.checked ? 'dark' : 'light';
  setPreference();

  if (themeHint) {
    themeHint.classList.remove('show');
  }
}

// 5. Attention / wiggle + callout
function maybeDrawAttention() {
  if (!themeToggle || !themeHint) return;

  // Only if the user has never chosen a theme
  if (localStorage.getItem(storageKey)) return;

  setTimeout(() => {
    themeToggle.classList.add('wiggle');
    themeHint.classList.add('show');

    themeToggle.addEventListener('animationend', () => {
      themeToggle.classList.remove('wiggle');
    }, { once: true });

  }, 900);
}

// 6. Init
theme.value = getColorPreference();
reflectPreference();

if (themeToggle) {
  themeToggle.addEventListener('change', onToggleChange);
}

// 7. Sync with system changes (only if no saved preference)
const media = window.matchMedia('(prefers-color-scheme: dark)');

media.addEventListener('change', e => {
  if (!localStorage.getItem(storageKey)) {
    theme.value = e.matches ? 'dark' : 'light';
    reflectPreference();
  }
});

// 8. Run attention after load
window.addEventListener('load', () => {
  reflectPreference();
  maybeDrawAttention();
});
