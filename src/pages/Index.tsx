import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Users } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your meetings today.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Upcoming Meetings</h3>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">3</p>
            <Button variant="outline" className="w-full">View Schedule</Button>
          </Card>

          <Card className="p-6 space-y-4 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">New Videos</h3>
              <Video className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">5</p>
            <Button variant="outline" className="w-full">Watch Now</Button>
          </Card>

          <Card className="p-6 space-y-4 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Active Users</h3>
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">12</p>
            <Button variant="outline" className="w-full">View Details</Button>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-status-pending" />
                  <div>
                    <p className="font-medium">New meeting request</p>
                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid gap-4">
              <Button>Schedule Meeting</Button>
              <Button variant="outline">Upload Video</Button>
              <Button variant="outline">View Reports</Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;