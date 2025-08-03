<template>
  <transition name="slide-up">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10 z-50"
      @click.self="emitClose"
      style="background-color: rgba(0, 0, 0, 0.7);"
    >
      <div
        class="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-4 max-h-[90vh] overflow-auto"
        @click.stop
      >
        <div class="flex justify-end">
          <button @click="emitClose" class="text-2xl font-bold">
            &times;
          </button>
        </div>
        <!-- Slot na obsah modalu -->
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean
})

const emit = defineEmits(['close'])

function emitClose() {
  emit('close')
}
</script>

