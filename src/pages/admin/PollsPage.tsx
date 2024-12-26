import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PollsTable } from "@/components/polls/PollsTable";
import { CreatePollDialog } from "@/components/polls/CreatePollDialog";
import { useState } from "react";
import { Poll } from "@/types/polls";

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
  const [polls, setPolls] = useState<Poll[]>(mockPolls);

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
          <PollsTable data={polls} />
        </CardContent>
      </Card>
      <CreatePollDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onCreatePoll={(poll) => {
          setPolls([poll, ...polls]);
        }}
      />
    </div>
  );
};

export default PollsPage;