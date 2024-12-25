import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";

const UserDashboard = () => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                <Button variant="link" className="text-yellow-500">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.title} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                        <Calendar className="text-yellow-500 h-6 w-6" />
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

            {/* Active Poll */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Active Poll</h2>
                <Button variant="link" className="text-yellow-500">
                  View All Polls
                </Button>
              </div>
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">What time would you prefer for our weekly youth meetings?</h3>
                  <span className="text-sm text-gray-500">Ends in 2 days</span>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-between">
                    6:00 PM
                    <span className="bg-yellow-100 p-1 rounded">
                      <MessageSquare className="h-4 w-4 text-yellow-500" />
                    </span>
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    7:00 PM
                    <span className="bg-yellow-100 p-1 rounded">
                      <MessageSquare className="h-4 w-4 text-yellow-500" />
                    </span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-80 space-y-6">
            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                      <MessageSquare className="text-yellow-500 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Submit Suggestion</h3>
                      <p className="text-sm text-gray-500">Share your ideas</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                      <Bell className="text-yellow-500 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Notifications</h3>
                      <p className="text-sm text-gray-500">2 unread messages</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <Card className="p-4">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                      <p className="text-sm text-gray-600">{activity.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;