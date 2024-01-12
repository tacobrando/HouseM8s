import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', '/icons/HouseM8s-icon-white-192x192.png'],
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
        cleanupOutdatedCaches: false
      },
      manifest: {
        name: 'HouseM8s',
        short_name: 'HouseM8s',
        description: 'Manage your household tasks!',
        display: 'standalone',
        icons: [
          {
            src: '/icons/HouseM8s-icon-white-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/HouseM8s-icon-white-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/mobile.png', // Add a mobile screenshot
            sizes: '1140x1952',
            type: 'image/png',
            label: 'Mobile View',
            platform: 'mobile',
          },
          {
            src: '/screenshots/desktop.png',
            sizes: '2924x1954',
            type: 'image/png',
            label: 'Desktop View',
            form_factor: "wide",
            platform: 'browser',
          },
        ],
      }
    })
  ],
  test: {
    globals: true,
    reporters: 'verbose',
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
