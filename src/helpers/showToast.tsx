import { addToast } from "@heroui/toast";

/**
 *
 * @param {string} title - toast title
 * @param {string} description - toast description
 * @param {string} color - toast color variant
 * @return toast
 *
 */
export const showToast = (
  title: string,
  description: string,
  color:
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger",
) => {
  addToast({
    shouldShowTimeoutProgress: true,
    timeout: 3000,
    title,
    description,
    variant: "flat",
    color,
  });
};
