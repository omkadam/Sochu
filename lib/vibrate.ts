
export const triggerVibration = (duration: number = 50) => {
    // Check if vibration API is available
    if (typeof window !== "undefined" && 
        "vibrate" in navigator) {
      // Trigger vibration with specified duration
      navigator.vibrate(duration);
    }
  };
  
  export const VIBRATION_PATTERNS = {
    click: 50,         // Normal click
    success: [50, 50, 150],  // Success pattern (short-pause-long)
    error: [100, 50, 100],   // Error pattern
    warning: [60, 60]       // Warning pattern
  };
  
  export const triggerVibrationPattern = (pattern: number | number[]) => {
    if (typeof window !== "undefined" && 
        "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };