import { Card, CardHeader, CardContent } from "@/components/ui/card";

const AnnouncementsPage = () => {
  const hasAnnouncements = false; // This will be replaced with actual data check

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Announcements</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Manage Announcements</h2>
        </CardHeader>
        <CardContent>
          {!hasAnnouncements ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <p className="text-lg text-muted-foreground">No announcements found</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Announcements management interface will be implemented here</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsPage;