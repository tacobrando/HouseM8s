import { describe, it, expect, vi } from 'vitest'
import mocks from '@/mock/index'
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/store/user';
import { isValidEmail } from '@/utils/Helpers';
import { registerInfo, userInfo } from './utils/constants';

vi.mock('@/utils/Axios', () => ({
  default: {
    post: mocks.axios.post,
    get: mocks.axios.get
  }
}));
vi.mock('@/router/router', () => ({ router: mocks.router }));
vi.mock('@/composables/toast', () => ({ toast: mocks.toast }));

describe('User Store', () => {
  let userStore;
  beforeEach(() => {
    vi.resetAllMocks();
    setActivePinia(createPinia())
    userStore = useUserStore()
    userStore.registerInfo = { ...registerInfo };
  })  

  async function testRegistrationError(error) {
    mocks.axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: error
        }
      }
    })
    await userStore.registerUser()

    expect(mocks.axios.post).toHaveBeenCalledWith('/users/register', {
      info: userStore.registerInfo
    });

    expect(mocks.toast.showError).toHaveBeenCalledWith(error);
  }
  
  it('Registration is successful.', async() => {
    mocks.axios.post.mockResolvedValueOnce({
      data: {
        message: "Registration successful",
        user: userInfo
      }
    });

    await userStore.registerUser()

    expect(mocks.axios.post).toHaveBeenCalledWith('/users/register', {
      info: userStore.registerInfo
    })

    expect(userStore.userInfo).toEqual({
      id: '1',
      username: 'testuser',
      email: 'testuser@example.com',
      groups: [],
      createdAt: '2023-01-01T00:00:00.000Z',  
      updatedAt: '2023-01-01T00:00:00.000Z'
    })
    expect(mocks.toast.showSuccess).toHaveBeenCalledWith('Registration successful');
    expect(mocks.router.push).toHaveBeenCalledWith('/');
  })

  it('Registration throws invalid email error.', async() => {
    userStore.registerInfo.email = 'invalidemail.com'
    mocks.axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Invalid email."
        }
      }
    })
    
    await userStore.registerUser()

    expect(mocks.axios.post).toHaveBeenCalledWith('/users/register', {
      info: userStore.registerInfo
    });
    expect(isValidEmail(userStore.registerInfo.email)).toBe(false)
    expect(mocks.toast.showError).toHaveBeenCalledWith("Invalid email.");
  })

  it('Registration throws password mismatch error.', async() => {
    userStore.registerInfo.confirmPassword = "pass"
    mocks.axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Passwords do not match!"
        }
      }
    })
    await userStore.registerUser()

    expect(mocks.axios.post).toHaveBeenCalledWith('/users/register', {
      info: userStore.registerInfo
    });
    expect(userStore.registerInfo.password).not.toBe(userStore.registerInfo.confirmPassword)
    expect(mocks.toast.showError).toHaveBeenCalledWith("Passwords do not match!");
  })

  it("Registration throws error if username is taken.", async() => {
    await testRegistrationError("Username is already in use!")
  })

  it("Registration throws error if email is taken.", async() => {
    await testRegistrationError("Email is already in use!")
  })
})