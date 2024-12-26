import { Card } from "@/components/ui/card";
import { SuggestionsTable } from "@/components/suggestions/SuggestionsTable";
import { Suggestion } from "@/types/suggestions";

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    title: "Add Prayer Request Feature",
    description: "It would be helpful to have a prayer request feature where members can submit their prayer needs.",
    status: "pending",
    createdAt: new Date("2024-04-10"),
    authorName: "Jane Smith",
    comments: [
      {
        id: "1",
        content: "This is a great idea! We'll look into implementing it.",
        createdAt: new Date("2024-04-11"),
        authorName: "Admin",
      },
    ],
  },
];

const SuggestionsPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suggestions Review</h1>
      </div>
      <Card className="p-6">
        <SuggestionsTable data={mockSuggestions} />
      </Card>
    </div>
  );
};

export default SuggestionsPage;