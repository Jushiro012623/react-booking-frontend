import { addToast } from "@heroui/toast";

export const showToast = (
  title: string,
  description: string,
  color: "default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger"
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