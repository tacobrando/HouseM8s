import { createStoreFactory } from "./factory";

export const useChoreStore = createStoreFactory({
  id: 'chore',
  state: () => ({
    api: 'chores',
    list: [
      { id: 1, groupId: 2, user: 'Dave', item: "Take out garbage", completed: true, createdAt: new Date() },
      { id: 2, groupId: 1, user: 'John', item: "Feed the dog", completed: false, createdAt: "2023-11-28T13:00:00.000Z" },
      { id: 3, groupId: 2, user: 'Dave', item: "Eat cabbage", completed: true, createdAt: "2023-11-28T14:00:00.000Z" },
      { id: 4, groupId: 1, user: 'Sam', item: "Walk the dog", completed: true, createdAt: "2023-11-28T14:00:00.000Z" },
      { id: 5, groupId: 2, user: 'Dave', item: "Vacuum the house", completed: false, createdAt: "2023-11-27T11:00:00.000Z" }
    ],
  }),
  actions: {}
})