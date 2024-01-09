import { vi } from 'vitest'
import { userInfo } from '../store/tests/utils/constants';

const mocks = {
 axios: {
  post: vi.fn(() => Promise.resolve({ data: {} })),
  get: vi.fn(() => Promise.resolve({ data: {} })),
  put: vi.fn(() => Promise.resolve({ data: {} })),
  delete: vi.fn(() => Promise.resolve({ data: {} }))
 },
 router: {
  push: vi.fn()
 },
 toast: {
  showInfo: vi.fn(),
  showError: vi.fn(),
  showSuccess: vi.fn()
 },
 taskStoreFactory: (options) => {
    let state = {
      api: options.api || '',
      list: [],
      completed: [],
      showList: options.showList || { tasks: true, completed: true },
      initialized: false,
      ...options.state()
    };

    const mockActions = {
      addItem: vi.fn(async (item, groupId) => {
        try {
          const { data } = await mocks.axios.post(`/groups/${groupId}/${options.api}/add`, item);
          state.list.unshift(data)
        } catch (error) {
          mocks.toast.showError(error.message);
        }
      }),
      deleteItem: vi.fn(async (itemId, groupId) => {
        try {
          mockActions.removeFromLocalState(itemId)
          await mocks.axios.delete(`/groups/${groupId}/${options.api}/${itemId}/delete`)
        } catch(error) {
          mocks.toast.showError(error.message)
        }
      }),
      removeFromLocalState: vi.fn((itemId) => {
        const completedIndex = state.completed.findIndex(item => item.id === itemId);
        if (completedIndex !== -1) {
          state.completed.splice(completedIndex, 1);
        } else {
          state.list = state.list.filter(item => item.id !== itemId);
        }
      }),
      toggleComplete: vi.fn(async (itemId, groupId, name) => {
        let itemIndex = state.completed.findIndex(item => item.id === itemId);
        let item = itemIndex !== -1 ? state.completed[itemIndex] : null;
        let isCompleted = item !== null;
      
        if (!isCompleted) {
          itemIndex = state.list.findIndex(item => item.id === itemId);
          item = itemIndex !== -1 ? state.list[itemIndex] : null;
        }
      
        if (item) {
          if (isCompleted) {
            state.completed.splice(itemIndex, 1);
            item.completed = { userId: null, name: null };
            state.list.unshift(item);
          } else {
            state.list.splice(itemIndex, 1);
            item.completed = { userId: userInfo._id, name: userInfo.username };
            state.completed.unshift(item);
          }
          state.showList[name.toLowerCase()] = true;
          state.showList.completed = true;
      
          await mocks.axios.put(`/groups/${groupId}/${state.api}/${itemId}/update`, { completed: item.completed });
        } else {
          console.error('Item not found');
        }
      }),
    };   

    return {
      id: options.id,
      state: () => state,
      actions: { ...mockActions, ...options.actions },
    };
  }
}

export default mocks