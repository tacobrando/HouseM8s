import { createTaskStoreFactory } from "@/composables/taskFactory";

export const useChoreStore = createTaskStoreFactory({
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