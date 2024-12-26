import { useState } from "react";
import { Card } from "@/components/ui/card";
import CreateSuggestion from "./CreateSuggestion";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

export const SuggestionsWidget = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleSubmitSuggestion = (title: string, description: string) => {
    const newSuggestion: Suggestion = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
      createdAt: new Date(),
    };
    setSuggestions([newSuggestion, ...suggestions]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Suggestions</h2>
      <CreateSuggestion onSubmit={handleSubmitSuggestion} />
      <Card className="p-4">
        {suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="border-b last:border-0 pb-4 last:pb-0"
              >
                <h3 className="font-semibold">{suggestion.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {suggestion.description}
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    suggestion.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : suggestion.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-500">
                    {suggestion.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No suggestions yet</p>
        )}
      </Card>
    </div>
  );
};