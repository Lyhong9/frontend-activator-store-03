import { ThemeProvider } from "@/components/theme-provider"
import Router from "./routes/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
const queryClient = new QueryClient();
const App = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position='top-center'/>
        <Router />
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
    </>
  );
};

export default App;
