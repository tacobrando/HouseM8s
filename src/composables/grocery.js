import { defineStore } from "pinia";
import { createStoreFactory } from "./factory";

export const useGroceryStore = createStoreFactory({
  id: 'grocery',
  state: () => ({
    list: [
      { id: 1, item: "Milk", createdAt: new Date(), completed: false },
      { id: 2, item: "Cookies", createdAt: "2023-11-28T13:00:00.000Z", completed: false },
      { id: 3, item: "Chicken", createdAt: "2023-11-28T14:00:00.000Z", completed: false }
    ],
    completed: []
  }),
  actions: {}
})