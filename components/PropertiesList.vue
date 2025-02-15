<template>
    <section v-if="!loadingProperties && propertiesList.length" class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 gap-x-6 px-3 py-1 rounded-lg">
            <img src="@/assets/icons/corporate.svg" alt="icon" class="w-10 h-10" />
            <h2 class="text-2xl font-semibold text-[#1D2739]">Featured Properties</h2>
          </div>
        </div>

        <div class="overflow-x-auto sm:overflow-hidden">
          <div class="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-max sm:w-auto">
            <!-- class="bg-white overflow-hidden transition transform hover:scale-105 min-w-[300px] sm:min-w-0" -->
            <div
              v-for="(property, index) in properties"
              :key="index"
              class="bg-white overflow-hidden  min-w-[300px] sm:min-w-0"
            >
            <ImageCarousel  v-if="property?.images?.length" :property="property"  />
            <img
            @click="router.push(`/property/${property.id}`)"
            v-else
            class="rounded-lg cursor-pointer"
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="alt"
          />
          <section
            @click="router.push(`/property/${property.id}`)"
            class="space-y-2 cursor-pointer"
          >
            <div>
              <h3 class="text- font-medium text-[#1D2739] mt-4">
                {{ property?.name }}
              </h3>
              <p class="text-[#79797F] text-sm items-center flex gap-x-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.94366 12.4644C7.69072 12.7012 7.35257 12.8337 7.00064 12.8337C6.64872 12.8337 6.31062 12.7012 6.05762 12.4644C3.74093 10.2822 0.636277 7.84435 2.15032 4.30513C2.96895 2.3915 4.93403 1.16699 7.00064 1.16699C9.06727 1.16699 11.0323 2.3915 11.851 4.30513C13.3631 7.83992 10.2661 10.2897 7.94366 12.4644Z"
                    fill="#5B8469"
                    stroke="#5B8469"
                  />
                  <path
                    d="M9.04165 6.41667C9.04165 7.54425 8.12756 8.45833 6.99998 8.45833C5.8724 8.45833 4.95831 7.54425 4.95831 6.41667C4.95831 5.28908 5.8724 4.375 6.99998 4.375C8.12756 4.375 9.04165 5.28908 9.04165 6.41667Z"
                    fill="#EAEAEA"
                    stroke="#5B8469"
                  />
                </svg>

                {{ property?.address }}
              </p>
            </div>
            <p class="text-[#1D2739] font-medium text-sm">
              {{ property.bedroomCount }} bedrooms |
              {{ property.bathroomCount }} baths | {{ property.size }}
              {{ property.sizeUnit }}
            </p>
            <p class="text-[#1D2739] text-sm">{{ property.available }}</p>
            <p class="text-[#1D2739] text-sm">
              {{ property.availableRoomsCount }} rooms avail.
              <span class="font-medium text-[#326543]">Now</span>
              <span :class="[property.futureAvailableRoomsCount === 0 ? 'hidden' : '']">
               | {{ property.futureAvailableRoomsCount }} room avail. on
                {{ moment(property.leastAvailableDate).format("MMMM Do YYYY") }}
              </span>
            </p>
          </section>
            </div>
          </div>
        </div>

        <div class="mt-16 text-center w-full">
          <button @click="handleSignin" class="bg-[#292929] w-full lg:w-auto text-white px-6 py-3.5 text-base rounded-lg font-medium">
            Browse more properties
          </button>
        </div>
      </div>
    </section>
    <div
    v-else-if="loadingProperties && !propertiesList.length"
    class="border-[0.5px] bg-gray-100 relative cursor-pointer container  shadow rounded-md w-full mx-auto"
    >
    <div class="animate-pulse flex space-x-4">
        <div class="rounded-md bg-slate-100 h-96 w-full"></div>
    </div>
    </div>
    <div
    v-else
    class="bg-white px-4 py-5 container mx-auto sm:p-6 h-80 rounded-lg flex flex-col gap-y-4 justify-center border items-center border-gray-50"
  >
    <img
      :src="dynamicIcons('payment-empty-state')"
      alt="leases empty state"
      class=""
    />
    <p class="text-[#1D2739]">No Properties available</p>
  </div>
  </template>

  <script setup lang="ts">
  import moment from "moment";
  import { useGetProperties } from "@/composables/modules/property/fetchProperties";
  const { propertiesList, loadingProperties } = useGetProperties();
  const router = useRouter()

  const computedList = computed(() => {
    return propertiesList.value.slice(0, 8)
  })

  const props = defineProps({
    properties: {
      type: Array,
      default: () => []
    }
  })

  const handleSignin = () => {
    window.location.href = "https://tenantblackcountry.vercel.app/"
  }
  </script>

  <style scoped>
  </style>
