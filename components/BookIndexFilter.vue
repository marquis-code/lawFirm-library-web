<!-- <template>
    <div class="w-full max-w-4xl mx-auto my-10">
      <div class="bg-white rounded-lg shadow p-4 mb-8">
        <div class="grid grid-cols-13 gap-2 text-center">
          <button
            v-for="letter in 'ABCDEFGHIJKLM'"
            :key="letter"
            @click="setLetterFilter(letter)"
            :class="[
              'px-3 py-2 rounded transition-colors',
              activeLetterFilter === letter
                ? 'bg-green-700 text-white'
                : 'hover:bg-green-50 text-green-700'
            ]"
          >
            {{ letter }}
          </button>
        </div>
        <div class="grid grid-cols-13 gap-2 text-center mt-2">
          <button
            v-for="letter in 'NOPQRSTUVWXYZ'"
            :key="letter"
            @click="setLetterFilter(letter)"
            :class="[
              'px-3 py-2 rounded block transition-colors',
              activeLetterFilter === letter
                ? 'bg-green-700 text-white'
                : 'hover:bg-green-50 text-green-700'
            ]"
          >
            {{ letter }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { activeLetterFilter, setLetterFilter } = useBooks()
  </script> -->

  <template>
    <div class="mb-6">
      <div class="flex flex-wrap justify-center gap-2 mb-4">
        <button
          v-for="letter in alphabet"
          :key="letter"
          @click="filterByLetter(letter)"
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
            activeLetterFilter === letter
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ letter }}
        </button>
        <button
          @click="clearLetterFilter"
          :class="[
            'px-3 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
            !activeLetterFilter
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          All
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  // Generate alphabet array
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  // Active letter filter
  const activeLetterFilter = ref('');
  
  // Emit events for parent component
  const emit = defineEmits(['filter']);
  
  // Filter by letter
  const filterByLetter = (letter: string) => {
    activeLetterFilter.value = letter;
    emit('filter', letter);
  };
  
  // Clear letter filter
  const clearLetterFilter = () => {
    activeLetterFilter.value = '';
    emit('filter', '');
  };
  
  // Expose to parent component
  defineExpose({
    activeLetterFilter,
    clearLetterFilter
  });
  </script>