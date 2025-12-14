"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider
        placement={"top-right"}
        toastProps={{
          timeout: 2000,
        }}
      />
      {children}
    </HeroUIProvider>
  );
}
