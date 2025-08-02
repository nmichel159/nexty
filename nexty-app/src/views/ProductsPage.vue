<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Products</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>

    <div v-if="products.length" :class="gridColsClass" class="grid gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white p-4 rounded shadow border border-gray-200"
      >
        <h2 class="text-lg font-semibold mb-2">{{ product.name }}</h2>
        <img
          :src="product.image"
          alt="product image"
          class="w-full h-48 object-cover rounded mb-4"
        />
        <p class="text-gray-600">Brand: {{ product.brand }}</p>
        <p class="text-gray-600 mb-2">Price: €{{ product.price.toFixed(2) }}</p>
        <p class="text-sm text-gray-500 line-clamp-2">{{ product.description }}</p>

        <button
          @click="toggleDetail(product.id)"
          class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {{ shownDetails.has(product.id) ? 'Skryť' : 'Detail' }}
        </button>

        <!-- Detail info ako tabuľka -->
        <div v-if="shownDetails.has(product.id)" class="mt-4">
          <table class="w-full table-auto border border-gray-300 text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="border px-4 py-2 text-left">Veľkosti</th>
                <th class="border px-4 py-2 text-left">Farby</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  <span class="text-gray-700">{{ product.sizes.join(', ') }}</span>
                </td>
                <td class="border px-4 py-2">
                  <span class="text-gray-700">{{ product.colors.join(', ') }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-600">Loading products...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import productData from '../assets/products.json'

const products = ref(productData.products)
const router = useRouter()
const userStore = useUserStore()
const selectedProduct = ref(null)

// logout
const logout = () => {
  userStore.clearUser()
  localStorage.clear()
  router.push('/login')
}

// toggle zobrazenia pre každý produkt zvlášť
const shownDetails = ref(new Set())

function toggleDetail(productId) {
  if (shownDetails.value.has(productId)) {
    shownDetails.value.delete(productId)
  } else {
    shownDetails.value.add(productId)
  }
  // reactive workaround: trigger update
  shownDetails.value = new Set(shownDetails.value)
}

// grid layout podľa šírky
const windowWidth = ref(window.innerWidth)

function updateWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

const gridColsClass = computed(() => {
  return windowWidth.value < 768 ? 'grid-cols-1' : 'grid-cols-2'
})
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
