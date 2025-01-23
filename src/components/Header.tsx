import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Menu, Bell, LogOut, FileText } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowTerms(true)}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Terms and Conditions</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Welcome to ML Payroll PRO! By using our services, you agree to the following terms:</p>
            
            <h3 className="font-semibold">1. Service Usage</h3>
            <p>Our payroll system is designed to help businesses manage their payroll efficiently and securely.</p>
            
            <h3 className="font-semibold">2. Data Privacy</h3>
            <p>We are committed to protecting your data and maintaining confidentiality in accordance with data privacy laws.</p>
            
            <h3 className="font-semibold">3. User Responsibilities</h3>
            <p>Users must maintain accurate records and ensure timely submissions for payroll processing.</p>
            
            <h3 className="font-semibold">4. Support</h3>
            <p>Our support team is available during business hours to assist with any questions or concerns.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};