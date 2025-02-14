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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAccount: ClientAccount = {
      id: crypto.randomUUID(),
      username,
      password,
      dateCreated: new Date().toLocaleDateString(),
    };

    onAccountAdded?.(newAccount);

    toast({
      title: "Success!",
      description: `Account created.`,
      style: {
        backgroundColor: "green", // Light green background
        color: "white", // Dark green text
        border: "red", // Green border
      },
    });
    
    setUsername("");
    setPassword("");
  };

  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username" className="text-brand-gray-dark">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
            className="mt-1 border-brand-gray-light focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-brand-gray-dark">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
            className="mt-1 border-brand-gray-light focus:border-primary focus:ring-primary"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold transition-colors"
        >
          Create Account
        </Button>
      </form>
    </Card>
  );
};