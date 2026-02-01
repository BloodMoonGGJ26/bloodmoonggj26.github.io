/**
 * File: scripts.js
 * Info: JavaScript for our homepages
 */


const storageKey = 'theme-preference';

const theme = {
  value: getColorPreference(),
};

/*
// Ideal for buttons
const onClick = () => {
  // flip current value
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
}
*/

// Ideal for checkboxes
const onThemeChange = (e) => {
  theme.value = e.currentTarget.checked ? 'dark' : 'light';
  setPreference();

}

const getColorPreference = () => {
  /*
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey);
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  */
  const saved = localStorage.getItem(storageKey);

  if (saved === 'light' || saved === 'dark')
    return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

const reflectPreference = () => {
  /*
  document.firstElementChild.setAttribute('data-theme', theme.value);

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value);
  */
  const root = document.documentElement;
  root.setAttribute('data-theme', theme.value);

  const toggle = document.querySelector('#theme-toggle');

  if (toggle) {
    toggle.checked = theme.value === 'dark';
    toggle.setAttribute('aria-label', theme.value);
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference();

// window.onload = 
window.addEventListener('load', () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference();

  /*
  // now this script can find and listen for clicks on the control
  document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick);
  */

  const toggle = document.querySelector('#theme-toggle');

  /*
  if (!toggle)
    return;

  toggle.addEventListener('change', onThemeChange);
  */
 if (toggle) {
    toggle.addEventListener('change', onThemeChange);
 }
});

/*
// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });
*/

/* sync with system changes (only if the user has not chosen a theme) */
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

mediaQuery.addEventListener('change', ({ matches: isDark }) => {

  if (localStorage.getItem(storageKey))
    return;

  theme.value = isDark ? 'dark' : 'light';
  reflectPreference();
});
