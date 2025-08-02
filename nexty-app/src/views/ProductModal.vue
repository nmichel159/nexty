<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-t-xl w-full max-w-xl p-6 animate-slide-up">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ product.name }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-black text-xl">×</button>
      </div>

      <img
        :src="product.image"
        alt="product image"
        class="w-full h-48 object-cover rounded mb-4"
      />

      <p class="text-gray-700 mb-2"><strong>Brand:</strong> {{ product.brand }}</p>
      <p class="text-gray-700 mb-2"><strong>Price:</strong> €{{ product.price.toFixed(2) }}</p>
      <p class="text-gray-700 mb-2"><strong>Description:</strong> {{ product.description }}</p>

      <p class="text-gray-700 mb-1"><strong>Available Sizes:</strong> {{ product.sizes.join(', ') }}</p>
      <p class="text-gray-700"><strong>Available Colors:</strong></p>
      <div class="flex items-center mt-1">
        <span
          v-for="color in product.colors"
          :key="color"
          class="inline-block w-5 h-5 rounded-full border mr-2"
          :style="{ backgroundColor: color }"
          :title="color"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
</style>
