import { Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FigmaBottomBarProps {
  onPluginClick: () => void;
}

export const FigmaBottomBar = ({ onPluginClick }: FigmaBottomBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-background border-t border-border flex items-center justify-center z-40">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onPluginClick}
          >
            <Puzzle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>CoLab Plugin</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
