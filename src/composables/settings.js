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
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
})