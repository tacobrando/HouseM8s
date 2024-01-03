import { vi } from 'vitest'

const mocks = {
 axios: {
  post: vi.fn(() => Promise.resolve({ data: {} })),
  get: vi.fn(() => Promise.resolve({ data: {} }))
 },
 router: {
  push: vi.fn()
 },
 toast: {
  showInfo: vi.fn(),
  showError: vi.fn(),
  showSuccess: vi.fn()
 }
}

export default mocks