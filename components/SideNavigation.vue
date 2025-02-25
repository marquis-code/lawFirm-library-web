<template>
    <main>
        <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>
            <div class="fixed inset-0 flex">
                <div class="relative mr-16 flex w-full max-w-xs flex-1">
                    <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button @click="emit('close')" type="button" class="-m-2.5 p-2.5">
                            <span class="sr-only">Close sidebar</span>
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#292929] px-6 pb-4 ring-1 ring-white/10">
                        <div class="flex h-16 mt-5 shrink-0 items-center">
                            <img class="h-15 w-auto" src="@/assets/icons/logo-with-text.svg" alt="Your Company">
                        </div>
                        <nav class="flex flex-1 flex-col">
                            <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" class="-mx-2 space-y-1">
                                        <li>
                                            <a :class="[router?.currentRoute?.fullPath === '/#tenants' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800']" href="#tenants" @click="handleClick" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold">
                                                <!-- <img src="@/assets/icons/user-type.svg" /> -->
                                                Tenants
                                            </a>
                                        </li>
                                        <li>
                                            <a :class="[router?.currentRoute?.fullPath === '/#agents' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800']" href="#agents" @click="handleClick" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold">
                                                <!-- <img src="@/assets/icons/user-type.svg" /> -->
                                                Agents
                                            </a>
                                        </li>
                                        <li>
                                            <a :class="[router?.currentRoute?.fullPath === '/#service-providers' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800']" href="#service-providers" @click="handleClick" class="group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold">
                                                <!-- <img src="@/assets/icons/user-type.svg" /> -->
                                                Service Providers
                                            </a>
                                        </li>
                                        <li>
                                            <a :class="[router?.currentRoute?.fullPath === '/#about-us' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800']" href="#about-us" @click="handleClick" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold">
                                                <!-- <svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                </svg> -->
                                                About Us
                                            </a>
                                        </li>
                                        <div class="mt-4 flex justify-center relative pt-6" ref="dropdownRef">
                            <button @click="toggleDropdown" class="bg-[#D75626] w-full text-white px-6 py-3 rounded-md  focus:outline-none">
                                Login
                            </button>
                            <div v-if="isDropdownOpen" class="absolute left-0 mt-14 w-60 space-y-5 py-4 bg-white shadow-xl rounded-xl overflow-hidden">
                                <a href="https://tenantblackcountry.vercel.app/login" @click="handleRedirect('tenants')" class="block px-4 cursor-pointer py-2 text-[#1D2739] border-b-[0.5px] border-gray-100 font-semibold flex justify-between items-center">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <img src="@/assets/icons/user-type.svg" />
                                        <span>Tenant</span>
                                    </div>
                                </a>
                                <a href="https://living.blackcountry.africa/agent/" @click="handleRedirect('agents')" class="block px-4 cursor-pointer py-2 pb-4 text-[#1D2739] border-b-[0.5px] border-gray-100 font-semibold flex justify-between items-center">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <img src="@/assets/icons/user-type.svg" />
                                        <span>Agent</span>
                                    </div>
                                </a>
                                <a href="https://living.blackcountry.africa/service-provider/" @click="handleRedirect('service-providers')" class="block px-4 cursor-pointer text-[#1D2739] font-semibold flex justify-between items-center">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <img src="@/assets/icons/user-type.svg" />
                                        <span>Service Provider</span>
                                    </div>
                                </a>
                        <!-- ttps://blackcountryserviceproviders.vercel.app/ -->
                            </div>
                        </div>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['close']);
const router = useRouter();
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const handleClick = () => {
    router.push('/');
    emit('close');
};

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// const handleRedirect = () => {
//     router.push('/contact-us');
//     isDropdownOpen.value = false;
//     emit('close')
// };

const handleRedirect = (item: any) => {
  if(item === 'tenant') {
    //  window.location.href = "https://tenantblackcountry.vercel.app/login/"
     isDropdownOpen.value = false
     emit('close')
  }

  if(item === 'agent') {
    //  window.location.href = "https://blackcountry-agent.vercel.app/"
     isDropdownOpen.value = false
     emit('close')
  }

  if(item === 'service-provider') {
    //  window.location.href = "https://blackcountry-serviceprovider.vercel.app/"
     isDropdownOpen.value = false;
     emit('close')
  }
  // router.push('/contact-us')
  // isDropdownOpen.value = false
}

onClickOutside(dropdownRef, () => {
    isDropdownOpen.value = false;
    emit('close')
});
</script>