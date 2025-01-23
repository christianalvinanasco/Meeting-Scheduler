import { useState } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Info } from "lucide-react";

interface CompanyData {
  companyName: string;
  status: string;
  dateOnboarded: string;
  dateStarted: string;
}

const companyData: CompanyData[] = [
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
  }
];

const definitions = {
  onboarded: "These clients have been successfully registered in the system but have not yet started using it. Follow up is required to insure progress and facilitate the transition to active use.",
  active: "Clients in this stage have started enrolling their employees in the system, preparing for payroll disbursement. They are in the process of setting up their system for full operational use.",
  systemUser: "Clients at this stage have already pre-funded their accounts and are ready to proceed with payroll disbursement. They are fully utilizing the system for their payroll needs.",
  fullyCompliant: "These clients have met all the necessary requirements for accreditation. They are fully committed to using the system, and their account will be managed by the MCash support team for ongoing assistance and optimization."
};

export const ReferralStatus = () => {
  const [showDefinition, setShowDefinition] = useState<string | null>(null);

  return (
    <Card className="p-6">
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
              <TableCell>{company.status}</TableCell>
              <TableCell>{company.dateOnboarded}</TableCell>
              <TableCell>{company.dateStarted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {Object.entries(definitions).map(([key, value]) => (
          <Button
            key={key}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50"
            onClick={() => setShowDefinition(key)}
          >
            <Info className="w-4 h-4 mr-2" />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Button>
        ))}
      </div>

      <Dialog open={!!showDefinition} onOpenChange={() => setShowDefinition(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {showDefinition && showDefinition.charAt(0).toUpperCase() + showDefinition.slice(1)}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">
            {showDefinition && definitions[showDefinition as keyof typeof definitions]}
          </p>
        </DialogContent>
      </Dialog>
    </Card>
  );
};