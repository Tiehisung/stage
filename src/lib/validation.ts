/**
 *
 * @param {*} input Defines any input string to be validated against unacceptable characters.
 * Accepted characters include [QWERTYUIOPASDFGHJKLZXCVBNM_-0123456789]
 * @returns Character caught or "". Use "" to determine validity as not character is returned.
 */
export const validateChars = (
  input: string,
  valid = "QWERTYUIOPASDFGHJKLZXCVBNM_-0123456789"
) => {
  for (let x of input.toLowerCase()) {
    if (!valid.toLowerCase().includes(x)) {
      return "` " + x + " ` not valid input.";
    }
  }
  return "";
};
export const inputValidator = (
  input: string,
  valid = "QWERTYUIOPASDFGHJKLZXCVBNM_-0123456789"
) => {
  for (let x of input.toLowerCase()) {
    if (!valid.toLowerCase().includes(x + "")) {
      return x;
    }
  }
  return "";
};
