import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ClientAccount } from "@/types/user";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "./ui/scroll-area"; // Import ScrollArea

interface ClientAccountsListProps {
  accounts: ClientAccount[];
  setAccounts: (accounts: ClientAccount[]) => void;
}

export const ClientAccountsList = ({ accounts, setAccounts }: ClientAccountsListProps) => {
  const { toast } = useToast();
  const [selectedAccount, setSelectedAccount] = useState<ClientAccount | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  const handleEdit = (account: ClientAccount) => {
    setSelectedAccount(account);
    setEditUsername(account.username);
    setEditCompanyName(account.companyName);
    setEditPassword(account.password);
    setShowEditDialog(true);
  };

  const handleDelete = (account: ClientAccount) => {
    setAccounts(accounts.filter((a) => a.id !== account.id));
    toast({
      title: "Account Deleted",
      description: `${account.companyName}'s account has been deleted.`,
      style: {
        backgroundColor: "red",
        color: "white",
        border: "black",
      },
    });
  };

  const handleSaveEdit = () => {
    if (!selectedAccount) return;

    setAccounts(
      accounts.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              username: editUsername,
              companyName: editCompanyName,
              password: editPassword,
            }
          : account
      )
    );

    toast({
      title: "Account Updated",
      description: `${editCompanyName}'s account has been updated.`,
      style: {
        backgroundColor: "green",
        color: "white",
        border: "red",
      },
    });
    setShowEditDialog(false);
  };

  const togglePasswordVisibility = (accountId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Client Accounts</h3>
      <ScrollArea className="h-[60vh] pr-4"> {/* Add ScrollArea with height */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.companyName}</TableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell className="relative">
                  <span className="flex items-center gap-2">
                    {showPasswords[account.id] ? account.password : '••••••••'}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePasswordVisibility(account.id)}
                      className="h-4 w-4"
                    >
                      {showPasswords[account.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </span>
                </TableCell>
                <TableCell>{account.dateCreated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(account)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(account)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client Account</DialogTitle>
          </DialogHeader>
          <div>
              <Label htmlFor="editCompanyName">Company Name</Label>
              <Input
                id="editCompanyName"
                value={editCompanyName}
                onChange={(e) => setEditCompanyName(e.target.value)}
              />
            </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editUsername">Username</Label>
              <Input
                id="editUsername"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="editPassword">Password</Label>
              <Input
                id="editPassword"
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
