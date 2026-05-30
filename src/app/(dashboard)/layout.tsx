import { SidebarProvider } from "@/components/ui/sidebar";

import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col flex-1 min-h-screen overflow-y-auto bg-muted">
                <DashboardNavbar />
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
};

export default Layout;