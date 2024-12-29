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
      <div className="min-h-screen flex bg-background">
        {isAdmin && (
          <DashboardSidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen}
          />
        )}
        <div className={`
          flex-1 flex flex-col w-full
          transition-all duration-300
          ${isAdmin ? (isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16') : 'ml-0'}
        `}>
          <DashboardNavbar 
            onMenuClick={handleSidebarToggle} 
            showMenuButton={isAdmin}
          />
          <main className="flex-1 p-6 overflow-y-auto w-full">
            <div className="max-w-[2000px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;