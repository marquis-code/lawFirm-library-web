<template>
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <h2 class="text-base text-[#1D2739] font-semibold mb-2 mt-4 bg-white border-[0.5px] border-gray-50 py-5 px-3 rounded-lg border-gray-50">Property visitation</h2>
      
      <!-- Days of Week -->
      <div class="grid bg-white grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <button 
          v-for="day in daysOfWeek" 
          :key="day.value"
          :class="[
            'text-xs font-medium flex justify-center items-center rounded-lg p-2.5  transition-all',
            selectedDay === day.value 
              ? 'bg-white border border-[#326543] text-[#326543]' 
              : 'bg-[#F9FAFB] text-[#1D2739]'
          ]"
          @click="selectDay(day.value)"
        >
          {{ day.label }}
        </button>
      </div>
  
      <!-- Time Slots -->
      <div v-if="selectedDay !== null && availableTimesForDay?.length" class="grid py-4 rounded-md border-[0.5px] border-gray-50 bg-white grid-cols-3 lg:grid-cols-4 gap-6 -mt-6">
        <button
          v-for="time in availableTimesForDay"
          :key="time"
          disabled
          :class="[
            'py-3 px-4 text-sm font-medium rounded-lg transition-all',
            selectedTime === time
              ? 'bg-gray-200 text-gray-800'
              : 'text-gray-800'
          ]"
          @click="selectTime(time)"
        >
          {{ time }}
        </button>
      </div>
      <div
      v-else
      class="bg-white px-4 py-5 sm:p-6 h-80 rounded-lg flex flex-col gap-y-4 justify-center border items-center border-gray-50"
    >
      <img
        :src="dynamicIcons('payment-empty-state')"
        alt="leases empty state"
        class=""
      />
      <!-- {{ availabilityList }} -->
      <p class="text-[#1D2739] font-medium">No visitations schedule available</p>
    </div>
  
      <!-- Schedule Button -->
      <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:relative md:border-0 md:bg-transparent md:p-0">
        <!-- <button 
          @click="emit('schedule')"
          :disabled="!canSchedule"
          :class="[
            'w-full py-3.5 text-sm px-6 font-medium rounded-lg transition-al mt-4 w-full bg-[#292929]  text-white  rounded-md',
            canSchedule
              ? 'bg-[#292929] text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Schedule a visit
        </button> -->
        <button 
          @click="handleScheduleVisit"
          class="w-full py-3.5 text-sm px-6 font-medium rounded-lg transition-al mt-4 w-full bg-[#292929]  text-white  rounded-md">
          Schedule a visit
        </button>
        <!-- <a class="w-full py-3.5 text-sm px-6 font-medium block flex justify-c py-5 rounded-lg transition-al mt-4 w-full bg-[#292929]  text-white  rounded-md" href="https://tenantblackcountry.vercel.app/">
          Schedule a visit
        </a> -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  interface VisitInterval {
    id: string
    dayOfWeek: number
    allIntervals: string[]
    // ... other properties
  }

  const handleScheduleVisit = () => {
    window.location.href = "https://tenantblackcountry.vercel.app/"
  }
  
  const props = defineProps<{
    intervals: VisitInterval[]
  }>()
  
  const daysOfWeek = [
    { label: 'Sundays', value: 0 },
    { label: 'Mondays', value: 1 },
    { label: 'Tuesdays', value: 2 },
    { label: 'Wednesdays', value: 3 },
    { label: 'Thursdays', value: 4 },
    { label: 'Fridays', value: 5 },
    { label: 'Saturdays', value: 6 }
  ]

  const emit = defineEmits(['schedule'])
  
  const selectedDay = ref<number | null>(null)
  const selectedTime = ref<string | null>(null)
  
  const availableTimesForDay = computed(() => {
    if (selectedDay.value === null) return []
    
    const daySchedule = props.intervals.find(
      interval => interval.dayOfWeek === selectedDay.value
    )
    
    return daySchedule?.allIntervals || []
  })
  
  const canSchedule = computed(() => 
    selectedDay.value !== null && selectedTime.value !== null
  )
  
  const selectDay = (day: number) => {
    selectedDay.value = day
    selectedTime.value = null
  }
  
  const selectTime = (time: string) => {
    selectedTime.value = time
  }

  // Select the first day on component mount
onMounted(() => {
  // Select first day from the intervals array that has available times
  const firstAvailableDay = props.intervals
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek)[0]?.dayOfWeek ?? daysOfWeek[0].value

  selectDay(firstAvailableDay)
})
  </script>
  
  <style scoped>
  /* Custom scrollbar for time slots container */
  .grid {
    scrollbar-width: thin;
    scrollbar-color: #CBD5E0 #F7FAFC;
  }
  
  .grid::-webkit-scrollbar {
    width: 6px;
  }
  
  .grid::-webkit-scrollbar-track {
    background: #F7FAFC;
  }
  
  .grid::-webkit-scrollbar-thumb {
    background-color: #CBD5E0;
    border-radius: 3px;
  }
  </style>