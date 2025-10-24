"use client";

import * as React from "react";
import { FileText, HelpCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export interface OneClickBlogPostProps {
  className?: string;
}

export const OneClickBlogPost = React.forwardRef<
  HTMLDivElement,
  OneClickBlogPostProps
>(({ className, ...props }, ref) => {
  const [mainKeyword, setMainKeyword] = React.useState("");
  const [title, setTitle] = React.useState("");

  const handleGenerateTitle = () => {
    // Mock title generation
    setTitle("10 Tips to Boost Your SEO with React");
    toast.success("Title generated successfully!");
  };

  const handleRun = () => {
    // Mock blog post generation
    toast.success("Blog post successfully generated!");
  };

  const mainKeywordLength = mainKeyword.length;
  const titleLength = title.length;

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <Card className="bg-slate-50/50 border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  1-Click Blog Post
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Generate and publish article in 1 click.
                </p>
              </div>
            </div>

            <Button
              onClick={handleRun}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
            >
              <Zap className="mr-2 h-4 w-4" />
              Run
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="main-keyword" className="text-sm font-medium">
                Main Keyword
              </Label>
              <span className="text-xs text-muted-foreground">
                {mainKeywordLength}/80
              </span>
            </div>
            <Input
              id="main-keyword"
              value={mainKeyword}
              onChange={(e) => setMainKeyword(e.target.value.slice(0, 80))}
              placeholder="Enter your main keyword..."
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      This feature lets you generate a blog post instantly using
                      your main keyword.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-xs text-muted-foreground ml-auto">
                {titleLength}/100
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                placeholder="Enter or generate a title..."
                className="flex-1"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateTitle}
                className="shrink-0"
              >
                Generate a Title
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

OneClickBlogPost.displayName = "OneClickBlogPost";
