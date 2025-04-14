/**
 *
 * FORMAT PESO HELPERS
 * @param {number} value - value to format
 * @return formatted to peso value
 *
 */
export const formatToPeso = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};
