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
      <div className="flex h-screen overflow-hidden">
        {isAdmin && (
          <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <div className="flex flex-col flex-1">
          <DashboardNavbar 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            showMenuButton={isAdmin}
          />
          <main className="flex-1 overflow-auto bg-accent p-6">
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