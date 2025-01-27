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
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/04bf138c-8fee-4b16-8631-c3deaf4806c2.png" 
            alt="ML Logo" 
            className="h-10 w-auto"
          />
          <span className="text-primary font-bold text-xl">ML Payroll PRO</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-brand-gray-dark hover:text-primary">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="hover:bg-brand-gray-light hover:text-primary cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowTerms(true)} className="hover:bg-brand-gray-light hover:text-primary cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              <span>Terms and Conditions</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="hover:bg-brand-gray-light hover:text-primary cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold">Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-brand-gray-dark">
            <p>Welcome to ML Payroll PRO! By using our services, you agree to the following terms:</p>
            
            <h3 className="font-semibold text-primary">1. Service Usage</h3>
            <p>Our payroll system is designed to help businesses manage their payroll efficiently and securely.</p>
            
            <h3 className="font-semibold text-primary">2. Data Privacy</h3>
            <p>We are committed to protecting your data and maintaining confidentiality in accordance with data privacy laws.</p>
            
            <h3 className="font-semibold text-primary">3. User Responsibilities</h3>
            <p>Users must maintain accurate records and ensure timely submissions for payroll processing.</p>
            
            <h3 className="font-semibold text-primary">4. Support</h3>
            <p>Our support team is available during business hours to assist with any questions or concerns.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};