"use client"

import { useState } from "react"
import { Relationship, type RelationshipItem } from "@/registry/default/ui/relationship"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const fullDataset: RelationshipItem[] = [
  {
    id: 1,
    title: "React Performance Optimization",
    type: "post",
    status: "publish",
    taxonomy: ["React", "Performance", "JavaScript"],
    excerpt: "Learn advanced techniques to optimize React applications for better performance and user experience...",
    date: "2024-01-15",
    featured_image: "https://picsum.photos/400/300?random=1",
    url: "/posts/react-performance",
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    type: "post",
    status: "publish",
    taxonomy: ["TypeScript", "Best Practices", "Development"],
    excerpt: "Comprehensive guide to TypeScript best practices and coding patterns for enterprise applications...",
    date: "2024-01-10",
    featured_image: "https://picsum.photos/400/300?random=2",
    url: "/posts/typescript-best-practices",
  },
  {
    id: 3,
    title: "CSS Grid Mastery",
    type: "tutorial",
    status: "publish",
    taxonomy: ["CSS", "Grid", "Layout"],
    excerpt: "Master CSS Grid layout with practical examples and real-world use cases...",
    date: "2024-01-05",
    featured_image: "https://picsum.photos/400/300?random=3",
    url: "/tutorials/css-grid",
  },
  {
    id: 4,
    title: "Next.js 14 Features",
    type: "guide",
    status: "publish",
    taxonomy: ["Next.js", "React", "Framework"],
    excerpt: "Explore the latest features in Next.js 14 and how to use them in your projects...",
    date: "2024-01-20",
    featured_image: "https://picsum.photos/400/300?random=4",
    url: "/guides/nextjs-14",
  },
  {
    id: 5,
    title: "Database Optimization",
    type: "guide",
    status: "draft",
    taxonomy: ["Database", "Performance", "SQL"],
    excerpt: "Optimize database queries and improve application performance with these proven techniques...",
    date: "2024-01-12",
    featured_image: "https://picsum.photos/400/300?random=5",
    url: "/guides/database-optimization",
  },
  {
    id: 6,
    title: "Microservices Architecture",
    type: "tutorial",
    status: "publish",
    taxonomy: ["Architecture", "Microservices", "Backend"],
    excerpt: "Build scalable microservices architecture with Docker and Kubernetes...",
    date: "2024-01-08",
    featured_image: "https://picsum.photos/400/300?random=6",
    url: "/tutorials/microservices",
  },
  {
    id: 7,
    title: "GraphQL API Design",
    type: "post",
    status: "publish",
    taxonomy: ["GraphQL", "API", "Backend"],
    excerpt: "Design efficient GraphQL APIs with proper schema design and resolver patterns...",
    date: "2024-01-25",
    featured_image: "https://picsum.photos/400/300?random=7",
    url: "/posts/graphql-api",
  },
  {
    id: 8,
    title: "Testing Strategies",
    type: "guide",
    status: "publish",
    taxonomy: ["Testing", "QA", "Development"],
    excerpt: "Comprehensive testing strategies for modern web applications...",
    date: "2024-01-18",
    featured_image: "https://picsum.photos/400/300?random=8",
    url: "/guides/testing-strategies",
  },
  {
    id: 9,
    title: "DevOps Fundamentals",
    type: "tutorial",
    status: "private",
    taxonomy: ["DevOps", "CI/CD", "Infrastructure"],
    excerpt: "Learn DevOps fundamentals including CI/CD pipelines and infrastructure as code...",
    date: "2024-01-03",
    featured_image: "https://picsum.photos/400/300?random=9",
    url: "/tutorials/devops",
  },
  {
    id: 10,
    title: "Security Best Practices",
    type: "guide",
    status: "publish",
    taxonomy: ["Security", "Web Security", "Best Practices"],
    excerpt: "Essential security best practices for web applications and APIs...",
    date: "2024-01-14",
    featured_image: "https://picsum.photos/400/300?random=10",
    url: "/guides/security",
  },
]

export default function RelationshipAdvancedDemo() {
  const [selectedItems, setSelectedItems] = useState<RelationshipItem[]>([])
  const [returnFormat, setReturnFormat] = useState<"object" | "id">("object")
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const [minItems, setMinItems] = useState(2)
  const [maxItems, setMaxItems] = useState(5)
  const [isRequired, setIsRequired] = useState(true)
  const [error, setError] = useState<string>("")

  const handleChange = (items: RelationshipItem[] | string[] | number[]) => {
    if (returnFormat === "object") {
      setSelectedItems(items as RelationshipItem[])
    } else {
      // Convert IDs back to objects for display
      const ids = items as (string | number)[]
      const objects = fullDataset.filter(item => ids.includes(item.id))
      setSelectedItems(objects)
    }
    
    // Clear error when valid selection is made
    if (isRequired && (items as any[]).length >= minItems) {
      setError("")
    }
  }

  const handleValidate = () => {
    if (isRequired && selectedItems.length < minItems) {
      setError(`Minimum ${minItems} items required`)
      return false
    }
    setError("")
    return true
  }

  const handleSave = () => {
    if (handleValidate()) {
      alert(`Saved ${selectedItems.length} items with return format: ${returnFormat}`)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Relationship Configuration</CardTitle>
          <CardDescription>
            Comprehensive example showcasing all relationship features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="relationship" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="relationship">Relationship</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="relationship" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="all-features"
                  checked={showAllFeatures}
                  onCheckedChange={setShowAllFeatures}
                />
                <Label htmlFor="all-features">Show all display features</Label>
              </div>

              <Relationship
                items={fullDataset}
                selectedItems={selectedItems}
                onChange={handleChange}
                multiple={true}
                min={minItems}
                max={maxItems}
                required={isRequired}
                returnFormat={returnFormat}
                postTypes={["post", "guide", "tutorial"]}
                postStatuses={["publish", "draft", "private"]}
                taxonomies={["React", "TypeScript", "CSS", "Next.js", "Database", "GraphQL", "Testing", "Security"]}
                showFilters={true}
                showFeaturedImage={showAllFeatures}
                showExcerpt={true}
                showDate={showAllFeatures}
                showPreview={showAllFeatures}
                sortable={showAllFeatures}
                instructions="Select content items for your collection. Use filters to narrow down results."
                searchPlaceholder="Search by title, content, or tags..."
                error={error}
                variant={error ? "error" : "default"}
              />

              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  Save Selection
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedItems([])
                    setError("")
                  }}
                >
                  Clear All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleValidate}
                >
                  Validate
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="return-format">Return Format</Label>
                    <select
                      id="return-format"
                      value={returnFormat}
                      onChange={(e) => setReturnFormat(e.target.value as "object" | "id")}
                      className="w-full mt-1 p-2 border rounded"
                    >
                      <option value="object">Object Array</option>
                      <option value="id">ID Array</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="min-items">Minimum Items</Label>
                    <input
                      id="min-items"
                      type="number"
                      min="0"
                      max="10"
                      value={minItems}
                      onChange={(e) => setMinItems(parseInt(e.target.value))}
                      className="w-full mt-1 p-2 border rounded"
                    />
                  </div>

                  <div>
                    <Label htmlFor="max-items">Maximum Items</Label>
                    <input
                      id="max-items"
                      type="number"
                      min="1"
                      max="20"
                      value={maxItems}
                      onChange={(e) => setMaxItems(parseInt(e.target.value))}
                      className="w-full mt-1 p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="required"
                      checked={isRequired}
                      onCheckedChange={setIsRequired}
                    />
                    <Label htmlFor="required">Required Field</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="features"
                      checked={showAllFeatures}
                      onCheckedChange={setShowAllFeatures}
                    />
                    <Label htmlFor="features">Enhanced Display</Label>
                  </div>

                  <div className="p-3 bg-muted/30 rounded">
                    <h4 className="font-medium text-sm mb-2">Current Settings</h4>
                    <div className="space-y-1 text-xs">
                      <div>Min: {minItems}, Max: {maxItems}</div>
                      <div>Required: {isRequired ? 'Yes' : 'No'}</div>
                      <div>Return: {returnFormat}</div>
                      <div>Features: {showAllFeatures ? 'All' : 'Basic'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="output" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Selected Items ({selectedItems.length})</h4>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
                        {showAllFeatures && item.featured_image && (
                          <img
                            src={item.featured_image}
                            alt={item.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    {selectedItems.length === 0 && (
                      <p className="text-muted-foreground text-sm text-center py-8">
                        No items selected
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Raw Output</h4>
                  <div className="bg-muted/30 p-3 rounded text-xs font-mono max-h-80 overflow-y-auto">
                    <pre>
                      {JSON.stringify(
                        returnFormat === "object" 
                          ? selectedItems.map(item => ({
                              id: item.id,
                              title: item.title,
                              type: item.type,
                              status: item.status
                            }))
                          : selectedItems.map(item => item.id),
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 