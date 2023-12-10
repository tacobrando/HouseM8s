import { createStoreFactory } from "./factory";

export const useChoreStore = createStoreFactory({
  id: 'chore',
  state: () => ({
    api: 'chores',
    list: [
      // { id: 1, groupId: 2, user: { userId: 2, name: 'Dave' }, item: "Take out garbage", completed: true, createdAt: new Date() },
      // { id: 2, groupId: 1, user: { userId: 1, name: 'John' }, item: "Feed the dog", completed: false, createdAt: "2023-11-28T13:00:00.000Z" },
      // { id: 3, groupId: 2, user: { userId: 2, name: 'Dave' }, item: "Eat cabbage", completed: true, createdAt: "2023-11-28T14:00:00.000Z" },
      // { id: 4, groupId: 1, user: { userId: 3, name: 'Sam' }, item: "Walk the dog", completed: true, createdAt: "2023-11-28T14:00:00.000Z" },
      // { id: 5, groupId: 2, user: { userId: 2, name: 'Dave' }, item: "Vacuum the house", completed: false, createdAt: "2023-11-27T11:00:00.000Z" }
    ],
  }),
  actions: {}
})