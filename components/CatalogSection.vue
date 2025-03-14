<template>
    <div class="catalogs-container">
      <h1 class="catalogs-title">{{ title }}</h1>
      
      <div class="catalogs-grid">
        <!-- Top Row -->
        <CatalogCard 
          v-for="(item, index) in topRow" 
          :key="item.id" 
          :catalog="item" 
          :class="{ 'first-card': index === 0 }"
        />
        
        <!-- Middle Row -->
        <CatalogCard 
          v-if="middleRow.length > 0"
          :catalog="middleRow[0]" 
          class="middle-card"
        />
        
        <!-- Bottom Row -->
        <CatalogCard 
          v-for="(item, index) in bottomRow" 
          :key="item.id" 
          :catalog="item"
          :class="{ 'first-card': index === 0 }"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import CatalogCard from './CatalogCard.vue';
  
  interface Catalog {
    id: number;
    title: string;
    count: number;
    description: string;
    image: string;
  }
  
  const props = defineProps<{
    title: string;
    catalogs: Catalog[];
  }>();
  
  // Split catalogs into rows based on the specific layout
  const topRow = computed(() => props.catalogs.slice(0, 2));
  const middleRow = computed(() => props.catalogs.slice(2, 3));
  const bottomRow = computed(() => props.catalogs.slice(3, 5));
  </script>
  
  <style scoped>
  .catalogs-container {
    padding: 2rem;
    background-color: #e0f5e9;
    min-height: 100vh;
    width: 100%;
  }
  
  .catalogs-title {
    text-align: center;
    color: #2c5e3f;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
  }
  
  .catalogs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto auto;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .middle-card {
    grid-column: 1 / 3;
    max-width: 50%;
    margin: 0 auto;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .catalogs-grid {
      grid-template-columns: 1fr;
    }
    
    .middle-card {
      grid-column: 1;
      max-width: 100%;
    }
    
    .catalogs-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
  
  /* Medium screens */
  @media (min-width: 769px) and (max-width: 1024px) {
    .middle-card {
      max-width: 70%;
    }
  }
  </style>