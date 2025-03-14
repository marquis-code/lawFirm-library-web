<template>
    <div class="catalog-card">
      <div class="card-image">
        <img :src="catalog.image" :alt="catalog.title" />
      </div>
      <div class="card-content">
        <h2 class="card-title">
          {{ catalog.title }} <span class="count">({{ formatCount(catalog.count) }}+)</span>
        </h2>
        <p class="card-description">
          {{ catalog.description }}
        </p>
        <button class="view-button" @click="navigateToCatalog">View</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Catalog {
    id: number;
    title: string;
    count: number;
    description: string;
    image: string;
  }
  
  const props = defineProps<{
    catalog: Catalog;
  }>();
  
  // Format the count with commas for thousands
  const formatCount = (count: number): string => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // This function would navigate to the catalog detail page
  const navigateToCatalog = () => {
    // You can implement navigation logic here
    console.log(`Navigating to catalog: ${props.catalog.title}`);
  };
  </script>
  
  <style scoped>
  .catalog-card {
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .card-image {
    height: 180px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  .count {
    font-weight: 700;
  }
  
  .card-description {
    color: #666;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  .view-button {
    align-self: flex-end;
    background-color: #3c8d50;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-button:hover {
    background-color: #2c6e3c;
  }
  </style>