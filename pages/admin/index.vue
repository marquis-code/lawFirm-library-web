<template>
    <div class="min-h-screen bg-green-50 flex flex-col md:flex-row">
      <!-- Logo Section -->
      <div class="w-full md:w-1/2 bg-green-50 flex items-center justify-center p-8 border-r border-green-200">
        <div class="max-w-md">
          <div class="flex hidden lg:block items-center justify-center mb-8">
            <img src="@/assets/icons/logo.svg" alt="Rocksmith Chambers Logo" class="h-20 mr-4" />
          </div>
        </div>
      </div>
      
      <!-- Login Form -->
      <div class="w-full md:w-1/2 flex items-center justify-center p-8">
        <div class="max-w-md w-full">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-serif text-green-800 mb-2">Welcome</h1>
            <p class="text-gray-600">Please Login to Admin Dashboard</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <input 
                v-model="username" 
                type="text" 
                placeholder="Username" 
                class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <input 
                v-model="password" 
                type="password" 
                placeholder="Password" 
                class="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div class="text-right">
              <a href="#" class="text-green-500 hover:underline">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-green-700 disabled:cursor-not-allowed disabled:opacity-25 hover:bg-green-800 text-white py-3 rounded transition-colors"
            >
               {{ loading ? 'processing...' : 'Login' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useLogin } from '@/composables/modules/admin/auth/useLogin';
  import { ref } from 'vue';
  const { login, loading } = useLogin()
  
  const username = ref('');
  const password = ref('');
  
  const handleLogin = async () => {
    // In a real app, this would call an authentication API
    console.log('Logging in with:', username.value, password.value);
    
    // Simulate successful login and redirect
    if (username.value && password.value) {
      // Navigate to dashboard or home page
      await login({type: 'admin', email: username.value, password: password.value})
      // navigateTo('/');
    }
  };

  definePageMeta({
      layout: 'auth'
  })
  </script>