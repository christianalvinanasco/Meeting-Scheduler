import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Users, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { VirtualDemoForm } from "@/components/VirtualDemoForm";
import { MeetingSchedules } from "@/components/MeetingSchedules";
import { VideoUploadForm } from "@/components/VideoUploadForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
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
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-12 animate-fadeIn">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-red-600">WELCOME!</h1>
          <p className="text-2xl text-gray-600">
            How can I support you today?
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => setShowDemoForm(true)}
          >
            <div className="flex flex-col items-center space-y-4">
              <Video className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">Schedule a virtual demo</h3>
            </div>
          </Card>

          <Card 
            className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => setShowMeetings(true)}
          >
            <div className="flex flex-col items-center space-y-4">
              <Calendar className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">Check meeting schedules</h3>
            </div>
          </Card>

          <Card 
            className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => setShowReferrals(true)}
          >
            <div className="flex flex-col items-center space-y-4">
              <Users className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">Track referral status</h3>
            </div>
          </Card>

          <Card 
            className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => setShowVideoUpload(true)}
          >
            <div className="flex flex-col items-center space-y-4">
              <PlayCircle className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">ML Payroll PRO Virtual Walkthrough</h3>
            </div>
          </Card>
        </div>

        <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule a Virtual Demo</DialogTitle>
            </DialogHeader>
            <VirtualDemoForm onClose={() => setShowDemoForm(false)} />
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

        <Dialog open={showReferrals} onOpenChange={setShowReferrals}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Referral Status</DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="p-2">Company Name</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Date onboarded</th>
                    <th className="p-2">Date started</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      companyName: "ABC Corp",
                      status: "Onboarded",
                      dateOnboarded: "01/31/2025",
                      dateStarted: ""
                    },
                    {
                      companyName: "123 Finance",
                      status: "Please follow up for company details",
                      dateOnboarded: "",
                      dateStarted: ""
                    },
                    {
                      companyName: "J1 Construction",
                      status: "System User",
                      dateOnboarded: "01/31/2025",
                      dateStarted: "02/01/2025"
                    },
                    {
                      companyName: "Agila Tracking Corp",
                      status: "Fully Compliant",
                      dateOnboarded: "01/31/2025",
                      dateStarted: "02/01/2025"
                    }
                  ].map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <td className="p-2">{item.companyName}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">{item.dateOnboarded}</td>
                      <td className="p-2">{item.dateStarted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showVideoUpload} onOpenChange={setShowVideoUpload}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Video Material</DialogTitle>
            </DialogHeader>
            <VideoUploadForm />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Index;