<template>
    <main>
        <PropertiesList type="all" :properties="propertiesList" />
    </main>
</template>

<script setup lang="ts">
  import moment from "moment";
  import { useGetProperties } from "@/composables/modules/property/fetchProperties";
  const { propertiesList } = useGetProperties();
  const router = useRouter()

  const computedList = computed(() => {
    return propertiesList.value.slice(0, 8)
  })
  </script>

  <style scoped>
  </style>
