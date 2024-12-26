import { Card } from "@/components/ui/card";
import SuggestionsReview from "@/components/admin/SuggestionsReview";

const SuggestionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suggestions Review</h1>
      </div>
      <Card className="p-6">
        <SuggestionsReview />
      </Card>
    </div>
  );
};

export default SuggestionsPage;