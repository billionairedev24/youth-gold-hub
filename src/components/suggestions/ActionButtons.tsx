import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  status: string;
  onAction: (action: 'approved' | 'rejected' | 'closed') => void;
}

export function ActionButtons({ status, onAction }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t">
      <Button
        variant="outline"
        className="text-green-600 hover:text-green-700 hover:bg-green-50"
        onClick={() => onAction('approved')}
        disabled={status !== 'pending'}
      >
        Approve
      </Button>
      <Button
        variant="outline"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => onAction('rejected')}
        disabled={status !== 'pending'}
      >
        Reject
      </Button>
      <Button
        variant="outline"
        className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
        onClick={() => onAction('closed')}
        disabled={status === 'closed'}
      >
        Close
      </Button>
    </div>
  );
}