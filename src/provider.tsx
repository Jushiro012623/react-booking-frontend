import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import BookingContextProvider from "./context/bookingContextProvider";
import { ToastProvider } from "@heroui/toast";
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
    const placement = 'top-right'
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
        <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0}/>
        <BookingContextProvider>
            {children}
        </BookingContextProvider>
    </HeroUIProvider>
  );
}
