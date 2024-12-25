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
      <div className="flex h-screen w-full bg-accent">
        {isAdmin && (
          <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <div className={`flex flex-col flex-1 ${
          isAdmin ? (isSidebarOpen ? 'ml-64' : 'ml-16') : 'ml-0'
        }`}>
          <DashboardNavbar 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            showMenuButton={isAdmin}
          />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;