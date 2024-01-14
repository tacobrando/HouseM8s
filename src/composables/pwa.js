import { defineStore } from "pinia";
import { toast } from "./toast";
export const usePwa = defineStore('pwa', {
  state: () => ({
    deferredPrompt: null,
    isAppInstalled: false,
  }),
  getters: {
    isPwaInstalled: (state) => {
      return window.matchMedia('(display-mode: standalone)').matches || state.isAppInstalled;
    },
  },
  actions: {
    showInstallPrompt(prompt) {
      toast.showInfo(prompt, { 
        position: "top-center",
        timeout: 100000 
      });
    },
    installApp() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
        });
      }
    },
    handleAppInstalled() {
      this.isAppInstalled = true;
      console.log("PWA has been installed");
      toast.showSuccess("HouseM8s installed!")
    }
  }
})