import { defineStore } from "pinia";
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useToast = defineStore('toast', {
  state: () => ({}),
  actions: {
    showInfo(message) {
      toast.info(message)
    },
    showError(message) {
      toast.error(message)
    },
    showSuccess(message) {
      toast.success(message)
    }
  }
})