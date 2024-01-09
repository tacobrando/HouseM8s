import { createTaskStoreFactory } from "@/composables/taskFactory";

export const useGroceryStore = createTaskStoreFactory({
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