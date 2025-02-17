import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle } from "lucide-react";

export const VirtualWalkthrough = ({ }: { userRole?: string }) => {
  const { toast } = useToast();
  const [showVideo, setShowVideo] = useState(false);

  // Predefined video URL
  const videoUrl = "https://youtu.be/WrkK6uVUpm4"; // Replace with your actual video URL

  const handleWatchVideo = () => {
    setShowVideo(true);
    toast({
      title: "Video Loaded",
      description: "ML Payroll PRO Virtual Walkthrough is ready to play",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">ML Payroll PRO Virtual Walkthrough</h2>
      
      {!showVideo && (
        <div className="flex justify-center">
          <Button
            onClick={handleWatchVideo}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            Watch ML Payroll PRO Virtual Walkthrough
          </Button>
        </div>
      )}
      
      {showVideo && (
        <div className="mt-6">
          <video 
            controls 
            className="w-full rounded-lg"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </Card>
  );
};