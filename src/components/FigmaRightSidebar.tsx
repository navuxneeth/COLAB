import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FigmaRightSidebar = () => {
  return (
    <div className="w-60 bg-figma-sidebar border-l border-figma-border flex flex-col h-full">
      {/* Design/Prototype Toggle */}
      <div className="h-12 border-b border-figma-border flex items-center px-3 gap-2">
        <button className="flex-1 text-xs font-medium text-foreground border-b-2 border-primary pb-2.5">
          Design
        </button>
        <button className="flex-1 text-xs text-muted-foreground hover:text-foreground pb-2.5">
          Prototype
        </button>
        <span className="text-xs text-muted-foreground">21%</span>
      </div>

      <ScrollArea className="flex-1">
        {/* Page Section */}
        <div className="border-b border-figma-border">
          <div className="h-9 px-3 flex items-center justify-between">
            <span className="text-xs font-medium">Page</span>
          </div>
          <div className="px-3 pb-3">
            <div className="bg-muted/30 rounded px-2 py-1.5 text-xs flex items-center justify-between">
              <span>1E1E1E</span>
              <span className="text-muted-foreground">100 %</span>
            </div>
          </div>
        </div>

        {/* Variables Section */}
        <div className="border-b border-figma-border">
          <div className="h-9 px-3 flex items-center justify-between">
            <span className="text-xs font-medium">Variables</span>
          </div>
        </div>

        {/* Styles Section */}
        <div className="border-b border-figma-border">
          <div className="h-9 px-3 flex items-center justify-between">
            <span className="text-xs font-medium">Styles</span>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Export Section */}
        <div className="border-b border-figma-border">
          <div className="h-9 px-3 flex items-center justify-between">
            <span className="text-xs font-medium">Export</span>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Plugin Section */}
        <div>
          <div className="h-9 px-3 flex items-center justify-between">
            <span className="text-xs font-medium">Plugin</span>
          </div>
          <div className="px-3 pb-3">
            <button className="w-full text-left px-2 py-1.5 text-xs hover:bg-muted/50 rounded flex items-center gap-2">
              <div className="w-5 h-5 bg-primary rounded flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                C
              </div>
              <span>Open html.to.design</span>
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
