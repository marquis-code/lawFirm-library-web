<template>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Books</h1>
        </div>
  
        <!-- Index Filter -->
        <BookIndexFilter />
  
        <!-- Books List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="book in filteredBooks" 
            :key="book.id"
            class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <NuxtLink :to="`/book/${book.id}`" class="block">
              <div class="aspect-w-3 aspect-h-4 bg-gray-200">
                <!-- @/assets/img/book-store2.jpg -->
                <!-- <img 
                  :src="book.coverImage || '/placeholder.svg?height=400&width=300'" 
                  :alt="book.title"
                  class="object-cover w-full h-full"
                /> -->
                <img 
                  src="@/assets/img/book-store2.jpg" 
                  :alt="book.title"
                  class="object-cover w-full h-full"
                />
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ book.title }}</h3>
                <p class="text-sm text-gray-600 mb-2">by {{ book.author }}</p>
                <div class="flex items-center justify-between">
                  <span 
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      book.availability === 'Available' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ book.availability }}
                  </span>
                  <span class="text-sm text-gray-500">{{ book.catalogNumber }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
  
        <!-- Empty State -->
        <div 
          v-if="filteredBooks.length === 0" 
          class="text-center py-12"
        >
          <p class="text-gray-500">
            No books found{{ activeLetterFilter ? ` starting with '${activeLetterFilter}'` : '' }}.
          </p>
          <button
            v-if="activeLetterFilter"
            @click="clearLetterFilter"
            class="mt-4 text-green-700 hover:text-green-800"
          >
            Clear filter
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useBooks } from '@/composables/useBooks';
  const { filteredBooks, activeLetterFilter, clearLetterFilter } = useBooks()

  definePageMeta({
    layout: 'dashboard'
})
  </script>
  
  <style>
  .aspect-w-3 {
    position: relative;
    padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
  }
  
  .aspect-h-4 {
    --tw-aspect-h: 4;
  }
  
  .aspect-w-3 {
    --tw-aspect-w: 3;
  }
  
  .aspect-w-3 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  </style>