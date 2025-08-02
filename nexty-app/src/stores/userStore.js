import { defineStore } from 'pinia'




export const useUserStore = defineStore('user', {
  state: () => ({
  name: localStorage.getItem('name') || null,
  token: localStorage.getItem('token') || null,
  }),
  actions: {
    setUser(name, token) {
      this.name = name
      this.token = token
    },
    clearUser() {
      this.name = null
      this.token = null
    },
  },
})
