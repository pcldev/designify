export const cleanStackTrace = (stackTrace: string) => {
  // Split the stack trace by lines and return an array of cleaned lines
  return stackTrace
    .split("\n")
    .filter((line) => !line.includes("Error") && !line.includes("node_modules")) // Exclude Error and internal lines
    .map((line) => line.trim()); // Return an array of clean lines
};
