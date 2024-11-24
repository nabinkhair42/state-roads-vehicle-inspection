export const nestDotNotationObject = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    const keys = key.split(".");

    if (keys.length > 2) {
      throw new Error("Only depth 2 is supported");
    }

    // Initialize the parent object if it doesn't exist
    if (keys.length === 1) {
      result[keys[0]] = obj[key]; // Direct assignment for depth 1
    } else {
      const parentKey = keys[0];
      const childKey = keys[1];

      result[parentKey] = result[parentKey] || {}; // Initialize if not exists
      result[parentKey][childKey] = obj[key]; // Assign the value
    }
  });

  return result;
};
