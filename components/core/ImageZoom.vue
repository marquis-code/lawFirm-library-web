<template>
  <main>
    <div  @click="toggleImage">
      <img
        :src="src"
        :class="computedClasses"
        :style="style"
        alt="Zoomed Image"
      />
    </div>
    <transition name="fade-zoom" appear>
      <div
        v-if="isFullScreen"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        @click.self="toggleImage"
      >
     <div class="relative">
      <button
            class="absolute right-3 top-3 text-white bg-gray-800 rounded-full p-2"
            @click="toggleImage"
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8327 4.16699L4.16602 15.8337M4.16602 4.16699L15.8327 15.8337" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </button>
        <!-- <img
          alt="Full-screen image"
          :src="src"
          class="max-w-screen-lg max-h-screen-lg object-contain transition-transform duration-500 ease-in-out"
        /> -->
        <img
          alt="Full-screen image"
          :src="src"
          class="h-full w-[500px] object-contain transition-transform rounded-lg duration-500 ease-in-out"
        />
     </div>
      </div>
    </transition>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: "",
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});

// Define the isFullScreen state
const isFullScreen = ref(false);

// Function to toggle full-screen mode
const toggleImage = () => {
  isFullScreen.value = !isFullScreen.value;
};

// Compute the classes for the image
const computedClasses = computed(() => {
  const defaultClasses = "transition-transform duration-200 ease-in-out";
  return `${defaultClasses} ${props.class}`;
});
</script>
                                                                                                                                                    
<!-- <style scoped>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style> -->

<style scoped>
/* Define the enter/leave transition classes */
.fade-zoom-enter-active, .fade-zoom-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-zoom-enter-from, .fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.fade-zoom-enter-to, .fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style> 
