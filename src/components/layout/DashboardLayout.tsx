import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { auth } from "@/lib/auth";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : !isMobile;
  });
  
  const user = auth.getCurrentUser();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {isAdmin && (
          <DashboardSidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen}
          />
        )}
        <div className={`
          flex-1 flex flex-col 
          transition-all duration-300
          ${isAdmin ? (isSidebarOpen ? 'ml-64' : 'ml-16') : 'ml-0'}
        `}>
          <DashboardNavbar 
            onMenuClick={handleSidebarToggle} 
            showMenuButton={isAdmin}
          />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;