<template>
    <div class="bg-white">
      <div class="container mx-auto px-4 py-16">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <!-- Content -->
          <div class="w-full md:w-1/2">
            <h1 class="text-4xl font-serif text-green-800 mb-8">Contact Us</h1>
            
            <p class="text-lg mb-8">
              Need legal assistance or have questions about our services? We're here to help.
            </p>
            
            <h2 class="text-3xl font-serif text-green-800 mb-6">Call</h2>
            
            <ul class="space-y-2 mb-8">
              <li class="text-lg">+234 5421 675 3880</li>
              <li class="text-lg">+234 5421 675 3880</li>
              <li class="text-lg">+234 5421 675 3880</li>
            </ul>
            
            <h2 class="text-3xl font-serif text-green-800 mb-6">Send A Mail</h2>
            
            <p class="text-lg mb-8">
              Rocksmithlawchamber@gmail.com
            </p>
            
            <!-- Contact Form -->
            <form @submit.prevent="submitForm" class="space-y-6 mt-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-gray-700 mb-2">Name</label>
                  <input 
                    v-model="form.name" 
                    type="text" 
                    id="name" 
                    class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label for="email" class="block text-gray-700 mb-2">Email</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    id="email" 
                    class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label for="subject" class="block text-gray-700 mb-2">Subject</label>
                <input 
                  v-model="form.subject" 
                  type="text" 
                  id="subject" 
                  class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label for="message" class="block text-gray-700 mb-2">Message</label>
                <textarea 
                  v-model="form.message" 
                  id="message" 
                  rows="5" 
                  class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <!-- Image -->
          <div class="w-full md:w-1/2">
            <div class="rounded-3xl overflow-hidden">
              <img 
                src="@/assets/img/contact-us.png" 
                alt="Customer Service" 
                class="w-full h-auto object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  
  const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const submitForm = () => {
    // In a real app, this would send the form data to an API
    console.log('Form submitted:', form);
    
    // Reset form after submission
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
    
    // Show success message
    alert('Your message has been sent successfully!');
  };
  </script>