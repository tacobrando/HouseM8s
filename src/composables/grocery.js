import { createStoreFactory } from "./factory";

export const useGroceryStore = createStoreFactory({
  id: 'grocery',
  state: () => ({
    api: 'groceries',
    showList: {
      groceries: true,
      completed: true
    }
  }),
  actions: {}
})