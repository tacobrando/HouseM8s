interface TaskState {
  api: string,
  list: any[],
  completed: any[],
  showList: {
    completed: boolean,
    tasks: boolean,
    [key: string]: boolean
  },
  initialized: boolean
}

interface FactoryOptions {
  id: string,
  state: () => Partial<TaskState>;
  actions?: Record<string, Function>
}