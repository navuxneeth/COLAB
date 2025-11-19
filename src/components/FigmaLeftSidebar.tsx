import { Home, Files, Layers, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FigmaLeftSidebar = () => {
  return (
    <div className="w-60 bg-figma-sidebar border-r border-figma-border flex flex-col h-full">
      {/* Project Header */}
      <div className="h-12 border-b border-figma-border flex items-center px-3">
        <div className="flex items-center gap-2 flex-1">
          <Home className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Weijii</span>
        </div>
      </div>

      {/* File/Assets Tabs */}
      <div className="h-10 border-b border-figma-border flex items-center px-3 gap-4">
        <button className="text-xs font-medium text-foreground border-b-2 border-primary pb-2.5">
          File
        </button>
        <button className="text-xs text-muted-foreground hover:text-foreground pb-2.5">
          Assets
        </button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Search className="w-3 h-3" />
        </Button>
      </div>

      {/* Pages Section */}
      <div className="flex flex-col">
        <div className="h-9 px-3 flex items-center justify-between border-b border-figma-border">
          <span className="text-xs font-medium text-muted-foreground">Pages</span>
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        <div className="px-2 py-1">
          <div className="px-2 py-1.5 text-xs hover:bg-muted/50 rounded cursor-pointer">
            Page 1
          </div>
        </div>
      </div>

      {/* Layers Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-9 px-3 flex items-center justify-between border-y border-figma-border">
          <span className="text-xs font-medium text-muted-foreground">Layers</span>
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <Layers className="w-3 h-3" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-2 py-1 space-y-0.5">
            {["Image 14", "Image 11", "currency_rupee", "calendar_month", "alarm", "Frame 11", "Frame 3"].map((layer, i) => (
              <div
                key={i}
                className="px-2 py-1.5 text-xs hover:bg-muted/50 rounded cursor-pointer flex items-center gap-2"
              >
                <Files className="w-3 h-3 text-muted-foreground" />
                <span>{layer}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
