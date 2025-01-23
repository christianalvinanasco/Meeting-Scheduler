import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export const VideoUploadForm = ({ userRole = "client" }: { userRole?: string }) => {
  const { toast } = useToast();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const storedVideo = localStorage.getItem("mlPayrollVideo");
    if (storedVideo) {
      setVideoUrl(storedVideo);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("mlPayrollVideo", base64String);
        setVideoUrl(base64String);
      };
      reader.readAsDataURL(videoFile);
    }
    toast({
      title: "Success!",
      description: "Video material uploaded successfully",
    });
    setVideoTitle("");
    setVideoFile(null);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">ML Payroll PRO Virtual Walkthrough</h2>
      {userRole === "main_admin" || userRole === "first_division" || userRole === "other_division" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="videoTitle">Video Title</Label>
            <Input
              id="videoTitle"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="videoFile">Video File</Label>
            <Input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Upload Video
          </Button>
        </form>
      ) : null}
      
      {videoUrl && (
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