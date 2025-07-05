"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Calendar,
  Eye,
  FileText,
  GripVertical,
  Plus,
  Search,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const relationshipVariants = cva("border rounded-lg bg-background", {
  variants: {
    variant: {
      default: "border-border",
      error: "border-destructive",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface RelationshipItem {
  id: string | number
  title: string
  type?: string
  status?: "publish" | "draft" | "private"
  taxonomy?: string[]
  featured_image?: string
  excerpt?: string
  date?: string
  url?: string
}

export interface RelationshipFilter {
  search?: string
  post_type?: string[]
  post_status?: string[]
  taxonomy?: string[]
}

export interface RelationshipProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onChange" | "onLoad" | "onSelect" | "onRemove"
    >,
    VariantProps<typeof relationshipVariants> {
  // Data props
  items?: RelationshipItem[]
  selectedItems?: RelationshipItem[]

  // Configuration
  multiple?: boolean
  min?: number
  max?: number
  required?: boolean

  // Async data loading
  onLoad?: (filter: RelationshipFilter) => Promise<RelationshipItem[]>
  loading?: boolean

  // Filtering options
  postTypes?: string[]
  postStatuses?: string[]
  taxonomies?: string[]
  showFilters?: boolean | string[] // true/false or ['search', 'post_type', 'taxonomy']

  // Display options
  showPreview?: boolean
  showFeaturedImage?: boolean
  showExcerpt?: boolean
  showDate?: boolean
  sortable?: boolean

  // Return format
  returnFormat?: "object" | "id"

  // Event handlers
  onChange?: (items: RelationshipItem[] | string[] | number[]) => void
  onSelect?: (item: RelationshipItem) => void
  onRemove?: (item: RelationshipItem) => void

  // Labels and messages
  searchPlaceholder?: string
  noItemsText?: string
  noSelectedText?: string
  loadingText?: string
  instructions?: string

  // Validation
  error?: string
}

const Relationship = React.forwardRef<HTMLDivElement, RelationshipProps>(
  (
    {
      className,
      variant,
      size,
      items = [],
      selectedItems = [],
      multiple = true,
      min = 0,
      max = 10,
      required = false,
      onLoad,
      loading = false,
      postTypes = [],
      postStatuses = [],
      taxonomies = [],
      showFilters = true,
      showPreview = false,
      showFeaturedImage = false,
      showExcerpt = false,
      showDate = false,
      sortable = false,
      returnFormat = "object",
      onChange,
      onSelect,
      onRemove,
      searchPlaceholder = "Search...",
      noItemsText = "No items found",
      noSelectedText = "No items selected",
      loadingText = "Loading...",
      instructions,
      error,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedPostType, setSelectedPostType] = React.useState<string>("all")
    const [selectedPostStatus, setSelectedPostStatus] = React.useState<string>("all")
    const [selectedTaxonomy, setSelectedTaxonomy] = React.useState<string>("all")
    const [availableItems, setAvailableItems] = React.useState<RelationshipItem[]>(items)
    const [internalSelected, setInternalSelected] = React.useState<RelationshipItem[]>(selectedItems)
    const [isLoading, setIsLoading] = React.useState(loading)

    // Debounced search
    React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (onLoad) {
          setIsLoading(true)
          const filter: RelationshipFilter = {
            search: searchQuery || undefined,
            post_type: selectedPostType === "all" ? postTypes : [selectedPostType],
            post_status: selectedPostStatus === "all" ? postStatuses : [selectedPostStatus],
            taxonomy: selectedTaxonomy === "all" ? undefined : [selectedTaxonomy],
          }

          onLoad(filter)
            .then((loadedItems) => {
              setAvailableItems(loadedItems || [])
              setIsLoading(false)
            })
            .catch(() => {
              setAvailableItems([])
              setIsLoading(false)
            })
        }
      }, 300)

      return () => clearTimeout(timeoutId)
    }, [searchQuery, selectedPostType, selectedPostStatus, selectedTaxonomy, onLoad, postTypes, postStatuses])

    // Update internal state when selectedItems prop changes
    React.useEffect(() => {
      setInternalSelected(selectedItems || [])
    }, [selectedItems])

    // Update available items when items prop changes
    React.useEffect(() => {
      if (!onLoad) {
        setAvailableItems(items || [])
      }
    }, [items, onLoad])

    const handleSelectItem = React.useCallback(
      (item: RelationshipItem) => {
        if (!multiple && internalSelected.length >= 1) return
        if (internalSelected.some((selected) => selected.id === item.id)) return
        if (internalSelected.length >= max) return

        const newSelected = multiple ? [...internalSelected, item] : [item]
        setInternalSelected(newSelected)

        onSelect?.(item)

        if (onChange) {
          const result = returnFormat === "object" 
            ? newSelected 
            : newSelected.map((item) => item.id) as string[] | number[]
          onChange(result)
        }
      },
      [internalSelected, multiple, max, returnFormat, onChange, onSelect]
    )

    const handleRemoveItem = React.useCallback(
      (item: RelationshipItem) => {
        const newSelected = internalSelected.filter(
          (selected) => selected.id !== item.id
        )
        setInternalSelected(newSelected)

        onRemove?.(item)

        if (onChange) {
          const result = returnFormat === "object" 
            ? newSelected 
            : newSelected.map((item) => item.id) as string[] | number[]
          onChange(result)
        }
      },
      [internalSelected, returnFormat, onChange, onRemove]
    )

    const getFilteredItems = React.useCallback(() => {
      if (onLoad) return availableItems.filter(item => item && item.id !== undefined)

      return availableItems.filter((item) => {
        if (!item || item.id === undefined) return false
        
        const matchesSearch = !searchQuery || 
          item.title?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesPostType = selectedPostType === "all" || 
          !selectedPostType || item.type === selectedPostType

        const matchesPostStatus = selectedPostStatus === "all" || 
          !selectedPostStatus || item.status === selectedPostStatus

        const matchesTaxonomy = selectedTaxonomy === "all" || 
          !selectedTaxonomy || item.taxonomy?.includes(selectedTaxonomy)

        return matchesSearch && matchesPostType && matchesPostStatus && matchesTaxonomy
      })
    }, [availableItems, searchQuery, selectedPostType, selectedPostStatus, selectedTaxonomy, onLoad])

    const filteredItems = getFilteredItems()
    const isFiltersVisible = showFilters === true || (Array.isArray(showFilters) && showFilters.length > 0)

    const shouldShowSearch = showFilters === true || (Array.isArray(showFilters) && showFilters.includes("search"))
    const shouldShowPostType = showFilters === true || (Array.isArray(showFilters) && showFilters.includes("post_type"))
    const shouldShowPostStatus = showFilters === true || (Array.isArray(showFilters) && showFilters.includes("post_status"))
    const shouldShowTaxonomy = showFilters === true || (Array.isArray(showFilters) && showFilters.includes("taxonomy"))

    return (
      <div
        ref={ref}
        className={cn(relationshipVariants({ variant, size, className }))}
        {...props}
      >
        {/* Instructions */}
        {instructions && (
          <div className="border-b p-4">
            <p className="text-sm text-muted-foreground">{instructions}</p>
          </div>
        )}

        {/* Filters */}
        {isFiltersVisible && (
          <div className="space-y-3 border-b p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              {shouldShowSearch && (
                <div className="relative flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              )}

              {shouldShowPostType && postTypes.length > 0 && (
                <Select value={selectedPostType} onValueChange={setSelectedPostType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Post type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {postTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {shouldShowPostStatus && postStatuses.length > 0 && (
                <Select value={selectedPostStatus} onValueChange={setSelectedPostStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {postStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {shouldShowTaxonomy && taxonomies.length > 0 && (
                <Select value={selectedTaxonomy} onValueChange={setSelectedTaxonomy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {taxonomies.map((taxonomy) => (
                      <SelectItem key={taxonomy} value={taxonomy}>
                        {taxonomy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Available Items */}
          <Card className="flex flex-col h-96 border-none rounded-none p-0">
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full overflow-y-auto px-4 pt-4 pb-4">
                {loading ? (
                  <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                    {loadingText}
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                    {noItemsText}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredItems.map((item) => {
                      const isSelected = internalSelected.some((selected) => selected.id === item.id)
                      
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "group border rounded-lg p-3 transition-colors",
                            isSelected
                              ? "bg-muted/50 border-muted cursor-default opacity-60"
                              : "cursor-pointer hover:bg-accent"
                          )}
                          onClick={!isSelected ? () => handleSelectItem(item) : undefined}
                        >
                          <div className="flex items-center gap-3">
                            {showFeaturedImage && item.featured_image && (
                              <img
                                src={item.featured_image}
                                alt={item.title}
                                className="w-8 h-8 rounded object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm leading-tight truncate">
                                {item.title}
                              </h4>
                              {showExcerpt && item.excerpt && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {item.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-1">
                                {item.type && (
                                  <Badge variant="secondary" className="text-xs h-5">
                                    {item.type}
                                  </Badge>
                                )}
                                {item.status && item.status !== "publish" && (
                                  <Badge variant="outline" className="text-xs h-5">
                                    {item.status}
                                  </Badge>
                                )}
                                {item.taxonomy?.map((tax) => (
                                  <Badge key={tax} variant="outline" className="text-xs h-5">
                                    {tax}
                                  </Badge>
                                ))}
                                {showDate && item.date && (
                                  <span className="text-xs text-muted-foreground">
                                    {item.date}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={isSelected ? "secondary" : "outline"}
                              className="h-8 w-8 p-0 flex-shrink-0"
                              disabled={isSelected}
                            >
                              {isSelected ? (
                                <X className="h-3 w-3" />
                              ) : (
                                <Plus className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          {showPreview && item.url && (
                            <div className="mt-2 pt-2 border-t">
                              <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-xs"
                                asChild
                              >
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Preview
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Selected Items */}
          <Card className="flex flex-col h-96 border-none rounded-none p-0">
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full overflow-y-auto px-4 pt-4 pb-4">
                {internalSelected.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                    {noSelectedText}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {internalSelected.map((item) => (
                      <div
                        key={item.id}
                        className="group border rounded-lg p-3 bg-accent/50"
                      >
                        <div className="flex items-center gap-3">
                          {sortable && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 cursor-grab flex-shrink-0"
                            >
                              <GripVertical className="h-3 w-3" />
                            </Button>
                          )}
                          {showFeaturedImage && item.featured_image && (
                            <img
                              src={item.featured_image}
                              alt={item.title}
                              className="w-8 h-8 rounded object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-tight truncate">
                              {item.title}
                            </h4>
                            {showExcerpt && item.excerpt && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {item.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              {item.type && (
                                <Badge variant="secondary" className="text-xs h-5">
                                  {item.type}
                                </Badge>
                              )}
                              {item.status && item.status !== "publish" && (
                                <Badge variant="outline" className="text-xs h-5">
                                  {item.status}
                                </Badge>
                              )}
                              {item.taxonomy?.map((tax) => (
                                <Badge key={tax} variant="outline" className="text-xs h-5">
                                  {tax}
                                </Badge>
                              ))}
                              {showDate && item.date && (
                                <span className="text-xs text-muted-foreground">
                                  {item.date}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 flex-shrink-0"
                            onClick={() => handleRemoveItem(item)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {showPreview && item.url && (
                          <div className="mt-2 pt-2 border-t">
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              asChild
                            >
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-3 w-3 mr-1" />
                                Preview
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="bg-muted/30 text-muted-foreground border-t p-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              {required && internalSelected.length < min && (
                <span className="text-destructive">
                  Minimum {min} item{min !== 1 ? "s" : ""} required
                </span>
              )}
              {min > 0 && internalSelected.length >= min && (
                <span className="text-green-600">
                  {internalSelected.length} selected / {min} min required
                </span>
              )}
            </div>
            <div>
              {internalSelected.length} selected{max < Infinity && ` / ${max} max`}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="border-destructive bg-destructive/10 border-t p-3">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
      </div>
    )
  }
)
Relationship.displayName = "Relationship"

export { Relationship, relationshipVariants }
