export function useRemoveNullValues() {
    const removeNullValues = (obj: Record<string, any>): Record<string, any> => {
      // Create a new object with keys that have non-null and non-empty string values
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== "")
      );
    };
  
    return {
      removeNullValues,
    };
  }
  