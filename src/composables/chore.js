import { createStoreFactory } from "./factory";

export const useChoreStore = createStoreFactory({
  id: 'chore',
  state: () => ({
    api: 'chores',
    showList: {
      chores: true,
      completed: true
    }
  }),
  actions: {}
})