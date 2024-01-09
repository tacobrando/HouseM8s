import { describe, expect, it, vi } from 'vitest'
import { taskLayout, taskInfo, groupInfo } from './utils/constants';
import { createPinia, setActivePinia } from 'pinia'

import mocks from '@/mock/index'

vi.mock('@/utils/Axios', () => ({
  default: {
    post: mocks.axios.post,
    get: mocks.axios.get,
    put: mocks.axios.put,
    delete: mocks.axios.delete
  }
}));
vi.mock('@/composables/toast', () => ({ toast: mocks.toast }));
vi.mock('@/composables/taskFactory', () => {
  return {
    createTaskStoreFactory: mocks.taskStoreFactory
  }
});

async function testAddItem(store) {
  mocks.axios.post.mockResolvedValueOnce({
    data: taskInfo
  })

  const task = { 
    ...taskLayout, 
    item: taskInfo.item, 
    price: taskInfo.price 
  }
  
  await store.actions.addItem(task, groupInfo.id)
  expect(mocks.axios.post).toHaveBeenCalledWith(`/groups/${groupInfo.id}/${store.state().api}/add`, task);
  expect(store.state().list).toContainEqual(expect.objectContaining(taskInfo))
}

async function testToggleComplete(list1, list2, store, name) {
  list1.unshift(taskInfo)

  await store.actions.toggleComplete(taskInfo.id, groupInfo.id, name)

  expect(mocks.axios.put)
  .toHaveBeenCalledWith(`/groups/${groupInfo.id}/${store.state().api}/${taskInfo.id}/update`, { 
    completed: taskInfo.completed 
  })
  expect(list2).toContainEqual(expect.objectContaining(taskInfo))
  expect(list1).not.toContainEqual(expect.not.objectContaining(taskInfo))
}

async function testDeleteItem(list, store) {
  list.unshift(taskInfo)

  await store.actions.deleteItem(taskInfo.id, groupInfo.id)

  expect(mocks.axios.delete)
  .toHaveBeenCalledWith(`/groups/${groupInfo.id}/${store.state().api}/${taskInfo.id}/delete`)
  expect(list).not.toContainEqual(expect.not.objectContaining(taskInfo))
}


describe("Grocery Store Tests", () => {
  let groceryStore;
  let choreStore;
  beforeEach(() => {
    vi.resetAllMocks();
    setActivePinia(createPinia());
    groceryStore = mocks.taskStoreFactory({
      id: 'grocery',
      api: 'groceries',
      state: () => ({
        showList: {
          groceries: true,
          completed: true
        }
      }),
      actions: {}
    });
    choreStore = mocks.taskStoreFactory({
      id: 'chore',
      api: 'chores',
      state: () => ({
        showList: {
          chores: true,
          completed: true
        }
      }),
      actions: {}
    });
  });

  it("Grocery item added.", async() => {
    await testAddItem(groceryStore)
  })

  it("Grocery item toggled as completed.", async() => {
    await testToggleComplete(groceryStore.state().list, groceryStore.state().completed, groceryStore, "Groceries")
  })

  it("Grocery item toggled as incomplete.", async() => {    
    await testToggleComplete(groceryStore.state().completed, groceryStore.state().list, groceryStore, "Groceries")
  })

  it("Grocery item removed from either list.", async() => {
    await testDeleteItem(groceryStore.state().list, groceryStore)
    await testDeleteItem(groceryStore.state().completed, groceryStore)
  })
})

describe("Chore Store Tests", () => {
  let choreStore;
  beforeEach(() => {
    vi.resetAllMocks();
    setActivePinia(createPinia());
    choreStore = mocks.taskStoreFactory({
      id: 'chore',
      api: 'chores',
      state: () => ({
        showList: {
          chores: true,
          completed: true
        }
      }),
      actions: {}
    });
  });

  it("Chore item added.", async() => {
    await testAddItem(choreStore)
  })

  it("Chore item toggled as completed.", async() => {
    await testToggleComplete(choreStore.state().list, choreStore.state().completed, choreStore, "Chores")
  })

  it("Chore item toggled as incomplete.", async() => {    
    await testToggleComplete(choreStore.state().completed, choreStore.state().list, choreStore, "Chores")
  })

  it("Chore item removed from either list.", async() => {
    await testDeleteItem(choreStore.state().list, choreStore)
    await testDeleteItem(choreStore.state().completed, choreStore)
  })
})