import { useToast } from 'vue-toastification'

export const toast = Object.freeze({
    showInfo(message) {
      useToast().info(message)
    },
    showError(message) {
      useToast().error(message)
    },
    showSuccess(message) {
      useToast().success(message)
    }
})