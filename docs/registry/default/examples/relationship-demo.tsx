"use client"

import { useState } from "react"
import { Relationship, type RelationshipItem } from "@/registry/default/ui/relationship"

const posts = [
  {
    id: 1,
    title: "Getting Started with React",
    type: "post",
    status: "publish" as const,
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    type: "post", 
    status: "publish" as const,
  },
  {
    id: 3,
    title: "Building UIs with Tailwind CSS",
    type: "post",
    status: "draft" as const,
  },
  {
    id: 4,
    title: "State Management Guide",
    type: "guide",
    status: "publish" as const,
  },
  {
    id: 5,
    title: "API Design Best Practices",
    type: "guide",
    status: "publish" as const,
  },
  {
    id: 6,
    title: "Component Architecture",
    type: "tutorial",
    status: "publish" as const,
  },
] satisfies RelationshipItem[]

export default function RelationshipDemo() {
  const [selectedPosts, setSelectedPosts] = useState<RelationshipItem[]>([])

  return (
    <div className="w-full max-w-4xl">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Related Posts</h3>
          <p className="text-sm text-muted-foreground">
            Select up to 3 related posts to display
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Choose posts that are related to the current content
        </p>

        <Relationship
          items={posts}
          selectedItems={selectedPosts}
          onChange={(items) => setSelectedPosts(items as RelationshipItem[])}
          multiple={true}
          max={3}
          showFilters={["search", "post_type", "taxonomy"]}
          postTypes={["post", "guide", "tutorial"]}
          taxonomies={["React", "JavaScript", "TypeScript", "CSS", "Tailwind"]}
          searchPlaceholder="Search posts..."
        />
        
        <div className="text-sm text-muted-foreground">
          {selectedPosts.length} selected / 3 max
        </div>
      </div>
    </div>
  )
} 