import dayjs from 'dayjs';

interface AvailabilityTime {
  time: string; // Format: "hh:mm A"
  isAvailable: boolean;
}

export function useProcessAvailabilityTimes() {
  const processAvailabilityTimes = (times: AvailabilityTime[]): AvailabilityTime[] => {
    if (!Array.isArray(times)) {
      console.error('Invalid input: times is not an array', times);
      return [];
    }

    const now = dayjs(); // Current date and time
    const today = dayjs().startOf('day'); // Current day at 00:00

    return times.map((timeObj, index) => {
      if (!timeObj.time || typeof timeObj.time !== 'string') {
        console.error(`Invalid time format at index ${index}`, timeObj);
        return { ...timeObj, isAvailable: false };
      }

      // Parse the time with today's date
      const parsedTime = dayjs(`${now.format('YYYY-MM-DD')} ${timeObj.time}`, 'YYYY-MM-DD hh:mm A');

      if (!parsedTime.isValid()) {
        console.error(`Failed to parse time at index ${index}`, timeObj.time);
        return { ...timeObj, isAvailable: false };
      }

      // Logic: Disable past times only for the current date
      const isAvailable =
        (today.isSame(parsedTime, 'day') && parsedTime.isAfter(now)) || // For today: only future times
        today.isBefore(parsedTime, 'day') || // For future dates: retain original availability
        timeObj.isAvailable; // Keep original availability for other cases

      return {
        ...timeObj,
        isAvailable, // Update the availability based on the above logic
      };
    });
  };

  return { processAvailabilityTimes };
}
