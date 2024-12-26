import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { auth } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = auth.getCurrentUser();
  const isAdmin = user?.role === "admin";

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-accent">
        {isAdmin && (
          <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <DashboardNavbar 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            showMenuButton={isAdmin}
          />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;