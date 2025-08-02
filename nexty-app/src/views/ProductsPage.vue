<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Welcome, {{ name }}</h1>
      <button @click="logout" class="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
    <p class="text-gray-600">This is the protected products page.</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const name = ref(localStorage.getItem('name') || 'User')

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('name')
  router.push('/login')
}
</script>
