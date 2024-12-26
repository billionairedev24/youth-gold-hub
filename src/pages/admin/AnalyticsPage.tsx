import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  metrics: {
    seo: number;
    marketing: number;
    analytics: number;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mark Atkinson",
    role: "Sr. Developer",
    avatar: "/lovable-uploads/74b73218-1239-40f2-a0d2-bb4cf00f2f89.png",
    metrics: {
      seo: 60,
      marketing: 71,
      analytics: 10,
    },
  },
  {
    id: "2",
    name: "Esther Howard",
    role: "UI/UX Designer",
    avatar: "/lovable-uploads/74b73218-1239-40f2-a0d2-bb4cf00f2f89.png",
    metrics: {
      seo: 34,
      marketing: 34,
      analytics: 15,
    },
  },
  // Add more team members as needed
];

const AnalyticsPage = () => {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 bg-white"
            />
            <Button className="bg-primary hover:bg-primary-hover">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-white p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {member.metrics.seo}
                  </p>
                  <p className="text-sm text-gray-500">SEO</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {member.metrics.marketing}
                  </p>
                  <p className="text-sm text-gray-500">Marketing</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {member.metrics.analytics}
                  </p>
                  <p className="text-sm text-gray-500">Analytics</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="icon">
            &lt;
          </Button>
          <Button variant="outline">1</Button>
          <Button variant="outline" disabled>
            of 21
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;