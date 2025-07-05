"use client"

import { useState } from "react"
import { PostObject, type PostObjectItem, type PostObjectFilter } from "@/registry/default/ui/post-object"

// Simulate a large dataset
const mockDatabase = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    type: "post",
    status: "publish" as const,
    taxonomy: ["React", "JavaScript", "Frontend"],
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components...",
    date: "2024-01-15",
    featured_image: "https://picsum.photos/400/300?random=1",
    url: "/posts/react-hooks-intro",
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    type: "post",
    status: "publish" as const,
    taxonomy: ["TypeScript", "Advanced", "Development"],
    excerpt: "Explore advanced TypeScript patterns including conditional types, mapped types, and template literals...",
    date: "2024-01-10",
    featured_image: "https://picsum.photos/400/300?random=2",
    url: "/posts/advanced-typescript",
  },
  {
    id: 3,
    title: "Building Responsive UIs",
    type: "tutorial",
    status: "publish" as const,
    taxonomy: ["CSS", "Responsive", "UI"],
    excerpt: "Create beautiful, responsive user interfaces that work on all devices...",
    date: "2024-01-05",
    featured_image: "https://picsum.photos/400/300?random=3",
    url: "/tutorials/responsive-ui",
  },
  {
    id: 4,
    title: "State Management with Zustand",
    type: "guide",
    status: "publish" as const,
    taxonomy: ["State Management", "Zustand", "React"],
    excerpt: "Learn how to manage application state efficiently with Zustand...",
    date: "2024-01-20",
    featured_image: "https://picsum.photos/400/300?random=4",
    url: "/guides/zustand-state",
  },
  {
    id: 5,
    title: "API Design Best Practices",
    type: "guide",
    status: "draft" as const,
    taxonomy: ["API", "Backend", "REST"],
    excerpt: "Design robust and maintainable APIs that scale with your application...",
    date: "2024-01-12",
    featured_image: "https://picsum.photos/400/300?random=5",
    url: "/guides/api-design",
  },
  {
    id: 6,
    title: "Component Architecture Patterns",
    type: "tutorial",
    status: "publish" as const,
    taxonomy: ["Architecture", "Components", "React"],
    excerpt: "Build scalable component architectures with these proven patterns...",
    date: "2024-01-08",
    featured_image: "https://picsum.photos/400/300?random=6",
    url: "/tutorials/component-architecture",
  },
  {
    id: 7,
    title: "Testing React Components",
    type: "post",
    status: "publish" as const,
    taxonomy: ["Testing", "React", "Jest"],
    excerpt: "Write comprehensive tests for your React components using Jest and React Testing Library...",
    date: "2024-01-25",
    featured_image: "https://picsum.photos/400/300?random=7",
    url: "/posts/testing-react",
  },
  {
    id: 8,
    title: "Performance Optimization",
    type: "guide",
    status: "publish" as const,
    taxonomy: ["Performance", "Optimization", "React"],
    excerpt: "Optimize your React applications for better performance and user experience...",
    date: "2024-01-18",
    featured_image: "https://picsum.photos/400/300?random=8",
    url: "/guides/performance-optimization",
  },
  {
    id: 9,
    title: "Server-Side Rendering with Next.js",
    type: "tutorial",
    status: "draft" as const,
    taxonomy: ["Next.js", "SSR", "React"],
    excerpt: "Implement server-side rendering for better SEO and performance...",
    date: "2024-01-03",
    featured_image: "https://picsum.photos/400/300?random=9",
    url: "/tutorials/nextjs-ssr",
  },
  {
    id: 10,
    title: "Database Design Fundamentals",
    type: "guide",
    status: "publish" as const,
    taxonomy: ["Database", "SQL", "Backend"],
    excerpt: "Learn the fundamentals of database design and normalization...",
    date: "2024-01-14",
    featured_image: "https://picsum.photos/400/300?random=10",
    url: "/guides/database-design",
  },
] satisfies PostObjectItem[]

// Simulate API call with delay
const fetchPosts = async (filter: PostObjectFilter): Promise<PostObjectItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  let filteredPosts = mockDatabase
  
  // Apply search filter
  if (filter.search) {
    const searchTerm = filter.search.toLowerCase()
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt?.toLowerCase().includes(searchTerm) ||
      post.taxonomy?.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }
  
  // Apply post type filter
  if (filter.post_type && filter.post_type.length > 0) {
    filteredPosts = filteredPosts.filter(post => 
      filter.post_type!.includes(post.type || "")
    )
  }
  
  // Apply post status filter
  if (filter.post_status && filter.post_status.length > 0) {
    filteredPosts = filteredPosts.filter(post => 
      filter.post_status!.includes(post.status || "")
    )
  }
  
  // Apply taxonomy filter
  if (filter.taxonomy && filter.taxonomy.length > 0) {
    filteredPosts = filteredPosts.filter(post => 
      post.taxonomy?.some(tag => filter.taxonomy!.includes(tag))
    )
  }
  
  return filteredPosts
}

export default function PostObjectAsyncDemo() {
  const [selectedPosts, setSelectedPosts] = useState<PostObjectItem[]>([])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Dynamic Content Loader</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Search and filter from a large dataset with async loading
        </p>
      </div>

      <PostObject
        onLoad={fetchPosts}
        selectedItems={selectedPosts}
        onChange={(items) => setSelectedPosts(items as PostObjectItem[])}
        multiple={true}
        postTypes={["post", "guide", "tutorial"]}
        postStatuses={["publish", "draft"]}
        taxonomies={["React", "TypeScript", "CSS", "API", "Testing", "Performance"]}
        showFilters={["search", "post_type", "post_status", "taxonomy"]}
        showFeaturedImage={true}
        showExcerpt={true}
        showDate={true}
        showPreview={true}
        instructions="Start typing to search through our content database"
        placeholder="Search posts..."
        searchPlaceholder="Search posts by title, content, or tags..."
        loadingText="Searching content..."
      />

      {selectedPosts.length > 0 && (
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-2">Selected Content ({selectedPosts.length}):</h4>
          <div className="grid gap-2">
            {selectedPosts.map((post) => (
              <div key={post.id} className="flex items-center gap-3 p-2 bg-background rounded border">
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium text-sm">{post.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {post.type} • {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 