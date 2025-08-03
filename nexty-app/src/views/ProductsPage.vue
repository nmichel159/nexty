<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Products</h1>
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
      </div>
    </div>

    <!-- Modal -->
    <transition name="slide-up">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10 z-50"
        @click.self="showModal = false"
      >
        <div
          class="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-4 max-h-[90vh] overflow-auto"
          @click.stop
        >
          <div class="flex justify-end">
            <button
              @click="showModal = false"
              class="text-2xl font-bold"
            >
              &times;
            </button>
          </div>
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
        </div>
      </div>
    </transition>

    <!-- LOADING -->
    <div v-if="isLoading" class="flex flex-col justify-center items-center h-40 space-y-3">
       <div class="custom-spinner"></div>
       <span class="text-gray-700 text-lg">Loading...</span>
    </div>




    <!-- PRODUCTS -->
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

    <!-- EMPTY -->
    <p v-else class="text-gray-600 italic">No products found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import productData from '../assets/products.json'

const router = useRouter()
const userStore = useUserStore()

const products = ref([])            
const isLoading = ref(true)         
const selectedProduct = ref(null)
const showModal = ref(false)


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

// logout a profile
const logout = () => {
  userStore.clearUser()
  localStorage.clear()
  router.push('/login')
}
const profile = () => {
  router.push('/profile')
}

// zobrazenie modal okna
function openModal(product) {
  selectedProduct.value = product
  showModal.value = true
}

// grid podľa šírky okna
const windowWidth = ref(window.innerWidth)
function updateWidth() {
  windowWidth.value = window.innerWidth
}
const gridColsClass = computed(() =>
  windowWidth.value < 768 ? 'grid-cols-1' : 'grid-cols-2'
)
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.slide-up-enter-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-up-leave-active {
  transition: transform 0.2s ease-in, opacity 0.2s ease-in;
}
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.custom-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #3b82f6; /* Tailwind blue-500 */
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>
