<template>
    <nav class="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between w-full max-w-4xl mx-auto mt-4">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
        <span class="text-black font-semibold text-lg">B<span class="font-light">LackCountry</span></span>
      </div>
      
      <!-- Navigation Links -->
      <ul class="hidden md:flex space-x-6 text-gray-700 text-sm">
        <li><a href="#" class="hover:text-black">Tenants</a></li>
        <li><a href="#" class="hover:text-black">Agents</a></li>
        <li><a href="#" class="hover:text-black">Service providers</a></li>
        <li><a href="#" class="hover:text-black">About Us</a></li>
      </ul>
      
      <!-- Login Button -->
      <button class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900">Login</button>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  nav {
    backdrop-filter: blur(10px);
  }
  </style>
  