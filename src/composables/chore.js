import { createStoreFactory } from "./factory";

export const useChoreStore = createStoreFactory({
  id: 'chore',
  state: () => ({
    list: [
      { id: 1, item: "Take out garbage", completed: true, createdAt: new Date() },
      { id: 2, item: "Feed the dog", completed: false, createdAt: "2023-11-28T13:00:00.000Z" },
      { id: 3, item: "Eat cabbage", completed: true, createdAt: "2023-11-28T14:00:00.000Z" },
      { id: 4, item: "Walk the dog", completed: true, createdAt: "2023-11-28T14:00:00.000Z" },
      { id: 5, item: "Vacuum the house", completed: false, createdAt: "2023-11-27T11:00:00.000Z" }
    ],
  }),
  actions: {}
})