<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Your Profile</h1>
      <HeadButtons />
    </div>

    <div class="bg-white p-4 shadow rounded">
      <p><strong>Name:</strong> {{ userStore.name }}</p>
      <p><strong>Token:</strong> {{ userStore.token }}</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
import HeadButtons from './basicobject/HeadButtons.vue'
const userStore = useUserStore()
</script>
