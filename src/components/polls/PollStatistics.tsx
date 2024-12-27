import { Poll } from "@/types/polls";

interface PollStatisticsProps {
  poll: Poll;
}

export function PollStatistics({ poll }: PollStatisticsProps) {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  return (
    <div className="space-y-2">
      <div className="font-medium text-sm text-gray-500">Vote Statistics</div>
      <ul className="space-y-2">
        {poll.options.map((option) => {
          const percentage = totalVotes > 0 
            ? Math.round((option.votes / totalVotes) * 100) 
            : 0;
          
          return (
            <li key={option.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{option.text}</span>
                <span className="font-medium">{option.votes} votes ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="text-sm font-medium mt-2">
        Total Votes: {totalVotes}
      </div>
    </div>
  );
}