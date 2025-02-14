import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CompanyData {
  companyName: string;
  status: string;
  dateOnboarded: string;
  dateStarted: string;
}

const initialCompanyData: CompanyData[] = [
  {
    companyName: "ABC Corp",
    status: "Active",
    dateOnboarded: "2024-01-15",
    dateStarted: "2024-01-20",
  },
  {
    companyName: "XYZ Ltd",
    status: "Onboarded",
    dateOnboarded: "2024-02-01",
    dateStarted: "2024-02-05",
  },
];

const statusOptions = ["onboarded", "active", "systemUser", "fullyCompliant"];

interface StatusTableProps {
  userRole: "main_admin" | "second_admin" | "client";
}

export const StatusTable = ({ userRole }: StatusTableProps) => {
  const [companyData, setCompanyData] = useState(initialCompanyData);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customStatus, setCustomStatus] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedData = [...companyData];
    updatedData[index] = {
      ...updatedData[index],
      status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
    };
    setCompanyData(updatedData);

    toast({
      title: "Status Updated",
      description: `${companyData[index].companyName}'s status has been updated to ${newStatus}`,
      style: {
        backgroundColor: "green",
        color: "white",
        border: "red",
      },
    });
  };

  const handleCustomStatusSubmit = () => {
    if (selectedIndex !== null && customStatus.trim()) {
      handleStatusChange(selectedIndex, customStatus);
      setCustomStatus("");
      setIsDialogOpen(false);
    }
  };

  return (
    <ScrollArea className="h-[60vh] pr-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Onboarded</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyData.map((company, index) => (
            <TableRow key={index}>
              <TableCell>{company.companyName}</TableCell>
              <TableCell>
                {userRole === "main_admin" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-[130px] justify-between font-normal ${
                          company.status.toLowerCase() === "onboarded"
                            ? "text-yellow-600"
                            : company.status.toLowerCase() === "active"
                            ? "text-green-600"
                            : company.status.toLowerCase() === "systemuser"
                            ? "text-blue-600"
                            : company.status.toLowerCase() === "fullycompliant"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {company.status}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statusOptions.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusChange(index, status)}
                          className={`${
                            status === "onboarded"
                              ? "text-yellow-600"
                              : status === "active"
                              ? "text-green-600"
                              : status === "systemUser"
                              ? "text-blue-600"
                              : status === "fullyCompliant"
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedIndex(index);
                          setIsDialogOpen(true);
                        }}
                      >
                        Other...
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div
                    className={`w-[130px] font-normal ${
                      company.status.toLowerCase() === "onboarded"
                        ? "text-yellow-600"
                        : company.status.toLowerCase() === "active"
                        ? "text-blue-600"
                        : company.status.toLowerCase() === "systemuser"
                        ? "text-green-600"
                        : company.status.toLowerCase() === "fullycompliant"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {company.status}
                  </div>
                )}
              </TableCell>
              <TableCell>{company.dateOnboarded}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for custom status input */}
      {userRole === "main_admin" && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Custom Status</DialogTitle>
              <DialogDescription>
                Type a custom status for the selected company.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={customStatus}
              onChange={(e) => setCustomStatus(e.target.value)}
              placeholder="Enter custom status..."
            />
            <Button onClick={handleCustomStatusSubmit}>Submit</Button>
          </DialogContent>
        </Dialog>
      )}
    </ScrollArea>
  );
};