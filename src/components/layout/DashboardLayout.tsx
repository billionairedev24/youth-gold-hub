import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { auth } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  // Get the initial state from localStorage or default to true
  const initialSidebarState = localStorage.getItem('sidebarOpen') === 'false' ? false : true;
  const [isSidebarOpen, setIsSidebarOpen] = useState(initialSidebarState);
  const user = auth.getCurrentUser();
  const isAdmin = user?.role === "admin";

  // Update localStorage when sidebar state changes
  const handleSidebarToggle = (newState: boolean) => {
    setIsSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', String(newState));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-accent">
        {isAdmin && (
          <DashboardSidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={handleSidebarToggle} 
          />
        )}
        <div className="flex flex-1 flex-col w-full">
          <DashboardNavbar 
            onMenuClick={() => handleSidebarToggle(!isSidebarOpen)} 
            showMenuButton={isAdmin}
          />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;