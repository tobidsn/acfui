"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Check,
  ChevronDown,
  Eye,
  GripVertical,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const postObjectVariants = cva(
  "relative w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus:ring-destructive",
      },
      size: {
        sm: "h-9 px-3 py-2 text-xs",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-11 px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface PostObjectItem {
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

export interface PostObjectFilter {
  search?: string
  post_type?: string[]
  post_status?: string[]
  taxonomy?: string[]
}

export interface PostObjectProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onChange" | "onLoad" | "onSelect" | "onRemove"
    >,
    VariantProps<typeof postObjectVariants> {
  // Data props
  items?: PostObjectItem[]
  selectedItems?: PostObjectItem[]

  // Configuration
  multiple?: boolean
  allowNull?: boolean
  required?: boolean

  // Async data loading
  onLoad?: (filter: PostObjectFilter) => Promise<PostObjectItem[]>
  loading?: boolean

  // Filtering options
  postTypes?: string[]
  postStatuses?: string[]
  taxonomies?: string[]
  showFilters?: boolean | string[]

  // Display options
  showPreview?: boolean
  showFeaturedImage?: boolean
  showExcerpt?: boolean
  showDate?: boolean
  sortable?: boolean

  // Return format
  returnFormat?: "object" | "id"

  // Event handlers
  onChange?: (items: PostObjectItem[] | string[] | number[] | null) => void
  onSelect?: (item: PostObjectItem) => void
  onRemove?: (item: PostObjectItem) => void

  // Labels and messages
  placeholder?: string
  searchPlaceholder?: string
  noItemsText?: string
  loadingText?: string
  instructions?: string

  // Validation
  error?: string
}

const PostObject = React.forwardRef<HTMLDivElement, PostObjectProps>(
  (
    {
      className,
      variant,
      size,
      items = [],
      selectedItems = [],
      multiple = false,
      allowNull = true,
      required = false,
      onLoad,
      loading = false,
      postTypes = [],
      postStatuses = [],
      taxonomies = [],
      showFilters = false,
      showPreview = false,
      showFeaturedImage = false,
      showExcerpt = false,
      showDate = false,
      sortable = false,
      returnFormat = "object",
      onChange,
      onSelect,
      onRemove,
      placeholder = "Select post...",
      searchPlaceholder = "Search posts...",
      noItemsText = "No posts found",
      loadingText = "Loading...",
      instructions,
      error,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedPostType, setSelectedPostType] = React.useState<string>("all")
    const [selectedPostStatus, setSelectedPostStatus] = React.useState<string>("all")
    const [selectedTaxonomy, setSelectedTaxonomy] = React.useState<string>("all")
    const [availableItems, setAvailableItems] = React.useState<PostObjectItem[]>(items)
    const [internalSelected, setInternalSelected] = React.useState<PostObjectItem[]>(selectedItems || [])
    const [isLoading, setIsLoading] = React.useState(loading)

    // Debounced search
    React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (onLoad) {
          setIsLoading(true)
          const filter: PostObjectFilter = {
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
      (item: PostObjectItem) => {
        let newSelected: PostObjectItem[]

        if (multiple) {
          if (internalSelected.some((selected) => selected.id === item.id)) {
            // Remove if already selected
            newSelected = internalSelected.filter((selected) => selected.id !== item.id)
          } else {
            // Add to selection
            newSelected = [...internalSelected, item]
          }
        } else {
          // Single selection - replace current selection
          newSelected = [item]
          setOpen(false)
        }

        setInternalSelected(newSelected)
        onSelect?.(item)

        if (onChange) {
          const result = returnFormat === "object" 
            ? newSelected 
            : newSelected.map((item) => item.id) as string[] | number[]
          onChange(result)
        }
      },
      [internalSelected, multiple, returnFormat, onChange, onSelect]
    )

    const handleRemoveItem = React.useCallback(
      (item: PostObjectItem) => {
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

    const handleClearAll = React.useCallback(() => {
      setInternalSelected([])
      if (onChange) {
        onChange(returnFormat === "object" ? [] : [])
      }
    }, [onChange, returnFormat])

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

    const getDisplayText = () => {
      if (internalSelected.length === 0) return placeholder
      if (internalSelected.length === 1) return internalSelected[0]?.title || placeholder
      return `${internalSelected.length} posts selected`
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* Instructions */}
        {instructions && (
          <p className="text-sm text-muted-foreground">{instructions}</p>
        )}

        {/* Filters */}
        {isFiltersVisible && postTypes.length > 0 && (
          <div className="space-y-3 p-3 border rounded-md bg-muted/30">
            <div className="flex flex-col gap-3 sm:flex-row">
              {shouldShowPostType && postTypes.length > 0 && (
                <Select value={selectedPostType} onValueChange={setSelectedPostType}>
                  <SelectTrigger className="w-full sm:w-[140px]">
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
                  <SelectTrigger className="w-full sm:w-[140px]">
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
                  <SelectTrigger className="w-full sm:w-[140px]">
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

        {/* Main Selection Interface */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                postObjectVariants({ variant, size }),
                "justify-between font-normal",
                internalSelected.length === 0 && "text-muted-foreground"
              )}
            >
              <span className="truncate">{getDisplayText()}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              {shouldShowSearch && (
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
              )}
              <CommandList>
                <CommandEmpty>
                  {isLoading ? loadingText : noItemsText}
                </CommandEmpty>
                {allowNull && internalSelected.length > 0 && (
                  <CommandGroup>
                    <CommandItem onSelect={handleClearAll} className="text-muted-foreground">
                      <X className="mr-2 h-4 w-4" />
                      Clear selection{multiple && "s"}
                    </CommandItem>
                  </CommandGroup>
                )}
                <CommandGroup>
                  {filteredItems
                    .filter((item): item is PostObjectItem => item != null && item.id !== undefined)
                    .map((item) => {
                      const isSelected = internalSelected.some((selected) => selected.id === item.id)
                      
                      return (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleSelectItem(item)}
                          className="flex items-center gap-3 p-3"
                        >
                          <div className="flex h-4 w-4 items-center justify-center">
                            {isSelected && <Check className="h-4 w-4" />}
                          </div>
                          
                          {showFeaturedImage && item.featured_image && (
                            <img
                              src={item.featured_image}
                              alt={item.title}
                              className="h-8 w-8 rounded object-cover"
                            />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate">{item.title}</span>
                              {item.status && item.status !== "publish" && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.status}
                                </Badge>
                              )}
                              {item.type && (
                                <Badge variant="outline" className="text-xs">
                                  {item.type}
                                </Badge>
                              )}
                            </div>
                            
                            {showExcerpt && item.excerpt && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {item.excerpt}
                              </p>
                            )}
                            
                            {showDate && item.date && (
                              <span className="text-xs text-muted-foreground">
                                {item.date}
                              </span>
                            )}
                          </div>
                          
                          {showPreview && item.url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </CommandItem>
                      )
                    })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Selected Items (for multiple selection) */}
        {multiple && internalSelected.length > 0 && (
          <div className="space-y-2 p-3 border rounded-md bg-muted/30">
            <h4 className="text-sm font-medium">Selected Posts</h4>
            <div className="space-y-1">
              {internalSelected.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 bg-background rounded border"
                >
                  {sortable && (
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  )}
                  
                  {showFeaturedImage && item.featured_image && (
                    <img
                      src={item.featured_image}
                      alt={item.title}
                      className="h-6 w-6 rounded object-cover"
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium truncate">{item.title}</span>
                    {item.type && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {item.type}
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
PostObject.displayName = "PostObject"

export { PostObject, postObjectVariants } 