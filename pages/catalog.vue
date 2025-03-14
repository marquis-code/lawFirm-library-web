<template>
    <div>
      <CatalogSection :title="sectionTitle" :catalogs="catalogData" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import catalog from '@/assets/img/book-store2.jpg'
  import CatalogSection from '~/components/CatalogSection.vue';
  
  // Section title
  const sectionTitle = ref('Our Catalogs.');
  
  // Catalog data
  const catalogData = ref([
    {
      id: 1,
      title: 'Books',
      count: 1200,
      description: 'Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.',
      image: catalog
    },
    {
      id: 2,
      title: 'Statutes',
      count: 2000,
      description: 'Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.',
      image: catalog
    },
    {
      id: 3,
      title: 'Law Reports',
      count: 4000,
      description: 'Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.',
      image: catalog
    },
    {
      id: 4,
      title: 'Articles/Journals',
      count: 4200,
      description: 'Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.',
      image: catalog
    },
    {
      id: 5,
      title: 'Client Files',
      count: 2500,
      description: 'Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.',
      image: catalog
    }
  ]);
  </script>