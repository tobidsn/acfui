# Contributing to ACF UI

Thank you for your interest in contributing to ACF UI! This guide will help you get started with contributing to our components and documentation.

## Project Structure

ACF UI is a minimal, modern UI library focused on three core components:
- `camera` — Camera capture and preview
- `post-object` — Post selection dropdown
- `relationship` — Dual-panel relationship selector

**Documentation:**
- `docs/` — Documentation website powered by Next.js and Fumadocs

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
git clone https://github.com/tobidsn/acfui.git
cd acfui
pnpm install
```

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/tobidsn/acfui.git
   cd acfui
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the documentation site:
   ```bash
   pnpm dev:docs
   ```

## Contributing to Components

All components live in `docs/registry/default/ui/`:
- `camera.tsx`
- `post-object.tsx`
- `relationship.tsx`

### Component Guidelines
- Use TypeScript for all code
- Use functional components and interfaces
- Prefer React Server Components where possible
- Follow accessibility best practices (WAI-ARIA, keyboard navigation)
- Use Tailwind CSS and Shadcn UI patterns
- Keep logic modular and declarative

### Example Component Structure

```
docs/registry/default/ui/
├── camera.tsx
├── post-object.tsx
└── relationship.tsx
```

## Contributing to Documentation

### Writing Documentation
- Place new documentation in `docs/content/docs/components/`
- Use MDX format with proper frontmatter (title, description, etc.)
- Follow the style and structure of existing docs
- Include code examples and usage patterns
- Ensure all examples are accessible and use TypeScript

### Example Documentation Structure

```
docs/content/docs/components/
├── camera.mdx
├── post-object.mdx
└── relationship.mdx
```

### Adding Examples
- Add new example demos to `docs/registry/default/examples/`
- Register new examples in the registry if needed
- Test examples in isolation before submitting

## Testing

- Write tests for any new logic or helpers
- Run tests with:
  ```bash
  pnpm test
  ```

## Version Control
- Use semantic versioning
- Use conventional commits:
  - `feat(component): description` for new features
  - `fix(component): description` for bug fixes
  - `docs(component): description` for documentation changes
  - `refactor(component): description` for refactoring
  - `test(component): description` for tests
  - `chore(component): description` for maintenance

## Code Style
- Follow the project's ESLint and Prettier configuration
- Use clear, concise language in documentation
- Prefer interfaces over types in TypeScript
- Use named exports for components

## Submitting Changes
1. Create a new branch for your changes
2. Make your changes following the guidelines above
3. Test your changes locally
4. Submit a pull request with:
   - Clear description of changes
   - Screenshots/videos if UI changes
   - Updated tests and documentation

## Need Help?
- Open an issue for questions or suggestions
- Review existing components and documentation for examples
