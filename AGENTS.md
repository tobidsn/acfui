# Agent Guidelines for ACFUI

## Commands
- **Package Manager**: pnpm
- **Build**: `turbo build`
- **Lint**: `turbo lint` / `turbo lint:fix`
- **Typecheck**: `turbo typecheck`
- **Format**: `turbo format`
- **Test**: `turbo test` / `turbo test:watch`
- **Single test**: `vitest run path/to/file.test.ts`

## Code Style
- **TypeScript**: Strict mode, interfaces over types, no enums
- **Formatting**: Biome (2 spaces, organize imports enabled)
- **React**: Functional components, prefer server components, minimize 'use client'
- **Naming**: camelCase, onCallback pattern, descriptive names with auxiliary verbs
- **Imports**: Named exports for components, lowercase-with-dashes for directories
- **State**: Avoid multiple useState, prefer state machines, derived values over effects
- **Error Handling**: Use try/catch for async operations, throw descriptive errors
- **UI**: Shadcn UI + Radix UI + Tailwind CSS, responsive mobile-first design

## Cursor Rules
- Follow `.cursor/rules/react-guidelines.mdc` and `.cursor/rules/react-patterns.mdc`
- UIs as thin wrappers over data, avoid unnecessary local state
- Component abstractions over complex conditionals
- Explicit logic over effect-driven patterns
- Minimize useEffect, setState, 'use client' directives