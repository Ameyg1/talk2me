/**
 * Helps stringify boolean functions where the return value is required as a string.
 * @param booleanValue The boolean value that has to stringified
 * @param trueValue (optional) Returns desired string for booleanValue === true
 * @param falseValue (optional) Returns desired string for booleanValue === false
 */
export const stringify = (
  booleanValue,
  trueValue = "true",
  falseValue = "false"
) => {
  return booleanValue ? trueValue : falseValue;
};

/**
 * Helps convert string to boolean
 * @param stringValue Returns boolean value based on whether the string value
 * @returns TRUE, if stringValue === "true" or is a Truthy string value
 * @returns FALSE, if stringValue === "false" or is a Falsy string value
 */
export const booleanise = stringValue => {
  if (stringValue === "true") {
    return true;
  } else if (stringValue === "false") {
    return false;
  } else {
    return stringValue ? true : false;
  }
};
