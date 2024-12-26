import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PollsTable } from "@/components/polls/PollsTable";
import { CreatePollDialog } from "@/components/polls/CreatePollDialog";
import { EditPollDialog } from "@/components/polls/EditPollDialog";
import { useState } from "react";
import { Poll } from "@/types/polls";
import { useToast } from "@/components/ui/use-toast";

const mockPolls: Poll[] = [
  {
    id: "1",
    title: "Next Bible Study Topic",
    options: [
      { id: "1", text: "Book of Romans", votes: 5 },
      { id: "2", text: "Book of Revelation", votes: 3 },
    ],
    startDate: new Date("2024-04-10"),
    endDate: new Date("2024-04-17"),
    isActive: true,
  },
];

const PollsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPoll, setEditingPoll] = useState<Poll | null>(null);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const { toast } = useToast();

  const handleEditPoll = (updatedPoll: Poll) => {
    setPolls((prev) =>
      prev.map((poll) => (poll.id === updatedPoll.id ? updatedPoll : poll))
    );
    toast({
      title: "Poll Updated",
      description: "The poll has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Polls</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Poll
        </Button>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Manage Polls</h2>
        </CardHeader>
        <CardContent>
          <PollsTable 
            data={polls} 
            onEdit={(poll) => setEditingPoll(poll)}
          />
        </CardContent>
      </Card>
      <CreatePollDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onCreatePoll={(poll) => {
          setPolls([poll, ...polls]);
        }}
      />
      <EditPollDialog
        poll={editingPoll}
        open={!!editingPoll}
        onOpenChange={(open) => !open && setEditingPoll(null)}
        onSave={handleEditPoll}
      />
    </div>
  );
};

export default PollsPage;