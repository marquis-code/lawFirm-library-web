<template>
<main>
  <section class="pt-20 pb-10">
    <div class="flex justify-center items-center min-h-screen  px-4">
    <div class="bg-white p-6 w-full max-w-xl">
      <h2 class="text-3xl lg:text-5xl font-semibold text-center text-[#292929]">Get in touch</h2>
      <p class="text-center text-[#1D2739] mb-6 mt-6">We’d love to hear from you. Please fill out this form.</p>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 mb-1 text-sm">First name</label>
            <input type="text" v-model="form.firstName" class="w-full p-4 border-[0.5px] border-gray-20 outline-none text-sm rounded-md bg-[#E4E7EC]" placeholder="Enter your first name" required>
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm">Last name</label>
            <input type="text" v-model="form.lastName" class="w-full p-4 border-[0.5px] border-gray-20 outline-none text-sm rounded-md bg-[#E4E7EC]" placeholder="Enter your last name" required>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 mb-1 text-sm">Email</label>
          <input type="email" v-model="form.email" class="w-full p-4 border-[0.5px] border-gray-20 outline-none text-sm rounded-md bg-[#E4E7EC]" placeholder="Enter your email address" required>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 mb-1 text-sm">Phone number</label>
          <input type="tel" v-model="form.phone" class="w-full p-4 border-[0.5px] border-gray-20 outline-none text-sm rounded-md bg-[#E4E7EC]" placeholder="Enter your phone number" required>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 mb-1 text-sm">What best describes you?</label>
          <!-- <select placeholder="Enter your response" v-model="form.role" class="w-full p-4 border-[0.5px] border-gray-20 outline-none text-sm rounded-md  bg-[#E4E7EC] ">
            <option value="">Enter your response</option>
            <option value="agent">Agent</option>
            <option value="service-provider">Service Provider</option>
          </select> -->
          <select v-model="form.role" class="w-full p-4 border-[0.5px] border-gray-20 outline-none text-sm rounded-md bg-[#E4E7EC]">
            <option value="" disabled selected>Enter your response</option>
            <option value="agent">Agent</option>
            <option value="service-provider">Service Provider</option>
          </select>

        </div>
        <div v-if="form.role === 'service-provider'" class="mt-4">
          <label class="block text-gray-700 mb-1 text-sm">What service do you offer?</label>
          <!-- <select placeholder="Enter your service title" v-model="form.service" class="w-full p-4 border border-gray-25 rounded-md focus:outline-none bg-[#E4E7EC]">
            <option disabled value="">Enter your service title</option>
            <option>Photography</option>
            <option>Event Planning</option>
            <option>Catering</option>
            <option>Consulting</option>
            <option>Marketing</option>
          </select> -->
          <select v-model="form.service" class="w-full text-sm p-4 border border-gray-25 rounded-md focus:outline-none bg-[#E4E7EC]">
              <option disabled value="">Enter your service title</option>
              <option value="Photography">Photography</option>
              <option value="Event Planning">Event Planning</option>
              <option value="Catering">Catering</option>
              <option value="Consulting">Consulting</option>
              <option value="Marketing">Marketing</option>
            </select>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 mb-1 text-sm">Message</label>
          <textarea v-model="form.message" class="w-full p-4 border rounded-md bg-[#E4E7EC] resize-none" placeholder="Enter your message"></textarea>
        </div>
        <div class="flex items-center mt-4">
          <input type="checkbox" v-model="form.agreed" class="mr-2">
          <label class="text-[#667085] text-sm">You agree to our 
            <NuxtLink class="text-[#326543] font-semibold" :to="form.role === 'agent' ? '/agent-terms' : 'service-provider-terms'" >Terms Of Use</NuxtLink>
            and 
            <NuxtLink class="text-[#326543] font-semibold" to="/privacy">Privacy Policy</NuxtLink>
            .</label>
        </div>
        <div class="pt-5">
          <button type="submit" class="mt-6 w-full bg-[#D75626] text-white py-3.5 rounded-md text-center">Send Message</button>
        </div>
      </form>
    </div>
  </div>
  </section>
  <FaqQuestion />
  <OtherFooterSection />
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  service: '',
  message: '',
  agreed: false
});

const submitForm = () => {
  console.log("Form submitted:", form.value);
};
</script>

<style scoped>
input, textarea, select {
  border: 1px solid #ddd;
}
</style>
