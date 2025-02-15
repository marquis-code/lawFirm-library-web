<template>
<main>
    <div  class="flex items-center justify-between px-4">
        <div class="text-lg font-medium text-gray-900">{{propertyObj?.name}}</div>
        <div class="flex items-center space-x-2 ">
          <!-- Dots Icon Button -->
          <button @click="downloadDropdown = true" class="p-2 rounded-lg bg-[#E4E7EC] hover:bg-gray-300">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99219 10H9.99969" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.98828 15H9.99578" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 5H10.0075" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
          </button>
          <div
          v-if="downloadDropdown"
          class="absolute right-44 z-50 top-32 mt-2 w- bg-white border border-gray-200 rounded-md shadow-lg"
        >
          <ul
            class="py-1 text-sm text-gray-700 divide divide-y-[0.5px]"
          >
            <li>
              <a
              @click="deactivateModal = true"
                href="#"
                class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
              >
                Deactivate property</a
              >
            </li>
            <li>
              <a
               @click="deleteModal = true"
                href="#"
                class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
              >
                Delete property</a
              >
            </li>
          </ul>
        </div>
          <!-- Edit Button -->
          <button @click="router.push(`/dashboard/property/${propertyObj.id}/edit`)" class="flex items-center text-sm p-2 bg-[#252525] px-4 gap-x-2 text-white rounded-lg hover:bg-gray-800">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5131 4.15199L14.6811 2.98386C15.3263 2.33871 16.3723 2.33871 17.0175 2.98386C17.6626 3.629 17.6626 4.67498 17.0175 5.32012L15.8493 6.48826M13.5131 4.15199L9.15147 8.51358C8.28041 9.38467 7.84485 9.82016 7.54828 10.3509C7.25169 10.8817 6.9533 12.1349 6.66797 13.3333C7.86638 13.048 9.11964 12.7496 9.65039 12.453C10.1811 12.1564 10.6166 11.7209 11.4877 10.8498L15.8493 6.48826M13.5131 4.15199L15.8493 6.48826" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.5 10C17.5 13.5355 17.5 15.3033 16.4017 16.4017C15.3033 17.5 13.5355 17.5 10 17.5C6.46447 17.5 4.6967 17.5 3.59835 16.4017C2.5 15.3033 2.5 13.5355 2.5 10C2.5 6.46447 2.5 4.6967 3.59835 3.59835C4.6967 2.5 6.46447 2.5 10 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              
            <span>Edit</span>
          </button>
        </div>
      </div>
      <div
      v-if="downloadDropdown"
      @click="downloadDropdown = false"
      class="fixed inset-0 z-40 bg-black opacity-25"
    ></div>
        <CoreReusableModal :isOpen="deleteModal" @close="deleteModal = false" @confirm="handleDeleteConfirm"
        title="Delete Property" :message="`By deleting ${propertyObj.name} Co-Living Space, you will permanently remove the listing from the platform. Are you sure you want to proceed?`" confirmButtonText="Yes, delete"
        cancelButtonText="Cancel" />
      <CoreReusableModal :isOpen="deactivateModal" @close="deactivateModal = false" @confirm="handleDeactivateConfirm"
      title="Deactivate Property" message="Deactivating this property will make it unavailable for new inquiries and listings. You can reactivate it at any time."
      confirmButtonText="Yes, deactivate" cancelButtonText="Cancel" />
  
</main>
</template>

<script setup lang="ts">
// import { useDeleteProperty } from '@/composables/modules/property/delete'
// import { usePropertyDeactivate } from '@/composables/modules/property/deactivate'

// const { deleteProperty, loading: deleting } = useDeleteProperty()
// const {  deactivateProperty, loading,  } = usePropertyDeactivate()
const router = useRouter()
const props = defineProps({
    propertyObj: {
        type: Object,
        default: () => {}
    }
})

const deleteModal = ref(false);
const deactivateModal = ref(false);

const downloadDropdown = ref(false)

// const handleDeleteConfirm = async () => {
//   // Handle delete logic
//   if (props.propertyObj.id) {                                
//     console.log('Property deleted');
//     await deleteProperty(props.propertyObj.id)
//     deleteModal.value = false;
//   }
// };

// const handleDeactivateConfirm = async () => {
//   await deactivateProperty(props.propertyObj.id)
//   deactivateModal.value = false;
// };

</script>