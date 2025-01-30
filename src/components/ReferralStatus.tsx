import { Card } from "./ui/card";
import { StatusTable } from "./StatusTable";
import { StatusDefinitions } from "./StatusDefinitions";

export const ReferralStatus = () => {
  return (
    <Card className="p-6">
      <StatusTable userRole="main_admin" />

      <StatusDefinitions />
    </Card>
  );
};