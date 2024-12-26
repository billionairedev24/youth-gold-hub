import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AnnouncementsTable } from "@/components/announcements/AnnouncementsTable";
import { CreateAnnouncementDialog } from "@/components/announcements/CreateAnnouncementDialog";
import { useState } from "react";
import { Announcement } from "@/types/announcements";

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    content: "Welcome to our new church website!",
    createdAt: new Date("2024-04-10"),
  },
];

const AnnouncementsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Manage Announcements</h2>
        </CardHeader>
        <CardContent>
          <AnnouncementsTable data={announcements} />
        </CardContent>
      </Card>
      <CreateAnnouncementDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onCreateAnnouncement={(content) => {
          const newAnnouncement: Announcement = {
            id: Date.now().toString(),
            content,
            createdAt: new Date(),
          };
          setAnnouncements([newAnnouncement, ...announcements]);
        }}
      />
    </div>
  );
};

export default AnnouncementsPage;