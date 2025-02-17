import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VirtualDemoForm } from "@/components/VirtualDemoForm";
import { MeetingSchedules } from "@/components/MeetingSchedules";
import { ReferralStatus } from "@/components/ReferralStatus";
import { Header } from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { AddClientForm } from "@/components/AddClientForm";
import { ClientAccountsList } from "@/components/ClientAccountsList";
import { UserRole, ClientAccount } from "@/types/user";
import { Video, Calendar, Users, Play, UserPlus, List } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("main_admin");
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const [showReferralStatus, setShowReferralStatus] = useState(false);
  const [showVideoWalkthrough, setShowVideoWalkthrough] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showClientAccounts, setShowClientAccounts] = useState(false);
  const [clientAccounts, setClientAccounts] = useState<ClientAccount[]>(JSON.parse(localStorage.getItem("clientAccounts")) || [{
    id: crypto.randomUUID(),
    username: "abccorp@gmail.com",
    password: "abccorp",
    dateCreated: new Date().toLocaleDateString(),
  }
]);
  const { toast } = useToast();

  // Predefined admin credentials
  const mainAdminCredentials = { username: "mcashdivision@mlhuillier.com", password: "mcashdivision" };
  const otherAdminCredentials = { username: "spbddivision@mlhuillier.com", password: "spbdd" };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if it's a client account
    const clientAccount = clientAccounts.find(
      account => account.username === username && account.password === password
    );

    if (clientAccount) {
      setUserRole("client");
      setIsLoggedIn(true);
      toast({
        title: "Welcome, RM!",
        description: `Logged in successfully.`,
        className: "bg-green-100 font-poppins border-green-500 text-green-800 w-[400px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg",
        duration: 1500,
      });
      return;
    }

    // Match the credentials
    const isMainAdmin = username === mainAdminCredentials.username && password === mainAdminCredentials.password;
    const isOtherAdmin = username === otherAdminCredentials.username && password === otherAdminCredentials.password;
    

    if (isMainAdmin) {
      setIsLoggedIn(true);
      setUserRole("main_admin");
      toast({
        title: "Welcome, MCash Division!",
        description: "Logged in successfully",
        className: "bg-green-100 font-poppins border-green-500 text-green-800 w-[400px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg",
        duration: 1500,
      });
    } else if (isOtherAdmin) {
      setIsLoggedIn(true);
      setUserRole("second_admin");
      toast({
        title: "Welcome, Sales Partnership and Business Development Division!",
        description: "Logged in successfully",
        className: "bg-green-100 font-poppins border-green-500 text-green-800 w-[400px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg",
        duration: 1500,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials.",
        className: "bg-red-100 font-poppins border-red-500 text-red-800",
      });
    }
  };

  const handleAddClientAccount = (account: ClientAccount) => {
    const updatedAccounts = [...clientAccounts, account];
    setClientAccounts(updatedAccounts);
    localStorage.setItem("clientAccounts", JSON.stringify(updatedAccounts));
    toast({
      title: "Client Account Added",
      description: `Account for ${account.username} has been added successfully.`,
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  // Define available features based on user role
  const getDashboardCards = () => {
    const baseCards = [
      {
        title: "Schedule a Virtual Demo",
        icon: Video,
        onClick: () => setShowDemoForm(true),
      },
      {
        title: "Check Meeting Schedules",
        icon: Calendar,
        onClick: () => setShowMeetings(true),
      },
    ];

    if (userRole === "main_admin") {
      return [
        ...baseCards,
        {
          title: "Track Referral Status",
          icon: Users,
          onClick: () => setShowReferralStatus(true),
        },
        {
          title: "ML Payroll PRO Virtual Walkthrough",
          icon: Play,
          onClick: () => setShowVideoWalkthrough(true),
        },
        {
          title: "Add RM Account",
          icon: UserPlus,
          onClick: () => setShowAddClient(true),
        },
        {
          title: "View RM Accounts",
          icon: List,
          onClick: () => setShowClientAccounts(true),
        },
      ];
    }

    if (userRole === "second_admin") {
      return [
        ...baseCards,
        {
          title: "Track Referral Status",
          icon: Users,
          onClick: () => setShowReferralStatus(true),
        },
        {
          title: "ML Payroll PRO Virtual Walkthrough",
          icon: Play,
          onClick: () => setShowVideoWalkthrough(true),
        },
      ];
    }

    // Client role
    return [
      ...baseCards,
      {
        title: "ML Payroll PRO Virtual Walkthrough",
        icon: Play,
        onClick: () => setShowVideoWalkthrough(true),
      },
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      {!isLoggedIn ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <div className="flex flex-col justify-center space-y-6">
              <img 
                src="/images/ml-logo.png" 
                alt="ML Logo" 
                className="h-24 object-contain mb-8"
              />
              <div className="space-y-6 max-w-md">
                <h2 className="text-xl font-sans font-semibold">Please enter your credentials</h2>
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
                src="/images/ml-payroll.png"
                alt="ML Payroll"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <Header userRole={userRole} />
          <div className="p-6 space-y-12 max-w-7xl mx-auto">
            <header className="text-center space-y-4">
              <h1 className="text-6xl font-sans font-bold text-red-600">WELCOME!</h1>
              <p className="text-2xl font-sans text-gray-600">
                How can I support you today?  
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {getDashboardCards().map((card) => (
                <Card 
                  key={card.title}
                  className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group bg-white"
                  onClick={card.onClick}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <card.icon className="w-12 h-12 text-red-600" />
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dialogs */}
          {userRole === "main_admin" && (
            <>
              <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New RM Account</DialogTitle>
                  </DialogHeader>
                  <AddClientForm onAccountAdded={handleAddClientAccount} />
                </DialogContent>
              </Dialog>

            {/* RM ACCOUNTS */}
              <Dialog open={showClientAccounts} onOpenChange={setShowClientAccounts}>
                <DialogContent className="max-w-4xl text-center font-sans">
                  <ClientAccountsList accounts={clientAccounts} setAccounts={setClientAccounts} />
                </DialogContent>
              </Dialog>
            </>
          )}

          {/* SCHEDULE A VIRTUAL DEMO FORM*/}
          <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
            <DialogContent className="[50vw] h-[95vh]">
              <DialogHeader>
              <h2 className="flex flex-row justify-between text-center text-2xl font-bold mb-6">Schedule a Virtual Demo</h2>
              </DialogHeader>
              <VirtualDemoForm onClose={() => {
                setShowDemoForm(false);
                setShowMeetings(true);
              }} />
            </DialogContent>
          </Dialog>

          {/* MEETING SCHEDULES*/}
          <Dialog open={showMeetings} onOpenChange={setShowMeetings}>
            <DialogContent className="w-[90vw] h-[100vh] max-w-none">
              <div className="h-full overflow-auto">
                <MeetingSchedules userRole={"main_admin"} />
              </div>
          </DialogContent>
          </Dialog>


          {(userRole === "main_admin" || userRole === "second_admin" || userRole === "client") && (
            <Dialog open={showReferralStatus} onOpenChange={setShowReferralStatus}>
              <DialogContent className="w-[90vw] h-[100vh] max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-3xl">Track Referral Status</DialogTitle>
                </DialogHeader>
                <ReferralStatus />
              </DialogContent>
            </Dialog>
          )}

         {(userRole === "main_admin" || userRole === "second_admin" || userRole === "client") && (
  <Dialog open={showVideoWalkthrough} onOpenChange={setShowVideoWalkthrough}>
    <DialogContent className="w-full max-w-5xl p-4 sm:w-[90vw] sm:h-[80vh] md:w-[80vw] md:h-[80vh] lg:w-[70vw] lg:h-[75vh]">
      <DialogHeader>
        <DialogTitle>ML Payroll PRO Virtual Walkthrough</DialogTitle>
      </DialogHeader>
      <div className="w-full aspect-video">
        <iframe
          src="https://www.youtube.com/embed/WrkK6uVUpm4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </DialogContent>
  </Dialog>
)}

        </div>
      )}
    </div>
  );
};

export default Index;