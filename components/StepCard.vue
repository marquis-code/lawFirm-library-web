  <!-- Step Card Component -->
  <template>
    <div class="flex items-start bg-gray-100 p-4 rounded-lg shadow-sm w-full">
      <div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
        {{ number }}
      </div>
      <div class="ml-4">
        <h4 class="text-lg font-semibold text-gray-900">{{ title }}</h4>
        <p class="text-gray-600 text-sm">{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    number: {
        type: String,
        default: ''
    },
    title: {
       type:  String,
       default: ''
    },
    description: {
        type: String,
        default: ''
    }
  });
  </script>
  