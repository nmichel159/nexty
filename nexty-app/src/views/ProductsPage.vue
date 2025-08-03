<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Products</h1>
      <HeadButtons />
    </div>

    <!-- Modal -->
    <BasicModal :visible="showModal" @close="showModal = false">
      <table
        v-if="selectedProduct"
        class="w-full table-auto border border-gray-300 text-sm mt-4"
      >
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2 text-left">Veľkosti</th>
            <th class="border px-4 py-2 text-left">Farby</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2 text-gray-700">
              {{ selectedProduct.sizes?.join(', ') || '–' }}
            </td>
            <td class="border px-4 py-2 text-gray-700">
              {{ selectedProduct.colors?.join(', ') || '–' }}
            </td>
          </tr>
        </tbody>
      </table>
    </BasicModal>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="flex flex-col justify-center items-center h-40 space-y-3"
    >
      <div class="custom-spinner"></div>
      <span class="text-gray-700 text-lg">Loading...</span>
    </div>

    <!-- Products Grid -->
    <div
      v-else-if="products.length"
      :class="gridColsClass"
      class="grid gap-6"
    >
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
          @click="openModal(product)"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Detail
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <p v-else class="text-gray-600 italic">No products found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import productData from '../assets/products.json'
import HeadButtons from './basicobject/HeadButtons.vue'
import BasicModal from './basicobject/BasicModal.vue'


const router = useRouter()
const userStore = useUserStore()
const products = ref([])
const isLoading = ref(true)
const selectedProduct = ref(null)
const showModal = ref(false)




//loading data
onMounted(() => {
  window.addEventListener('resize', updateWidth)
  setTimeout(() => {
    products.value = productData.products
    isLoading.value = false
  }, 1500)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

function openModal(product) {
  selectedProduct.value = product
  showModal.value = true
}

const windowWidth = ref(window.innerWidth)
function updateWidth() {
  windowWidth.value = window.innerWidth
}

//provizorne riesenie na pocet stlpcov. ine riesenie je mozne dat vseobecne posunut vyssie
const gridColsClass = computed(() =>
  windowWidth.value < 768 ? 'grid-cols-1' : 'grid-cols-2'
)

</script>
