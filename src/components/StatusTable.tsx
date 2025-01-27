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
    dateStarted: "2024-01-20"
  },
  {
    companyName: "XYZ Ltd",
    status: "Onboarded",
    dateOnboarded: "2024-02-01",
    dateStarted: "2024-02-05"
  },
  {
    companyName: "Alvi Company",
    status: "Fully Compliant",
    dateOnboarded: "2024-02-01",
    dateStarted: "2024-02-05"
  }
];

const statusOptions = ["onboarded", "active", "systemUser", "fullyCompliant"];

export const StatusTable = () => {
  const [companyData, setCompanyData] = useState(initialCompanyData);
  const { toast } = useToast();

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedData = [...companyData];
    updatedData[index] = {
      ...updatedData[index],
      status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
    };
    setCompanyData(updatedData);

    toast({
      title: "Status Updated",
      description: `${companyData[index].companyName}'s status has been updated to ${newStatus}`,
      style: {
        backgroundColor: "green", // Light green background
        color: "white", // Dark green text
        border: "red", // Green border
      },
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date Onboarded</TableHead>
          <TableHead>Date Started</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companyData.map((company, index) => (
          <TableRow key={index}>
            <TableCell>{company.companyName}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`w-[130px] justify-between font-normal ${
                      company.status.toLowerCase() === 'onboarded' ? 'text-yellow-600' :
                      company.status.toLowerCase() === 'active' ? 'text-blue-600' :
                      company.status.toLowerCase() === 'systemuser' ? 'text-green-600' :
                      company.status.toLowerCase() === 'fullycompliant' ? 'text-red-600' :
                      ''
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
                        status === 'onboarded' ? 'text-yellow-600' :
                        status === 'active' ? 'text-blue-600' :
                        status === 'systemUser' ? 'text-green-600' :
                        status === 'fullyCompliant' ? 'text-red-600' :
                        ''
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>{company.dateOnboarded}</TableCell>
            <TableCell>{company.dateStarted}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};