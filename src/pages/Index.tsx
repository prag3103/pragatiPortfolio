import { useNavigate } from "react-router-dom";
import Scene3D from "@/components/Scene3D";

const Index = () => {
  const navigate = useNavigate();

  const handleHotspotClick = (hotspotId: string) => {
    switch (hotspotId) {
      case "design-portfolio":
        navigate("/design-portfolio");
        break;
      case "web-development":
        navigate("/web-development");
        break;
      case "tannin-project":
        navigate("/tannin-project");
        break;
      case "uni-projects":
        navigate("/uni-projects");
        break;
      case "automobile":
        navigate("/automobile-projects");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-background via-background to-purple/10">
      {/* 3D Scene */}
      <Scene3D onHotspotClick={handleHotspotClick} />

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="glass-card max-w-md mx-auto p-4 text-center animate-fade-in floating">
          <p className="text-sm text-muted-foreground">
            Click on the labels to explore different project categories
          </p>
          <p className="text-xs text-muted-foreground mt-2 opacity-70">
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
