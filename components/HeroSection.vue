<template>
    <div class="relative w-full min-h-screen flex items-center justify-center bg-white">
      <div class="text-center px-6 md:px-12">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Live Together, Share Comfortably
        </h1>
        <p class="text-[#1D2739] mt-4 text-lg md:text-xl">
          Find, Share, and Effortlessly Manage Your Ideal Home in One Place.
        </p>
        <div class="mt-6">
          <button class="px-6 py-3 bg-black text-white text-lg font-semibold rounded-full flex items-center gap-2 hover:bg-gray-800 transition">
            Sign up for free
            <span class="ml-2 text-green-500">&rarr;</span>
          </button>
        </div>
      </div>
      <div class="absolute bottom-0 w-full">
        <div class="relative w-full max-w-6xl mx-auto">
          <img 
            src="@/assets/img/hero.svg" 
            alt="Comfortable living space" 
            class="w-full h-auto object-cover rounded-t-3xl shadow-lg"
          />
          <div class="absolute inset-0 bg-white bg-opacity-80 clip-path-custom"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No additional logic required for static UI
  </script>
  
  <style>
  .clip-path-custom {
    clip-path: path('M0,100 Q200,150 400,100 T800,100 L800,400 L0,400 Z');
  }
  </style>
  