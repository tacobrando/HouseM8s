export function isFilled(str) { return !!str }
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for(let registration of registrations) {
          registration.unregister();
        }
      })
      .catch(error => console.error('Error in service worker unregistration:', error));
  }
}
