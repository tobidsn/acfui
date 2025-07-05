import type { Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "camera",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/camera.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "post-object",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["badge", "button", "popover", "command", "select"],
    files: [
      {
        path: "ui/post-object.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "relationship",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["badge", "button", "input", "select", "card"],
    files: [
      {
        path: "ui/relationship.tsx",
        type: "registry:ui",
      },
    ],
  },
];
