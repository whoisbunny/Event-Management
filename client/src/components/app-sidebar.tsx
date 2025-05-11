import { FileText, Home, Info } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
// import { useAppDispatch } from "@/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/store/authReducer";

export function AppSidebar() {
  const items = [
    { title: "Events", url: "/event", icon: Home },
    { title: "About", url: "/about", icon: Info },
    { title: "Not Found Page", url: "/404", icon: FileText },
  ];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser()).then((action) => {
      if (logoutUser.fulfilled.match(action)) {
        navigate("/");
      } else {
        console.log("Logout failed");
      }
    });
  };
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Sidebar className="bg-white dark:bg-gray-800">
      <SidebarHeader className="bg-white dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg border">
          <div className="flex items-center space-x-4">
            <img
              className="w-12 h-12 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auhref=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              width={48}
              height={48}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user ? user?.name : "John Doe"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user ? user.email : "johndoe@example.com"}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-gray-800">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className="">
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-2 p-2 rounded-md transition ${
                          isActive
                            ? "bg-gray-700 text-white font-semibold"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white dark:bg-gray-800">
        <Button
          variant="ghost"
          className="dark:bg-gray-800 shadow-md border"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
