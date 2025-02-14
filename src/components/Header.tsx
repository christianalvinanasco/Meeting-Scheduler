import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Menu, Bell, LogOut } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Header = ({ userRole }) => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      duration: 2000,
    });
    
    window.location.reload();
  };

  // Mock notifications - in a real app, these would come from your backend
  const notifications = [
    {
      id: 1,
      title: "New Meeting Request",
      message: "You have a new virtual demo meeting request.",
      time: "5 minutes ago"
    },
    {
      id: 2,
      title: "Schedule Updated",
      message: "Your meeting schedule has been updated.",
      time: "1 hour ago"
    }
  ];

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <img 
          src="/images/ml-logo.png" 
          alt="ML Logo" 
          className="h-10 w-auto"
        />
      </div>
      
      <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-4">
          {/* Conditionally render "Admin", "Client" or "SPBDD" based on userRole */}
          {userRole === "main_admin" && (
            <span className="text-red-500 font-sans font-extrabold">Admin</span>
          )}
          {userRole === "second_admin" && (
            <span className="text-red-500 font-sans font-extrabold">SPBDD</span>
          )}
           {userRole === "client" && (
            <span className="text-red-500 font-sans font-extrabold">RM</span>
          )}
        
          </div>
        <Popover>
         <PopoverTrigger asChild>
  <div className="relative group">
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {notifications.length}
        </span>
      )}
    </Button>
    {/* Logout text on hover */}
    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-red-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
      Notifications
    </span>
  </div>
</PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold">Notifications</h4>
            </div>
            <div className="max-h-96 overflow-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="font-medium text-sm">{notification.title}</div>
                  <div className="text-sm text-gray-600">{notification.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative group">
  <Button
    variant="ghost"
    size="icon"
    onClick={handleLogout}
    className="text-gray-600 hover:text-primary"
  >
    <LogOut className="h-5 w-5" />
  </Button>
  {/* Logout text on hover */}
  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-red-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
    Logout
  </span>
</div>
      </div>
    </div>
  );
};