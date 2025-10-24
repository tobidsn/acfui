"use client";

/**
 * @see https://github.com/shadcn-ui/ui/blob/main/apps/www/components/component-source.tsx
 */

import type * as React from "react";

import { cn } from "@/registry/default/lib/utils";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
}

export function ComponentSource({
  children,
  className,
  ...props
}: ComponentSourceProps) {
  return (
    <div
      className={cn(
        "overflow-auto rounded-md border bg-muted p-4 [&_pre]:px-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
