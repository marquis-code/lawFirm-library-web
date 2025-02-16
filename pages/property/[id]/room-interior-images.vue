<template>

  <main>
 <div class="container mx-auto mt-10 p-6">
  <svg @click="router.back()" class="cursor-pointer"  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
    <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
 </div>
    <section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto  px-6">
      <section v-for="(image, index) in previewImages" :key="index" :src="image">
        <div>
          <CoreImageZoom
          :class="'cursor-pointer w-full object-cover'"
          :src="image"
          :style="{ height: '340px' }"
         />
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useUserInitials } from '@/composables/core/useUserInitials';
import { useUser } from '@/composables/auth/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const { user } = useUser();

const goBack = () => {
  router.back()
};

definePageMeta({
  middleware: 'auth'
});

const initials = ref('');
const previewImages = ref<string[]>([]);

onMounted(() => {
  const { getInitials } = useUserInitials(user.value);
  initials.value = getInitials.value;
  const storedImages = localStorage.getItem('selectedImages');
  if (storedImages) {
    previewImages.value = JSON.parse(storedImages);
  }
});;
</script>


<style scoped>
.preview-image {
  width: 200px;
  height: auto;
  margin: 10px;
}
</style>
