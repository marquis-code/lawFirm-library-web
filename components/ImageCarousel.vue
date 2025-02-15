<template>
    <div class="relative w-full h-56">
      <template v-for="(image, index) in property?.images" :key="index">
        <div 
          v-show="currentIndex === index"
          class="absolute top-0 left-0 w-full h-full"
        >
          <img
            :src="image"
            @click="handleImageClick"
            class="absolute top-0 left-0 rounded-lg cursor-pointer object-cover h-full w-full transition-opacity duration-300"
            :alt="`Property image ${index + 1}`"
          />
          <!-- <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 rounded-lg"></div> -->
        </div>
      </template>

      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        <button
          v-for="(_, index) in property?.images"
          :key="index"
          @click="currentIndex = index"
          class="w-2 h-2 rounded-full transition-colors duration-200"
          :class="currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'"
          :aria-label="`Go to image ${index + 1}`"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Property {
    id: string;
    images: string[];
  }
  
  const props = defineProps<{
    property?: Property;
  }>();
  
  const router = useRouter();
  const currentIndex = ref(0);
  
  const previousImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };
  
  const nextImage = () => {
    if (props.property?.images && currentIndex.value < props.property.images.length - 1) {
      currentIndex.value++;
    }
  };
  
  // Optional: Keyboard navigation
  onMounted(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        previousImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };
  
    window.addEventListener('keydown', handleKeydown);
  
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  });

  // const handleImageClick = () => {
  //   if (currentIndex.value > 0) {
  //     currentIndex.value--;
  //   }

  //   if (props.property?.images && currentIndex.value < props.property.images.length - 1) {
  //     currentIndex.value++;
  //   }
  // }

  const handleImageClick = () => {
  if (props.property?.images) {
    if (currentIndex.value < props.property.images.length - 1) {
      currentIndex.value++;
    } else {
      // If it's the last image, reset to the first image
      currentIndex.value = 0;
    }
  }
};
  </script>