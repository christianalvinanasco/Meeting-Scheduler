import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export const StatusTable = () => {
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
            <TableCell>{company.status}</TableCell>
            <TableCell>{company.dateOnboarded}</TableCell>
            <TableCell>{company.dateStarted}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};