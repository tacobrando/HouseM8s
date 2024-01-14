import { useToast } from 'vue-toastification'

export const toast = Object.freeze({
    showInfo(message, options) {
      useToast().info(message, options)
    },
    showError(message) {
      useToast().error(message)
    },
    showSuccess(message) {
      useToast().success(message)
    }
})