<template>
  <div class="flex flex-col space-y-2">
    <button
      @click="logout"
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
    <button
      @click="profile"
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Profile
    </button>
     <button
      @click="products"
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Products
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.clearUser()
  localStorage.clear()
  router.push('/login')
}

const profile = () => {
  router.push('/profile')
}
const products = () => {
  router.push('/products')
}
</script>
