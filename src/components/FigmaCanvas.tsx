import { 
  MousePointer2, Square, Pen, Type, Circle,
  Share2, LogOut, Menu, File
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";
import chartPlaceholder from "@/assets/chart-placeholder.jpg";
import productPlaceholder from "@/assets/product-placeholder.jpg";
import productPlaceholder3 from "@/assets/product-placeholder-3.jpg";

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
          
          {["Dashboard", "E-commerce App", "Social Platform", "Portfolio Website", "CoLab Plugin", "Design System"].map((file, i) => (
            <div
              key={i}
              className={`h-full px-4 flex items-center gap-2 border-r border-figma-border text-xs whitespace-nowrap cursor-pointer hover:bg-muted/30 ${
                file === "CoLab Plugin" ? "bg-figma-canvas" : ""
              }`}
            >
              <File className="w-3 h-3 text-muted-foreground" />
              <span className={file === "CoLab Plugin" ? "text-foreground" : "text-muted-foreground"}>
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
          <span className="text-sm font-medium">CoLab Test File</span>
        </div>
        <div className="flex-1" />
        <Button variant="default" size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90">
          <Share2 className="w-3 h-3 mr-1" />
          Share
        </Button>
        <ThemeToggle />
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
                {/* Dashboard Frame */}
                <div className="border border-figma-border rounded bg-card aspect-[4/3] p-4 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                  <div className="text-xs text-muted-foreground font-medium mb-3">Dashboard</div>
                  <div className="w-full h-full bg-background rounded-sm p-3 space-y-2">
                    <div className="h-8 bg-primary/20 rounded flex items-center px-2">
                      <div className="text-[8px] font-medium">Navigation Bar</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 h-16">
                      <div className="bg-muted rounded flex items-center justify-center text-[7px]">Card 1</div>
                      <div className="bg-muted rounded flex items-center justify-center text-[7px]">Card 2</div>
                      <div className="bg-muted rounded flex items-center justify-center text-[7px]">Card 3</div>
                    </div>
                    <div className="h-20 bg-muted/50 rounded overflow-hidden">
                      <img src={chartPlaceholder} alt="Chart" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Chat Interface Frame */}
                <div className="border border-figma-border rounded bg-card aspect-[4/3] p-4 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                  <div className="text-xs text-muted-foreground font-medium mb-3">Chat Interface</div>
                  <div className="w-full h-full bg-background rounded-sm p-3 flex flex-col">
                    <div className="h-6 bg-primary/20 rounded-t flex items-center px-2 text-[8px] font-medium">Header</div>
                    <div className="flex-1 bg-muted/30 p-2 space-y-1.5">
                      <div className="bg-primary/30 rounded p-1.5 text-[6px] w-2/3">Message 1</div>
                      <div className="bg-muted rounded p-1.5 text-[6px] w-3/4 ml-auto">Message 2</div>
                      <div className="bg-primary/30 rounded p-1.5 text-[6px] w-1/2">Message 3</div>
                    </div>
                    <div className="h-6 bg-muted rounded-b flex items-center px-2 text-[7px]">Input field</div>
                  </div>
                </div>

                {/* E-commerce Frame */}
                <div className="border border-figma-border rounded bg-card aspect-[4/3] p-4 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                  <div className="text-xs text-muted-foreground font-medium mb-3">E-commerce</div>
                  <div className="w-full h-full bg-background rounded-sm p-3">
                    <div className="h-6 bg-primary/20 rounded mb-2 flex items-center px-2 text-[8px]">Shop Header</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { bar1: "#f24e1e", bar2: "#ff7262", img: productPlaceholder },
                        { bar1: "#a259ff", bar2: "#1abcfe", img: productPlaceholder3 }
                      ].map((item, i) => (
                        <div key={i} className="aspect-square bg-muted rounded p-1.5">
                          <div className="w-full h-2/3 rounded mb-1 overflow-hidden">
                            <img src={item.img} alt="Product" className="w-full h-full object-cover" />
                          </div>
                          <div className="h-1 rounded mb-0.5" style={{ backgroundColor: item.bar1 }} />
                          <div className="h-1 rounded w-1/2" style={{ backgroundColor: item.bar2 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Task Board Frame */}
                <div className="border border-figma-border rounded bg-card aspect-[4/3] p-4 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                  <div className="text-xs text-muted-foreground font-medium mb-3">Task Board</div>
                  <div className="w-full h-full bg-background rounded-sm p-3">
                    <div className="grid grid-cols-3 gap-2 h-full">
                      {["To Do", "In Progress", "Done"].map((status) => (
                        <div key={status} className="bg-muted/30 rounded p-2 flex flex-col">
                          <div className="text-[7px] font-medium mb-1.5">{status}</div>
                          <div className="space-y-1">
                            <div className="h-6 bg-background rounded border border-border text-[6px] p-1">Task</div>
                            <div className="h-6 bg-background rounded border border-border text-[6px] p-1">Task</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
