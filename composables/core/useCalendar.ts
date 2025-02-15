import { ref, computed } from 'vue'
import { useNuxtApp } from '#app'

interface Availability {
  id: string
  dayOfMonth: number | null
  dayOfWeek: number
  startDate: string
  endDate: string
  intervals: {
    start: string
    end: string
    times: string[]
  }[]
  allIntervals: string[]
}

interface DayInfo {
  date: number
  fullDate: string
  isAvailable: boolean
  isWithinRange: boolean
}

import { useFetchAvailabilityTimes } from '@/composables/modules/visitation/useGetAvailabilityTimes'
import { useFetchHouseAvailability } from '@/composables/modules/visitation/useFetchHoseAvailabilityById'

export const useCalendar = (houseId: string) => {
  const { $dayjs } = useNuxtApp()
  const currentMonth = ref($dayjs())
  const selectedDate = ref<string>('')
  const selectedTime = ref<string>('')
  // const availabilities = ref<Availability[]>([])

  const { loading: fetchingAvailabilities, availabilityList } = useFetchHouseAvailability()
  const { getAvailabilityTimes, loading: fetchingAvailabilityTimes, availabilityTimesList: availabilityTimes } = useFetchAvailabilityTimes()

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const formattedMonth = computed(() => {
    return currentMonth.value.format('MMMM YYYY')
  })

  const getDaysInMonth = computed(() => {
    const firstDayOfMonth = currentMonth.value.startOf('month')
    const daysInMonth = currentMonth.value.daysInMonth()
    const firstDayWeekday = firstDayOfMonth.day()

    const days: (DayInfo | null)[][] = []
    let currentWeek: (DayInfo | null)[] = []

    // Fill in empty days at start
    for (let i = 0; i < firstDayWeekday; i++) {
      currentWeek.push(null)
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = currentMonth.value.date(date)
      const fullDate = currentDate.format('YYYY-MM-DD')

      // Check if the date is within any availability range
      const isAvailable = availabilityList.value.some((availability) =>
        $dayjs(fullDate).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]') &&
        availability.dayOfWeek === currentDate.day()
      )

      const isWithinRange = availabilityList.value.some((availability) =>
        $dayjs(fullDate).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]')
      )

      currentWeek.push({
        date,
        fullDate,
        isAvailable,
        isWithinRange
      })

      if (currentWeek.length === 7) {
        days.push(currentWeek)
        currentWeek = []
      }
    }

    // Fill in empty days at end
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      days.push(currentWeek)
    }

    return days
  })

  const availabilityTimesList = computed(() => {
    if (!availabilityList.value.length || !selectedDate.value) return []

    const selectedDayOfWeek = $dayjs(selectedDate.value).day()

    // Find the relevant availability for the selected date availabilityTimes
    const relevantAvailabilities = availabilityList.value.filter((availability) =>
      $dayjs(selectedDate.value).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]') &&
      availability.dayOfWeek === selectedDayOfWeek
    )

    return relevantAvailabilities.flatMap((availability) =>
      availability.allIntervals.map(time => ({ time, isAvailable: true }))
    )
  })

  const filteredAvailabilityTimes = computed(() => {
    if (!availabilityTimes.value.length || !selectedDate.value) return [];
  
    const now = $dayjs(); // Current date and time
    const currentDate = $dayjs(selectedDate.value).startOf('day'); // Normalize selectedDate to start of the day
  
    // Map through availability times and set availability for past times to false
    return availabilityTimes.value.map((timeObj) => {
      // Combine the selected date and time from the timeObj to create a complete datetime
      const time = $dayjs(`${selectedDate.value} ${timeObj.time}`, 'YYYY-MM-DD hh:mm A');
  
      // Check if the time is in the future or not
      const isAvailable = time.isAfter(now) && time.isSameOrAfter(currentDate);
  
      return {
        ...timeObj,
        isAvailable,
      };
    });
  });
  

  const navigateMonth = (direction: 'prev' | 'next') => {
    currentMonth.value = direction === 'prev' 
      ? currentMonth.value.subtract(1, 'month')
      : currentMonth.value.add(1, 'month')
  }

  const handleDateSelect = async (date: string) => {
    console.log(date, 'fate')
    selectedDate.value = date
    selectedTime.value = ''
    await getAvailabilityTimes(date);
  }

  return {
    formattedMonth,
    selectedDate,
    selectedTime,
    weekDays,
    getDaysInMonth,
    navigateMonth,
    handleDateSelect,
    availabilityTimesList,
    fetchingAvailabilities,
    fetchingAvailabilityTimes,
    availabilityTimes,
    filteredAvailabilityTimes
  }
}
