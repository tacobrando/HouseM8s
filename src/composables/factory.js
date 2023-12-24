// storeFactory.js
import { toast } from './toast.js';
import { defineStore } from 'pinia';
import { useUserStore } from './user'
import api from '../utils/Axios.js';
import { useSocket } from './socket.io.js';
import { useGroupStore } from './group.js'
import { SocketEvent } from '../utils/SocketEvents.js';


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
      bindSocketEvents(Z) {
        const { socket } = useSocket();
        socket.on(SocketEvent.TASK_ADDED, (data) => {
          this.list.unshift(data.task);
        });

          socket.on(SocketEvent.TASK_UPDATED, (data) => {
            const { taskId, completed } = data;
          
            let itemIndexInList = this.list.findIndex(item => item.id === taskId);
            let itemIndexInCompleted = this.completed.findIndex(item => item.id === taskId);
          
            let foundInList = itemIndexInList !== -1;
            let foundInCompleted = itemIndexInCompleted !== -1;
          
            if (foundInList || foundInCompleted) {
              let taskToUpdate;
          
              if (foundInList) {
                taskToUpdate = this.list[itemIndexInList];
              } else {
                taskToUpdate = this.completed[itemIndexInCompleted];
              }
          
              taskToUpdate.completed = completed;
          
              if (completed.userId && foundInList) {
                this.list.splice(itemIndexInList, 1);
                this.completed.unshift(taskToUpdate);
              } else if (!completed.userId && foundInCompleted) {
                this.completed.splice(itemIndexInCompleted, 1);
                this.list.unshift(taskToUpdate);
              }
            }
          });       
      },
      init() {
        if (this.initialized) return;
        this.bindSocketEvents()
        this.sortList();
        this.initialized = true;
      },
      sortList() {
        this.completed = this.list.filter(item => item.completed.userId !== null)
        this.list = this.list.filter(item => item.completed.userId === null);
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
          await api.post(`/groups/${groupId}/${this.api}/add`, {
            ...item
          })
          this.showList.tasks = true
        } catch(error) {
          toast.showError(error.message)
        }
      },
      async deleteItem(itemId, groupId) {
        try {
          this.removeFromLocalState(itemId);
          await api.delete(`/groups/${groupId}/${this.api}/${itemId}/delete`)
        } catch(error) {
          toast.showError(error.message)
        }
      },
      removeFromLocalState(itemId) {
        const completedIndex = this.completed.findIndex(item => item.id === itemId);
        if (completedIndex !== -1) {
          this.completed.splice(completedIndex, 1);
        } else {
          this.list = this.list.filter(item => item.id !== itemId);
        }
      },
      async toggleComplete(itemId, groupId) {
        const { userInfo } = useUserStore()
      
        let itemIndex = this.completed.findIndex(item => item.id === itemId);
        let item = itemIndex !== -1 ? this.completed[itemIndex] : null;
        let isCompleted = item !== null;
      
        if (!isCompleted) {
          itemIndex = this.list.findIndex(item => item.id === itemId);
          item = itemIndex !== -1 ? this.list[itemIndex] : null;
        }
      
        if (item) {
          if (isCompleted) {
            this.completed.splice(itemIndex, 1);
            item.completed = { userId: null, name: null };
            this.list.unshift(item);
          } else {
            this.list.splice(itemIndex, 1);
            item.completed = { userId: userInfo.id, name: userInfo.username };
            this.completed.unshift(item);
          }
      
          this.showList.tasks = true;
          this.showList.completed = true;
      
          await api.put(`/groups/${groupId}/${this.api}/${itemId}/update`, { completed: item.completed });
        } else {
          console.error('Item not found');
        }
      },      
      ...options.actions
    },
  });
}
