// storeFactory.js
import { defineStore } from 'pinia';

export function createStoreFactory(options) {
  return defineStore({
    ...options,
    state: () => ({
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
      addItem(item) {
        this.list.unshift(item);
        this.sortList();
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
          this.addItem(item);
        } else {
          itemIndex = this.list.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            item = this.list[itemIndex];
            this.deleteItem(itemId);
            item.completed = true;
            this.completed.unshift(item);
          }
          this.sortList();
        }
      },
      ...options.actions
    }
  });
}
