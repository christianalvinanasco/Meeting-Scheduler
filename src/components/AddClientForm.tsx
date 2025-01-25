import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { ClientAccount } from "@/types/user";

interface AddClientFormProps {
  onAccountAdded?: (account: ClientAccount) => void;
}

export const AddClientForm = ({ onAccountAdded }: AddClientFormProps) => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAccount: ClientAccount = {
      id: crypto.randomUUID(),
      username,
      password,
      companyName,
      dateCreated: new Date().toLocaleDateString(),
    };

    onAccountAdded?.(newAccount);

    toast({
      title: "Success!",
      description: `Account created for ${companyName}`,
    });
    
    setUsername("");
    setPassword("");
    setCompanyName("");
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Enter company name"
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 w-full">
          Create Account
        </Button>
      </form>
    </Card>
  );
};