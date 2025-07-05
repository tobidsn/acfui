"use client"

import { useState } from "react"
import { PostObject, type PostObjectItem } from "@/registry/default/ui/post-object"

const posts = [
  {
    id: 1,
    title: "Getting Started with React",
    type: "post",
    status: "publish" as const,
    excerpt: "Learn the fundamentals of React development with this comprehensive guide.",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    type: "post", 
    status: "publish" as const,
    excerpt: "Explore advanced TypeScript patterns for better type safety.",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "Building UIs with Tailwind CSS",
    type: "post",
    status: "draft" as const,
    excerpt: "Create beautiful, responsive interfaces with Tailwind CSS.",
    date: "2024-01-05",
  },
  {
    id: 4,
    title: "State Management Guide",
    type: "guide",
    status: "publish" as const,
    excerpt: "Complete guide to managing state in modern React applications.",
    date: "2024-01-20",
  },
  {
    id: 5,
    title: "API Design Best Practices",
    type: "guide",
    status: "publish" as const,
    excerpt: "Design robust APIs that scale with your application needs.",
    date: "2024-01-12",
  },
] satisfies PostObjectItem[]

export default function PostObjectDemo() {
  const [selectedPost, setSelectedPost] = useState<PostObjectItem | null>(null)

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Featured Post</h3>
        <p className="text-sm text-muted-foreground">
          Select a post to feature on the homepage
        </p>
      </div>

      <PostObject
        items={posts}
        selectedItems={selectedPost ? [selectedPost] : []}
        onChange={(items) => {
          const postItems = items as PostObjectItem[]
          setSelectedPost(postItems.length > 0 ? postItems[0] || null : null)
        }}
        multiple={false}
        allowNull={true}
        postTypes={[]}
        postStatuses={["publish", "draft"]}
        showFilters={["search", "post_type"]}
        placeholder="Select a featured post..."
        searchPlaceholder="Search posts..."
        showExcerpt={true}
        showDate={true}
      />

      {selectedPost && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium">Selected Post:</h4>
          <div className="mt-2">
            <div className="font-medium">{selectedPost.title}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {selectedPost.excerpt}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span className="capitalize">{selectedPost.type}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span className="capitalize">{selectedPost.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 