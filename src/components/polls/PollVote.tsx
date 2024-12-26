import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollVoteProps {
  pollId: string;
  question: string;
  options: PollOption[];
  onVote: (pollId: string, optionId: string) => void;
  hasVoted: boolean;
}

const PollVote = ({ pollId, question, options, onVote, hasVoted }: PollVoteProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { toast } = useToast();

  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "Please select an option",
        variant: "destructive",
      });
      return;
    }

    onVote(pollId, selectedOption);
    toast({
      title: "Vote submitted successfully!",
      description: "Thank you for participating in the poll.",
    });
  };

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{question}</h3>
      <div className="space-y-3">
        {options.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          
          return (
            <div key={option.id} className="space-y-2">
              <Button
                variant={selectedOption === option.id ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => !hasVoted && setSelectedOption(option.id)}
                disabled={hasVoted}
              >
                {option.text}
                {hasVoted && (
                  <span className="text-sm text-gray-500">
                    {percentage.toFixed(1)}%
                  </span>
                )}
              </Button>
              {hasVoted && (
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!hasVoted && (
        <Button
          onClick={handleVote}
          className="w-full"
          disabled={!selectedOption}
        >
          Submit Vote
        </Button>
      )}
      <p className="text-sm text-gray-500 text-center">
        {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} total
      </p>
    </div>
  );
};

export default PollVote;