import { SidebarTrigger } from "./ui/sidebar";
import ThemeSwitcher from "./theme-switcher";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="bg-white dark:bg-gray-800 shadow sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">
          {pathname === "/event" ? "Dashboard" : "About"}
        </h1>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
