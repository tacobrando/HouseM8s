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
        
        this.sortList();
        this.initialized = true;
      },
      sortList() {
        this.completed = this.list.filter(item => item.completed)
        this.list = this.list.filter(item => !item.completed);
      },
      async getGroupItems(groupId) {
        try {
          this.list = []
          await api.get(`/groups/${groupId}/${this.api}/`)
          .then(res => this.list = res.data)
          this.sortList()
        } catch(error) {
          toast.showError(error.message)
        }
      },
      async addItem(item, groupId) {
        try{
          const { data } = await api.post(`/groups/${groupId}/${this.api}/add`, {
            ...item
          })
          this.list.unshift(data)
          this.showList.tasks = true
        } catch(error) {
          toast.showError(error.message)
        }
      },
      deleteItem(itemId) {
        const completedIndex = this.completed.findIndex(item => item.id === itemId);
        if (completedIndex !== -1) {
          this.completed.splice(completedIndex, 1);
        } else {
          this.list = this.list.filter(item => item.id !== itemId);
        }
      },
      async toggleComplete(itemId, groupId) {

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
        }
        await api.put(`/groups/${groupId}/${this.api}/${itemId}`)
      },
      ...options.actions
    },
  });
}
