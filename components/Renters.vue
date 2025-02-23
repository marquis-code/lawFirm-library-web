<template>
  <div class="w-full bg-white  pt-32  max-w-7xl mx-auto px-6">
    <section class="flex justify-center items-center flex-col">
      <div class="">
        <img data-aos="fade-up" src="@/assets/icons/agent-tag.svg" />
      </div>
      <h1 data-aos="fade-up" class="text-2xl md:text-3xl font-bold pb-6 lg:pb-0 text-[#1D2739] text-center mt-4">
        Connect with renters effortlessly
      </h1>
    </section>
    <section class="lg:hidden">
      <h2 data-aos="fade-up" class="text-xl  font-medium lg:block text-[#1D2739]  mt-4">
        Want to become an agent at BlacCountry?
      </h2>
      <p data-aos="fade-up" class="text-[#1D2739]  leading-snug text-base max-w-lg mt-2">
        Help tenants find the perfect shared living space by managing property
        viewings, providing expert guidance, and ensuring a smooth move-in
        process—all while earning commissions for successful rentals.
      </p>
      <div data-aos="fade-up" class="pt-6">
        <button @click="router.push('/contact-us')"
          class="mt-4 w-full lg:w-auto bg-[#292929] text-white px-10 py-3.5 rounded-lg">
          Contact us
        </button>
      </div>
      <div class="pt-20">
        <img data-aos="fade-up" src="@/assets/img/renters.svg" alt="Agent" />
      </div>
      <div class="h-full pt-20">
          <div class="h-full  rounded-[40px] flex justify-end items-end flex-col">
            <div class="space-y-6">
              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  1
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Take the First Step</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Show your interest by sending us an email. Help tenants find the perfect home,
                    manage property viewings, and earn commissions for successful rentals.
                  </p>
                </div>
              </div>

              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  2
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Accept Invitation</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Join the platform through invitation from the property manager
                  </p>
                </div>
              </div>

              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  3
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Receive Property Assignments and set your availability</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Get properties assigned by property managers, Schedule available dates and times for property
                    viewings
                  </p>
                </div>
              </div>

              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  4
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Manage Tours and earn your commission</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Conduct and assist potential tenants, Get paid for successfully renting out properties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <section class="max-w-7xl mx-auto px-6 -mt-10 hidden lg:block">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Left Section -->
        <div class="flex flex-col h-full">
          <!-- Image Container -->
          <div class="relative mt-16">
            <div class="absolute -z-10 bg-[#E8F3F1] rounded-[40px] w-[85%] h-[75%] top-10 left-10"></div>
            <img src="@/assets/img/renters.svg" alt="Property Agent"
              class="relative z-10 w-[559px] h-[562px] rounded-[40px]" />
          </div>

          <div class="flex flex-col justify-between flex-grow">
            <div class="space-y-6 mb-8">
              <h1 class="text-[30px] max-w-xl leading-tight font-semibold text-[#1D2739]">
                Want to become an agent at BlacCountry?
              </h1>
              <p class="text-[#1D2739] text-lg leading-snug">
                Help tenants find the perfect shared living space by managing property viewings,
                providing expert guidance, and ensuring a smooth move-in process—all while earning
                commissions for successful rentals.
              </p>
            </div>

            <button @click="router.push('/contact-us')"
              class="w-fit bg-[#292929] text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-gray-800">
              Contact us
            </button>
          </div>
        </div>

        <!-- Right Section - Full Height Background -->
        <div class="h-full">
          <div class="h-full  rounded-[40px] flex justify-end items-end flex-col">
            <div class="space-y-6">
              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  1
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Take the First Step</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Show your interest by sending us an email. Help tenants find the perfect home,
                    manage property viewings, and earn commissions for successful rentals.
                  </p>
                </div>
              </div>

              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  2
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Accept Invitation</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Join the platform through invitation from the property manager
                  </p>
                </div>
              </div>

              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  3
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Receive Property Assignments and set your availability</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Get properties assigned by property managers, Schedule available dates and times for property
                    viewings
                  </p>
                </div>
              </div>

              <div class="flex gap-6 bg-[#F9FAFB] py-7 px-6 rounded-2xl">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-xl flex items-center justify-center text-xl font-semibold">
                  4
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-3">Manage Tours and earn your commission</h3>
                  <p class="text-[#1D2739] text-sm leading-snug">
                    Conduct and assist potential tenants, Get paid for successfully renting out properties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
// Component logic can be added here if needed
</script>