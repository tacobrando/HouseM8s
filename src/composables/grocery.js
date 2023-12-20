import { createStoreFactory } from "./factory";

export const useGroceryStore = createStoreFactory({
  id: 'grocery',
  state: () => ({
    api: 'groceries',
    list: [
      // { id: 1, groupId: 2, user: { userId: 2, name: 'Dave' }, item: "Milk", createdAt: "2023-12-02T03:55:00Z", completed: true },
      // { id: 2, groupId: 2, user: { userId: 1, name: 'John' }, item: "Cookies", createdAt: "2023-11-28T13:00:00.000Z", completed: false },
      // { id: 3, groupId: 1, user: { userId: 2, name: 'Dave' }, item: "Chicken", createdAt: "2023-11-28T14:00:00.000Z", completed: false },
      // { id: 4, groupId: 1, user: { userId: 3, name: 'Sam' }, item: "Penne Pasta", createdAt: "2023-11-27T13:00:00.000Z", completed: true },
      // { id: 5, groupId: 2, user: { userId: 3, name: 'Sam' }, item: "Chilli Oil", createdAt: "2023-11-27T14:00:00.000Z", completed: false }
    ],
  }),
  actions: {}
})