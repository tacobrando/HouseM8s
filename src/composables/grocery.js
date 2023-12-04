import { createStoreFactory } from "./factory";

export const useGroceryStore = createStoreFactory({
  id: 'grocery',
  state: () => ({
    api: '/groceries',
    list: [
      { id: 1, groupId: 2, user: 'Dave', item: "Milk", createdAt: "2023-12-02T03:55:00Z", completed: true },
      { id: 2, groupId: 2, user: 'John', item: "Cookies", createdAt: "2023-11-28T13:00:00.000Z", completed: false },
      { id: 3, groupId: 1, user: 'Dave', item: "Chicken", createdAt: "2023-11-28T14:00:00.000Z", completed: false },
      { id: 4, groupId: 1, user: 'Sam', item: "Penne Pasta", createdAt: "2023-11-27T13:00:00.000Z", completed: true },
      { id: 5, groupId: 2, user: 'Sam', item: "Chilli Oil", createdAt: "2023-11-27T14:00:00.000Z", completed: false }
    ],
  }),
  actions: {}
})