import { 
  MousePointer2, Square, Pen, Type, Circle,
  Share2, LogOut, Menu, File
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FigmaCanvas = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar with File Tabs */}
      <div className="h-10 bg-figma-sidebar border-b border-figma-border flex items-center">
        <div className="flex items-center h-full overflow-x-auto">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none">
            <Menu className="w-4 h-4" />
          </Button>
          
          {["Random", "Untitled", "Service Design", "Advanced Studies in Interaction Desi...", "Weijii", "Mankind Agritech"].map((file, i) => (
            <div
              key={i}
              className={`h-full px-4 flex items-center gap-2 border-r border-figma-border text-xs whitespace-nowrap cursor-pointer hover:bg-muted/30 ${
                file === "Weijii" ? "bg-figma-canvas" : ""
              }`}
            >
              <File className="w-3 h-3 text-muted-foreground" />
              <span className={file === "Weijii" ? "text-foreground" : "text-muted-foreground"}>
                {file}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="h-12 bg-figma-toolbar border-b border-figma-border flex items-center px-3 gap-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1 h-1 bg-foreground rounded-sm" />
              <div className="w-1 h-1 bg-foreground rounded-sm" />
              <div className="w-1 h-1 bg-foreground rounded-sm" />
              <div className="w-1 h-1 bg-foreground rounded-sm" />
            </div>
          </Button>
          <span className="text-sm font-medium">Collab Test File</span>
        </div>
        <div className="flex-1" />
        <Button variant="default" size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90">
          <Share2 className="w-3 h-3 mr-1" />
          Share
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={signOut}
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Tool Panel */}
        <div className="w-12 bg-figma-toolbar border-r border-figma-border flex flex-col items-center py-3 gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground hover:bg-muted/50">
            <MousePointer2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Square className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Pen className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Type className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Circle className="w-4 h-4" />
          </Button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-figma-canvas relative overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-12">
              <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
                {["Home Page", "Products Page", "Checkout", "Wishlist"].map((frame) => (
                  <div
                    key={frame}
                    className="border border-figma-border rounded bg-card aspect-[4/3] p-6 hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
                  >
                    <div className="text-xs text-muted-foreground font-medium mb-2">
                      {frame}
                    </div>
                    <div className="w-full h-full border border-dashed border-muted rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
