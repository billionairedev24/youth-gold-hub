import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const SuggestionsReview = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      title: "Weekly Youth Game Night",
      description: "Organize a weekly game night for youth to build community",
      status: "pending",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Youth Mentorship Program",
      description: "Start a mentorship program pairing older and younger youth",
      status: "pending",
      createdAt: new Date(),
    },
  ]);
  
  const { toast } = useToast();

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id 
        ? { ...suggestion, status: action }
        : suggestion
    ));

    toast({
      title: `Suggestion ${action}`,
      description: `The suggestion has been ${action}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Review Suggestions</h2>
      </div>
      <div className="grid gap-4">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                </div>
                {suggestion.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleAction(suggestion.id, "approved")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleAction(suggestion.id, "rejected")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  suggestion.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : suggestion.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                </span>
                <span className="text-gray-500">
                  {suggestion.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
        {suggestions.length === 0 && (
          <p className="text-center text-gray-500">No suggestions to review</p>
        )}
      </div>
    </div>
  );
};

export default SuggestionsReview;