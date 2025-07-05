"use client"

import { useState } from "react"
import { Relationship, type RelationshipItem } from "@/registry/default/ui/relationship"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const parentPages: RelationshipItem[] = [
  {
    id: 1,
    title: "Documentation",
    type: "page",
    status: "publish",
    taxonomy: ["Navigation"],
    excerpt: "Main documentation section containing all guides and tutorials",
    date: "2024-01-01",
    url: "/docs",
  },
  {
    id: 2,
    title: "Blog",
    type: "page",
    status: "publish",
    taxonomy: ["Content"],
    excerpt: "Blog section with articles and updates",
    date: "2024-01-01",
    url: "/blog",
  },
  {
    id: 3,
    title: "Products",
    type: "page",
    status: "publish",
    taxonomy: ["Commerce"],
    excerpt: "Product catalog and information",
    date: "2024-01-01",
    url: "/products",
  },
  {
    id: 4,
    title: "About",
    type: "page",
    status: "publish",
    taxonomy: ["Company"],
    excerpt: "Company information and team details",
    date: "2024-01-01",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    type: "page",
    status: "publish",
    taxonomy: ["Support"],
    excerpt: "Contact information and support channels",
    date: "2024-01-01",
    url: "/contact",
  },
  {
    id: 6,
    title: "Legal",
    type: "page",
    status: "draft",
    taxonomy: ["Legal"],
    excerpt: "Legal documents and privacy policy",
    date: "2024-01-01",
    url: "/legal",
  },
]

export default function RelationshipSingleDemo() {
  const [selectedParent, setSelectedParent] = useState<RelationshipItem[]>([])
  const [error, setError] = useState<string>("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    if (selectedParent.length === 0) {
      setError("Please select a parent page")
      return
    }
    setError("")
    const firstParent = selectedParent[0]
    if (firstParent) {
      alert(`Form submitted with parent page: ${firstParent.title}`)
    }
  }

  const handleChange = (items: RelationshipItem[] | string[] | number[]) => {
    // Since we're using returnFormat="object" (default), items will be RelationshipItem[]
    const relationshipItems = items as RelationshipItem[]
    setSelectedParent(relationshipItems)
    if (submitted && relationshipItems.length > 0) {
      setError("")
    }
  }

  const selectedPage = selectedParent.length > 0 ? selectedParent[0] : null

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Settings</CardTitle>
          <CardDescription>
            Configure the parent page for this content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Parent Page <span className="text-destructive">*</span>
            </label>
            <Relationship
              items={parentPages}
              selectedItems={selectedParent}
              onChange={handleChange}
              multiple={false}
              max={1}
              required={true}
              postTypes={["page"]}
              taxonomies={["Navigation", "Content", "Commerce", "Company", "Support", "Legal"]}
              showFilters={["search", "taxonomy"]}
              showExcerpt={true}
              instructions="Select the parent page where this content should be nested"
              searchPlaceholder="Search parent pages..."
              noItemsText="No parent pages found"
              noSelectedText="No parent page selected"
              error={error}
              variant={error ? "error" : "default"}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit}>
              Save Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedParent([])
                setError("")
                setSubmitted(false)
              }}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedPage && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Parent Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{selectedPage.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedPage.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {selectedPage.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedPage.url}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 