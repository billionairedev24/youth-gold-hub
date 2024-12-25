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
      <div className="flex min-h-screen bg-accent">
        {isAdmin && (
          <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isAdmin && isSidebarOpen ? 'ml-64' : isAdmin ? 'ml-16' : 'ml-0'
        }`}>
          <DashboardNavbar 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            showMenuButton={isAdmin}
          />
          <main className="flex-1 p-6 overflow-auto animate-fadeIn">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;