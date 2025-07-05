"use client"

import { useState } from "react"
import { PostObject, type PostObjectItem } from "@/registry/default/ui/post-object"

const posts = [
  {
    id: 1,
    title: "React Performance Optimization",
    type: "post",
    status: "publish" as const,
    taxonomy: ["React", "Performance"],
    excerpt: "Learn advanced techniques to optimize React applications for better performance.",
    date: "2024-01-15",
    featured_image: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    type: "post",
    status: "publish" as const,
    taxonomy: ["TypeScript", "Best Practices"],
    excerpt: "Comprehensive guide to TypeScript best practices for enterprise applications.",
    date: "2024-01-10",
    featured_image: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 3,
    title: "CSS Grid Mastery",
    type: "tutorial",
    status: "publish" as const,
    taxonomy: ["CSS", "Grid"],
    excerpt: "Master CSS Grid layout with practical examples and real-world use cases.",
    date: "2024-01-05",
    featured_image: "https://picsum.photos/400/300?random=3",
  },
  {
    id: 4,
    title: "Next.js 14 Features",
    type: "guide",
    status: "publish" as const,
    taxonomy: ["Next.js", "React"],
    excerpt: "Explore the latest features in Next.js 14 and how to use them in your projects.",
    date: "2024-01-20",
    featured_image: "https://picsum.photos/400/300?random=4",
  },
  {
    id: 5,
    title: "Database Optimization",
    type: "guide",
    status: "draft" as const,
    taxonomy: ["Database", "Performance"],
    excerpt: "Optimize database queries and improve application performance.",
    date: "2024-01-12",
    featured_image: "https://picsum.photos/400/300?random=5",
  },
  {
    id: 6,
    title: "GraphQL API Design",
    type: "post",
    status: "publish" as const,
    taxonomy: ["GraphQL", "API"],
    excerpt: "Design efficient GraphQL APIs with proper schema design and resolver patterns.",
    date: "2024-01-25",
    featured_image: "https://picsum.photos/400/300?random=6",
  },
  {
    id: 7,
    title: "Testing Strategies",
    type: "guide",
    status: "publish" as const,
    taxonomy: ["Testing", "QA"],
    excerpt: "Comprehensive testing strategies for modern web applications.",
    date: "2024-01-18",
    featured_image: "https://picsum.photos/400/300?random=7",
  },
  {
    id: 8,
    title: "DevOps Fundamentals",
    type: "tutorial",
    status: "private" as const,
    taxonomy: ["DevOps", "Infrastructure"],
    excerpt: "Learn DevOps fundamentals including CI/CD pipelines and infrastructure as code.",
    date: "2024-01-03",
    featured_image: "https://picsum.photos/400/300?random=8",
  },
] satisfies PostObjectItem[]

export default function PostObjectMultipleDemo() {
  const [selectedPosts, setSelectedPosts] = useState<PostObjectItem[]>([])

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Related Content</h3>
        <p className="text-sm text-muted-foreground">
          Select up to 5 related posts to display in the sidebar
        </p>
      </div>

      <PostObject
        items={posts}
        selectedItems={selectedPosts}
        onChange={(items) => setSelectedPosts(items as PostObjectItem[])}
        multiple={true}
        postTypes={["post", "guide", "tutorial"]}
        postStatuses={["publish", "draft", "private"]}
        taxonomies={["React", "TypeScript", "CSS", "Next.js", "Database", "GraphQL", "Testing", "DevOps"]}
        showFilters={["search", "post_type", "post_status", "taxonomy"]}
        placeholder="Select related posts..."
        searchPlaceholder="Search by title or content..."
        showExcerpt={true}
        showDate={true}
        showFeaturedImage={true}
        instructions="Choose posts that are related to the current content. You can select up to 5 posts."
      />

      {selectedPosts.length > 0 && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-3">Selected Posts ({selectedPosts.length}):</h4>
          <div className="grid gap-3">
            {selectedPosts.map((post) => (
              <div key={post.id} className="flex items-center gap-3 p-3 bg-background rounded border">
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{post.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {post.excerpt}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {post.type}
                    </span>
                    <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded">
                      {post.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  {post.taxonomy && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.taxonomy.map((tag) => (
                        <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 