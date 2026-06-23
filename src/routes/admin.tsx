import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Building2, LayoutDashboard, Building, Users, Settings, Moon, Sun, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme-provider";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Mumbai Realty" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Properties", icon: Building, to: "/admin/properties" },
  { label: "Leads", icon: Users, to: "/admin/leads" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <TopBar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/admin" className="flex items-center gap-2 px-2 py-1.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-gold text-accent-foreground">
            <Building2 className="h-4 w-4" />
          </span>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="font-display text-sm font-semibold">Mumbai Realty</div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">Admin</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const active =
                  item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                      <Link to={item.to}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link to="/" className="px-2 py-1.5 text-xs opacity-70 hover:opacity-100 group-data-[collapsible=icon]:hidden">
          ← Back to site
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

function TopBar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-6 backdrop-blur">
      <SidebarTrigger />
      <div className="relative ml-2 hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search properties, leads…" className="pl-9" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-gradient-navy text-primary-foreground">MR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
