<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Your Profile</h1>
    <div class="bg-white p-4 shadow rounded">
      <p><strong>Name:</strong> {{ userStore.name }}</p>
      <p><strong>Token:</strong> {{ userStore.token }}</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
</script>
