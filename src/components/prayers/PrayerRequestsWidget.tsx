import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import AddPrayerRequest from "./AddPrayerRequest";

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  prayingCount: number;
}

export const PrayerRequestsWidget = () => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([
    {
      id: "1",
      title: "Upcoming Exams",
      description: "Please pray for success in upcoming exams",
      prayingCount: 3
    },
    {
      id: "2", 
      title: "Family Health",
      description: "Prayers needed for family's health",
      prayingCount: 5
    }
  ]);

  const handleNewPrayerRequest = (title: string, description: string) => {
    const newRequest = {
      id: (prayerRequests.length + 1).toString(),
      title,
      description,
      prayingCount: 0
    };
    setPrayerRequests([...prayerRequests, newRequest]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Prayer Requests</h2>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          {prayerRequests.map((request) => (
            <div key={request.id} className="flex items-center gap-4">
              <Heart className="text-red-500 h-5 w-5" />
              <div>
                <p className="font-medium">{request.title}</p>
                <p className="text-sm text-gray-500">
                  {request.prayingCount} {request.prayingCount === 1 ? 'person' : 'people'} praying
                </p>
              </div>
            </div>
          ))}
          <AddPrayerRequest onSubmit={handleNewPrayerRequest} />
        </div>
      </Card>
    </div>
  );
};