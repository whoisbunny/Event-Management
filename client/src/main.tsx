import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store/index.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SidebarProvider>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </Provider>
    </SidebarProvider>
  </BrowserRouter>
);
