import { LayoutDashboard, PackagePlus, PackageMinus, Bot } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inbound", url: "/inbound", icon: PackagePlus },
  { title: "Outbound", url: "/outbound", icon: PackageMinus },
  { title: "AI Assistant", url: "/assistant", icon: Bot },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <PackagePlus className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-accent-foreground">GlobalLogistics</h1>
            <p className="text-xs text-sidebar-foreground">Warehouse Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? ""
                  : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
              }`}
              activeClassName="bg-sidebar-accent text-primary font-medium"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
}
