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
  {
    name: "table-field",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["button", "input"],
    files: [
      {
        path: "ui/table-field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "one-click-blog-post",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react", "sonner"],
    registryDependencies: ["button", "input", "card", "label", "tooltip"],
    files: [
      {
        path: "ui/one-click-blog-post.tsx",
        type: "registry:ui",
      },
    ],
  },
];
