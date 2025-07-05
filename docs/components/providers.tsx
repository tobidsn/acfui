"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { RootProvider } from "fumadocs-ui/provider";
import type { RootProviderProps } from "fumadocs-ui/provider/base";
import { Provider as JotaiProvider, createStore } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const store = createStore();

interface ProvidersProps extends RootProviderProps {
  children: React.ReactNode;
}

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <RootProvider {...props}>
      <NuqsAdapter>
        <JotaiProvider store={store}>
          <TooltipProvider delayDuration={240}>{children}</TooltipProvider>
        </JotaiProvider>
      </NuqsAdapter>
    </RootProvider>
  );
}
