<template>

  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form @submit.prevent="handleLogin" class="bg-white shadow p-6 rounded w-full max-w-sm space-y-4">
      <h2 class="text-xl font-bold text-center">Login</h2>
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 rounded" required />
      <button class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Login</button>

      <!-- Basic Errror -->
      <!-- Da sa zlepsit error -->
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import users from '../assets/users.json'  
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

//handler
const handleLogin = () => {
  const user = users.users.find(u => u.email === email.value && u.password === password.value)
  if (user) {
    localStorage.setItem('token', user.token)
    localStorage.setItem('name', user.name)
    userStore.setUser(user.name, user.token)
    router.push('/products')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>
