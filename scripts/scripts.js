/**
 * File: scripts.js
 * Info: JavaScript for our homepages
 */

const storageKey = 'theme-preference';
const themeToggle = document.querySelector('#theme-toggle');

const theme = {
  value: 'light'
};

// 1. Load preference
function getColorPreference() {
  const stored = localStorage.getItem(storageKey);
  if (stored) return stored;

  //return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return 'light';       // We need this in light mode by default
}

// 2. Apply preference
function reflectPreference() {
  document.documentElement.setAttribute('data-theme', theme.value);

  if (themeToggle) {
    themeToggle.checked = theme.value === 'dark'; // sync checkbox
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
}

// 5. Init
theme.value = getColorPreference();
reflectPreference();

if (themeToggle) {
  themeToggle.addEventListener('change', onToggleChange);
}

// 6. Listen to system changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', e => {
    const isDark = e.matches;
    // Only change if user has no saved preference
    if (!localStorage.getItem(storageKey)) {
      theme.value = isDark ? 'dark' : 'light';
      reflectPreference();
    }
  });

