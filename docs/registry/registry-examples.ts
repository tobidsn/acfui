import type { Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "camera-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-mask-square-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-mask-square-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-mask-round-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-mask-round-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-mask-card-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-mask-card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-manual-control-demo",
    type: "registry:example",
    registryDependencies: ["camera", "button"],
    files: [
      {
        path: "examples/camera-manual-control-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-custom-capture-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["camera", "button"],
    files: [
      {
        path: "examples/camera-custom-capture-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-permission-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "camera",
      "button",
      "card",
      "alert",
      "badge",
      "dialog",
    ],
    files: [
      {
        path: "examples/camera-permission-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-size-default-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-size-default-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-size-small-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-size-small-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-size-large-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-size-large-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-size-xl-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-size-xl-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-aspect-4-3-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-aspect-4-3-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-aspect-16-9-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-aspect-16-9-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-aspect-1-1-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-aspect-1-1-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-mirror-false-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-mirror-false-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-mirror-true-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-mirror-true-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "camera-mirror-preview-demo",
    type: "registry:example",
    registryDependencies: ["camera"],
    files: [
      {
        path: "examples/camera-mirror-preview-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "post-object-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "post-object",
      "badge",
      "button",
      "popover",
      "command",
      "select",
    ],
    files: [
      {
        path: "examples/post-object-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "post-object-multiple-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "post-object",
      "badge",
      "button",
      "popover",
      "command",
      "select",
    ],
    files: [
      {
        path: "examples/post-object-multiple-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "post-object-async-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "post-object",
      "badge",
      "button",
      "popover",
      "command",
      "select",
    ],
    files: [
      {
        path: "examples/post-object-async-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "relationship-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "relationship",
      "badge",
      "button",
      "input",
      "select",
    ],
    files: [
      {
        path: "examples/relationship-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "relationship-single-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "relationship",
      "badge",
      "button",
      "input",
      "select",
      "card",
    ],
    files: [
      {
        path: "examples/relationship-single-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "relationship-async-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "relationship",
      "badge",
      "button",
      "input",
      "select",
    ],
    files: [
      {
        path: "examples/relationship-async-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "relationship-advanced-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "relationship",
      "badge",
      "button",
      "input",
      "select",
      "card",
      "switch",
      "label",
      "tabs",
    ],
    files: [
      {
        path: "examples/relationship-advanced-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "table-field-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["table-field", "button", "input"],
    files: [
      {
        path: "examples/table-field-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "table-field-add-column-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["table-field", "button", "input"],
    files: [
      {
        path: "examples/table-field-add-column-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "table-field-add-row-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["table-field", "button", "input"],
    files: [
      {
        path: "examples/table-field-add-row-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "table-field-dynamic-demo",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["table-field", "button", "input"],
    files: [
      {
        path: "examples/table-field-dynamic-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "one-click-blog-post-demo",
    type: "registry:example",
    dependencies: ["lucide-react", "sonner"],
    registryDependencies: ["one-click-blog-post"],
    files: [
      {
        path: "examples/one-click-blog-post-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
