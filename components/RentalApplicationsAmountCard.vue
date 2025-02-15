<template>
  <div
      class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-50 w-full mx-auto"
  >
    <div class="flex items-center space-x-4">
      <div
          class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full"
      >
        <!-- Icon -->
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="#EBF0EC"/>
          <path d="M23.9993 32.3337V19.0003C23.9993 17.429 23.9993 16.6433 23.5112 16.1552C23.023 15.667 22.2374 15.667 20.666 15.667H18.9993C17.428 15.667 16.6423 15.667 16.1542 16.1552C15.666 16.6433 15.666 17.429 15.666 19.0003V29.0003C15.666 30.5717 15.666 31.3573 16.1542 31.8455C16.6423 32.3337 17.428 32.3337 18.9993 32.3337H23.9993Z" stroke="#1D2739"/>
          <path d="M24 32.3337H29C30.5713 32.3337 31.357 32.3337 31.8452 31.8455C32.3333 31.3573 32.3333 30.5717 32.3333 29.0003V24.0003C32.3333 22.429 32.3333 21.6433 31.8452 21.1552C31.357 20.667 30.5713 20.667 29 20.667H24" stroke="#1D2739"/>
          <path d="M29.416 27.3333H26.916M29.416 24H26.916" stroke="#1D2739" stroke-linecap="round"/>
          <path d="M21.084 25.6667H18.584M21.084 22.3333H18.584M21.084 19H18.584" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Rent Amount</p>
      <div class="flex items-center gap-x-2">
        <p class="text-gray-900 font-bold text-lg">{{formatCurrency(roomObj?.rentAmount) ?? '0.00'}}</p>
        <p class="text-gray-400 text-sm">{{roomObj?.rentFrequency ?? 'Nil'}}</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCurrencyFormatter} from "@/composables/core/useCurrencyFormatter";
const { formatCurrency } = useCurrencyFormatter()
const props = defineProps({
  roomObj: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped>
</style>
