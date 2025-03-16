<template>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Navigation -->
        <div class="mb-8">
          <NuxtLink 
            to="/books"
            class="text-green-700 hover:text-green-800 flex items-center"
          >
            <ChevronLeftIcon class="h-5 w-5 mr-1" />
            Back to Books
          </NuxtLink>
        </div>
  
        <div v-if="book" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="md:flex">
            <!-- Book Cover -->
            <div class="md:w-1/3">
              <div class="aspect-w-3 aspect-h-4 bg-gray-200">
                <img 
                  :src="book.coverImage || '/placeholder.svg?height=400&width=300'" 
                  :alt="book.title"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
  
            <!-- Book Details -->
            <div class="p-6 md:w-2/3">
              <div class="flex justify-between items-start">
                <div>
                  <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ book.title }}</h1>
                  <p class="text-lg text-gray-600 mb-4">by {{ book.author }}</p>
                </div>
                <button 
                  class="flex items-center text-green-700 hover:text-green-800"
                  @click="addToList"
                >
                  <PlusIcon class="h-5 w-5 mr-1" />
                  Add to list
                </button>
              </div>
  
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Catalog No</h3>
                  <p class="mt-1">{{ book.catalogNumber }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Category</h3>
                  <p class="mt-1">{{ book.category }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Year</h3>
                  <p class="mt-1">{{ book.year }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Location</h3>
                  <p class="mt-1">{{ book.location }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Availability</h3>
                  <p 
                    class="mt-1"
                    :class="book.availability === 'Available' ? 'text-green-700' : 'text-red-700'"
                  >
                    {{ book.availability }}
                  </p>
                </div>
              </div>
  
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">Brief Description</h3>
                <p class="text-gray-600">{{ book.description }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-else class="animate-pulse">
          <div class="md:flex bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="md:w-1/3 bg-gray-200 h-96"></div>
            <div class="p-6 md:w-2/3">
              <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div class="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div v-for="i in 4" :key="i">
                  <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div class="h-6 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div class="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ChevronLeftIcon, PlusIcon } from 'lucide-vue-next'
  
  const route = useRoute()
  const { books } = useBooks()
  
  // Get book by ID
  const book = computed(() => {
    return books.value.find(b => b.id === parseInt(route.params.id as string))
  })
  
  // Add to list functionality
  const addToList = () => {
    // Implement add to reading list functionality
    alert('Added to your reading list!')
  }

  definePageMeta({
    layout: 'dashboard'
})
  </script>