// storeFactory.js
import { toast } from './toast.js';
import { defineStore } from 'pinia';
import api from '../utils/Axios.js';


export function createStoreFactory(options) {
  return defineStore({
    ...options,
    state: () => ({
      api: '',
      list: [],
      completed: [],
      showList: {
        completed: true,
        tasks: true,
      },
      initialized: false,
      ...options.state()
    }),
    actions: {
      init() {
        if (this.initialized) return;
        
        this.completed = this.list.filter(item => item.completed);
        this.list = this.list.filter(item => !item.completed);
        this.sortList();
        this.initialized = true;
      },
      sortList() {
        this.list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      },
      async addItem(item, groupId) {
        try{
          await api.post(`/groups/${groupId}/${this.api}/add`, {
            ...item
          })
          .then(res => console.log(res.data))
          this.list.unshift({ ...item, groupId });
          this.showList.tasks = true
          this.sortList();
        } catch(error) {
          console.error(error)
          // toast().showError(error)
        }
        // console.log(axios.config)
      },
      deleteItem(itemId) {
        const completedIndex = this.completed.findIndex(item => item.id === itemId);
        if (completedIndex !== -1) {
          this.completed.splice(completedIndex, 1);
        } else {
          this.list = this.list.filter(item => item.id !== itemId);
          this.sortList();
        }
      },
      toggleComplete(itemId) {
        let itemIndex = this.completed.findIndex(item => item.id === itemId);
        let isCompleted = itemIndex !== -1;
        let item;

        if (isCompleted) {
          item = this.completed[itemIndex];
          this.completed.splice(itemIndex, 1);
          item.completed = false;
          this.list.unshift(item);
          this.showList.tasks = true
        } else {
          itemIndex = this.list.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            item = this.list[itemIndex];
            this.deleteItem(itemId);
            item.completed = true;
            this.completed.unshift(item);
          }
          this.showList.completed = true
          this.sortList();
        }
      },
      ...options.actions
    },
  });
}
