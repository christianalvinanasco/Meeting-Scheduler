import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Users, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add proper authentication logic here
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="flex flex-col justify-center space-y-6">
            <img 
              src="/lovable-uploads/18722f91-71bf-4dff-9807-b97ef0203119.png" 
              alt="ML Logo" 
              className="h-12 object-contain mb-8"
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
              src="/lovable-uploads/b30f4a31-54bb-4778-bc05-2f7195fcbfcd.png"
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
          <Card className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center space-y-4">
              <Video className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">Schedule a virtual demo</h3>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center space-y-4">
              <Calendar className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">Check meeting schedules</h3>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center space-y-4">
              <Users className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">Track referral status</h3>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center space-y-4">
              <PlayCircle className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">ML Payroll PRO Virtual Walkthrough</h3>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;