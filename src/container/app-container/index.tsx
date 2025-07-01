// src/components/providers/AppProviders.tsx
"use client";

import { Toaster } from "sonner";
import ReduxProvider from "@/container/redux-container";
import { RootLayoutContent } from "@/components/layout/root-layout";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
      <Toaster />
    </ReduxProvider>
  );
};
