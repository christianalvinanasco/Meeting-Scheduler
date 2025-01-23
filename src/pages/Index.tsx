import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VirtualDemoForm } from "@/components/VirtualDemoForm";
import { MeetingSchedules } from "@/components/MeetingSchedules";
import { VideoUploadForm } from "@/components/VideoUploadForm";
import { ReferralStatus } from "@/components/ReferralStatus";
import { Header } from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toast({
      title: "Welcome back!",
      description: "Logged in successfully",
    });
  };

  const dashboardCards = [
    {
      title: "Schedule a Virtual Demo",
      onClick: () => setShowDemoForm(true),
    },
    {
      title: "Check Meeting Schedules",
      onClick: () => setShowMeetings(true),
    },
    {
      title: "Track Referral Status",
      onClick: () => setShowMeetings(true),
    },
    {
      title: "ML Payroll PRO Virtual Walkthrough",
      onClick: () => setShowVideoUpload(true),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {!isLoggedIn ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <div className="flex flex-col justify-center space-y-6">
              <img 
                src="/lovable-uploads/04bf138c-8fee-4b16-8631-c3deaf4806c2.png" 
                alt="ML Logo" 
                className="h-24 object-contain mb-8"
              />
              <div className="space-y-6 max-w-md">
                <h2 className="text-xl font-semibold">Please enter your credentials</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Log-in
                  </Button>
                </form>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/b894b7d3-4cad-409d-b076-092346bb35d2.png"
                alt="ML Payroll"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <Header />
          <div className="p-6 space-y-12 max-w-7xl mx-auto">
            <header className="text-center space-y-4">
              <h1 className="text-6xl font-bold text-red-600">WELCOME!</h1>
              <p className="text-2xl text-gray-600">
                How can I support you today?
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dashboardCards.map((card) => (
                <Card 
                  key={card.title}
                  className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group bg-white"
                  onClick={card.onClick}
                >
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                </Card>
              ))}
            </div>

            <ReferralStatus />
          </div>

          {/* Dialogs */}
          <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule a Virtual Demo</DialogTitle>
              </DialogHeader>
              <VirtualDemoForm onClose={() => {
                setShowDemoForm(false);
                setShowMeetings(true);
              }} />
            </DialogContent>
          </Dialog>

          <Dialog open={showMeetings} onOpenChange={setShowMeetings}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Meeting Schedules</DialogTitle>
              </DialogHeader>
              <MeetingSchedules />
            </DialogContent>
          </Dialog>

          <Dialog open={showVideoUpload} onOpenChange={setShowVideoUpload}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>ML Payroll PRO Virtual Walkthrough</DialogTitle>
              </DialogHeader>
              <VideoUploadForm />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Index;