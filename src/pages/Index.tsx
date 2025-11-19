import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FigmaCanvas } from "@/components/FigmaCanvas";
import { FigmaLeftSidebar } from "@/components/FigmaLeftSidebar";
import { FigmaRightSidebar } from "@/components/FigmaRightSidebar";
import { PluginUI } from "@/components/PluginUI";
import { DraggableWindow } from "@/components/DraggableWindow";
import { FigmaBottomBar } from "@/components/FigmaBottomBar";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isPluginOpen, setIsPluginOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-figma-canvas">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-figma-canvas">
      <FigmaLeftSidebar />
      <FigmaCanvas />
      <FigmaRightSidebar onPluginClick={() => setIsPluginOpen(true)} />
      <FigmaBottomBar onPluginClick={() => setIsPluginOpen(true)} />
      {isPluginOpen && (
        <DraggableWindow
          title="CoLab"
          onClose={() => setIsPluginOpen(false)}
          defaultWidth={380}
          defaultHeight={600}
        >
          <PluginUI />
        </DraggableWindow>
      )}
    </div>
  );
};

export default Index;
