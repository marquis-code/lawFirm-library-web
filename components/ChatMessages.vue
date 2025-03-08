<!-- components/ChatMessages.vue -->
<template>
    <div class="w-full space-y-4 p-4">
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        class="max-w-3xl transition-all duration-300 ease-in-out"
        :class="[
          message.type === 'user' ? 'ml-auto' : 'mr-auto',
          'animate-fade-in'
        ]"
      >
        <div 
          class="p-3 rounded-lg"
          :class="message.type === 'user' ? 'bg-purple-100 text-purple-900' : 'bg-gray-100'"
        >
          <p>{{ message.text }}</p>
        </div>
      </div>
      
      <div v-if="isLoading" class="flex space-x-2 mr-auto">
        <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
        <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    messages: Array<{type: 'user' | 'bot', text: string}>;
    isLoading: boolean;
  }>();
  
  // Add CSS animation for fade-in effect
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
  </script>