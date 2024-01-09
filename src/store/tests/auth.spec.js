import { describe, it, expect, vi } from 'vitest'
import mocks from '@/mock/index'
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { registerInfo, userInfo } from './utils/constants';

vi.mock('@/utils/Axios', () => ({
  default: {
    post: mocks.axios.post,
    get: mocks.axios.get
  }
}));
vi.mock('@/router/router', () => ({ router: mocks.router }));
vi.mock('@/composables/toast', () => ({ toast: mocks.toast }));


describe('Auth Store', () => {
  let authStore;
  beforeEach(() => {
    vi.resetAllMocks()
    setActivePinia(createPinia())
    authStore = useAuthStore()
    authStore.username = registerInfo.username
    authStore.password = registerInfo.password
  })

  async function testAuthErrors(error) {
    mocks.axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: error
        }
      }
    })
    await authStore.loginUser()

    expect(mocks.axios.post).toHaveBeenCalledWith('/auth/login', {
      username: registerInfo.username,
      password: registerInfo.password
    })
    expect(authStore.isLoggedIn).toBe(false)
    expect(mocks.toast.showError).toHaveBeenCalledWith(error);
  }

  it('User logged in.', async() => {
    mocks.axios.post.mockResolvedValueOnce({
      data: {
        message: "Login successful.",
        user: userInfo
      }
    })

    await authStore.loginUser()

    expect(mocks.axios.post).toHaveBeenCalledWith('/auth/login', {
      username: registerInfo.username,
      password: registerInfo.password
    })
    expect(mocks.toast.showSuccess).toHaveBeenCalledWith('Login successful.');
    expect(authStore.isLoggedIn).toBe(true)
    expect(mocks.router.push).toHaveBeenCalledWith('/');
  })

  it('User logged out.', async() => {
    mocks.axios.get.mockResolvedValueOnce({
      data: {
        message: "Logout successful."
      }
    })

    await authStore.logoutUser()

    expect(mocks.axios.get).toHaveBeenCalledWith('/auth/logout')    
    expect(authStore.isLoggedIn).toBe(false)
    expect(mocks.router.push).toHaveBeenCalledWith('/login')
  })

  it('User not found.', async() => {
    await testAuthErrors('User not found.')
  })

  it('User invalid credentials.', async() => {
    await testAuthErrors("Invalid credentials.")
  })
})
