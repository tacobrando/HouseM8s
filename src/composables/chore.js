import { createStoreFactory } from "./factory";

export const useChoreStore = createStoreFactory({
  id: 'chore',
  state: () => ({
    list: [
      { id: 1, item: "Take out garbage", completed: false, createdAt: new Date() },
      { id: 2, item: "Feed the dog", completed: false, createdAt: "2023-11-28T13:00:00.000Z" },
      { id: 3, item: "Eat cabbage", completed: false, createdAt: "2023-11-28T14:00:00.000Z" }
    ],
    completed: []
  }),
  actions: {}
})