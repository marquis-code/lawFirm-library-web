<template>
    <div class="w-full max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow p-4 mb-8">
        <div class="grid grid-cols-13 gap-2 text-center">
          <button
            v-for="letter in 'ABCDEFGHIJKLM'"
            :key="letter"
            @click="setLetterFilter(letter)"
            :class="[
              'px-3 py-2 rounded transition-colors',
              activeLetterFilter === letter
                ? 'bg-green-700 text-white'
                : 'hover:bg-green-50 text-green-700'
            ]"
          >
            {{ letter }}
          </button>
        </div>
        <div class="grid grid-cols-13 gap-2 text-center mt-2">
          <button
            v-for="letter in 'NOPQRSTUVWXYZ'"
            :key="letter"
            @click="setLetterFilter(letter)"
            :class="[
              'px-3 py-2 rounded transition-colors',
              activeLetterFilter === letter
                ? 'bg-green-700 text-white'
                : 'hover:bg-green-50 text-green-700'
            ]"
          >
            {{ letter }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { activeLetterFilter, setLetterFilter } = useBooks()
  </script>