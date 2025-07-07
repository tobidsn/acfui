import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-fd-card py-6 text-fd-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-muted-foreground text-sm">
          Built by{" "}
          <a
            href={siteConfig.links.medium}
            rel="noreferrer noopener"
            target="_blank"
            className="font-medium underline underline-offset-4 transition-colors hover:text-foreground/80"
          >
            @tobidsn
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
