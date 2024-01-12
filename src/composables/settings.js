import { defineStore } from "pinia";

export const useSettings = defineStore('settings', {
  state: () => ({
    darkMode: false,
    currency: {
      options: {
        Dollar: '$',
        Euro: '€',
        GBP: '£',
        Yen: '¥'
      }
    }
  }),
  actions: {
    init() {
      // Initialize dark mode
      const darkModeSetting = localStorage.getItem('darkMode');
      if (darkModeSetting) {
        this.darkMode = darkModeSetting === 'true';
      } else {
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      this.applyDarkMode();
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode.toString());
      this.applyDarkMode();
    },
    applyDarkMode() {
      const rootStyle = document.documentElement.style;
      const metaThemeColor = document.querySelector('meta[name=theme-color]');

      if (this.darkMode) {
        document.documentElement.classList.add('dark');
        rootStyle.setProperty('--bg', '#242424');
        rootStyle.setProperty('--color-scheme', 'dark')
        metaThemeColor.setAttribute('content', '#242424'); // Dark theme color
      } else {
        document.documentElement.classList.remove('dark');
        rootStyle.setProperty('--bg', '#ffffff');
        rootStyle.setProperty('--color-scheme', 'light')
        metaThemeColor.setAttribute('content', '#ffffff'); // Light theme color
      }
    }
  }
})