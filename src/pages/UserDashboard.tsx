import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import PollVote from "@/components/polls/PollVote";
import { PrayerRequestsWidget } from "@/components/prayers/PrayerRequestsWidget";
import EventsTableDialog from "@/components/events/EventsTableDialog";
import { SuggestionsWidget } from "@/components/suggestions/SuggestionsWidget";

interface Widget {
  id: string;
  content: JSX.Element;
}

const UserDashboard = () => {
  const [showEventsTable, setShowEventsTable] = useState(false);
  
  const upcomingEvents = [
    {
      title: "Youth Bible Study",
      date: "March 20, 2024",
      time: "7:00 PM",
      location: "Main Hall"
    },
    {
      title: "Worship Night",
      date: "March 23, 2024",
      time: "6:30 PM",
      location: "Sanctuary"
    }
  ];

  const recentActivity = [
    { text: "You voted in \"Weekly Meeting Time\" poll", color: "bg-green-500" },
    { text: "Submitted a new suggestion", color: "bg-blue-500" },
    { text: "RSVP'd to Youth Bible Study", color: "bg-purple-500" }
  ];

  const [hasVoted, setHasVoted] = useState(false);
  const mockPoll = {
    id: "1",
    question: "What time would you prefer for our weekly youth meetings?",
    options: [
      { id: "1", text: "6:00 PM", votes: 5 },
      { id: "2", text: "7:00 PM", votes: 8 },
      { id: "3", text: "8:00 PM", votes: 3 },
    ]
  };

  const handleVote = (pollId: string, optionId: string) => {
    console.log("Vote submitted:", { pollId, optionId });
    setHasVoted(true);
  };

  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "upcoming-events",
      content: (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button 
              variant="link" 
              className="text-primary"
              onClick={() => setShowEventsTable(true)}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Calendar className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-gray-500">{event.date} at {event.time}</p>
                    <p className="text-gray-500">{event.location}</p>
                  </div>
                  <ArrowRight className="text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "active-poll",
      content: (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Active Poll</h2>
          </div>
          <Card className="p-6">
            <PollVote
              pollId={mockPoll.id}
              question={mockPoll.question}
              options={mockPoll.options}
              onVote={handleVote}
              hasVoted={hasVoted}
            />
          </Card>
        </div>
      )
    },
    {
      id: "prayer-requests",
      content: <PrayerRequestsWidget />
    },
    {
      id: "recent-activity",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="p-4">
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                    <p className="text-sm text-gray-600">{activity.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No recent activity</p>
            )}
          </Card>
        </div>
      )
    },
    {
      id: "suggestions",
      content: <SuggestionsWidget />
    }
  ]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar showMenuButton={false} />
      <main className="container mx-auto px-4 py-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="widgets">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              >
                {widgets.map((widget, index) => (
                  <Draggable key={widget.id} draggableId={widget.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                      >
                        {widget.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      
      <EventsTableDialog 
        open={showEventsTable} 
        onOpenChange={setShowEventsTable}
      />
    </div>
  );
};

export default UserDashboard;
