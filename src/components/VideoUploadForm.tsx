import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

export const VideoUploadForm = ({ userRole = "client" }: { userRole?: string }) => {
  const { toast } = useToast();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [showVideo, setShowVideo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoFile) {
      if (videoFile.size > MAX_FILE_SIZE) {
        toast({
          title: "Error",
          description: "Video file size must be less than 5MB. Please compress your video or choose a smaller file.",
          variant: "destructive",
        });
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            const base64String = reader.result as string;
            localStorage.setItem("mlPayrollVideo", base64String);
            setVideoUrl(base64String);
            toast({
              title: "Success!",
              description: "Video material uploaded successfully",
            });
            setVideoTitle("");
            setVideoFile(null);
          } catch (error) {
            if (error instanceof Error) {
              toast({
                title: "Upload Failed",
                description: "The video file is too large for browser storage. Please use a smaller file.",
                variant: "destructive",
              });
            }
          }
        };
        reader.readAsDataURL(videoFile);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process video file",
          variant: "destructive",
        });
      }
    }
  };

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
      {userRole === "main_admin" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="videoTitle">Video Title</Label>
            <Input
              id="videoTitle"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="videoFile">Video File (Max 5MB)</Label>
            <Input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Upload Video
          </Button>
        </form>
      ) : (
        videoUrl && !showVideo && (
          <div className="flex justify-center">
            <Button
              onClick={handleWatchVideo}
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Watch ML Payroll PRO Virtual Walkthrough
            </Button>
          </div>
        )
      )}
      
      {videoUrl && showVideo && (
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