
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SYVDashboard } from "@/components/syv/SYVDashboard";
import { SYVBookingManager } from "@/components/syv/SYVBookingManager";
import { SYVStudentList } from "@/components/syv/SYVStudentList";
import { SYVImportantDates } from "@/components/syv/SYVImportantDates";
import { SYVDiscussionQuestions } from "@/components/syv/SYVDiscussionQuestions";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SYVDashboardPage = () => {
  const [isSYV, setIsSYV] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, disableDemoMode } = useUser();
  const isDemo = profile.demoMode;

  useEffect(() => {
    const checkUserRole = async () => {
      // If in demo mode, allow access without authentication checks
      if (isDemo) {
        setIsLoading(false);
        setIsSYV(true);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Åtkomst nekad",
          description: "Du måste vara inloggad för att komma åt denna sida.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      // Check if user has SYV role
      const { data, error } = await supabase
        .rpc('has_role', { role_to_check: 'syv' });

      if (error) {
        console.error("Error checking role:", error);
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte verifiera din behörighet.",
          variant: "destructive",
        });
        setIsSYV(false);
      } else {
        setIsSYV(data);
        
        if (!data) {
          toast({
            title: "Åtkomst nekad",
            description: "Du har inte behörighet att se denna sida.",
            variant: "destructive",
          });
          navigate("/");
        }
      }
      
      setIsLoading(false);
    };

    checkUserRole();
  }, [navigate, toast, isDemo]);

  const handleExitDemo = () => {
    disableDemoMode();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-3">Laddar...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (isSYV === false && !isDemo) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {isDemo && (
        <Alert className="bg-orange-100 border-orange-300 m-4">
          <AlertCircle className="h-4 w-4 text-orange-800" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-orange-800">Du är i demo-läge. Inga ändringar kommer att sparas.</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4 border-orange-500 text-orange-800 hover:bg-orange-200"
              onClick={handleExitDemo}
            >
              Avsluta demo
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Studievägledare - Dashboard</h1>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Översikt</TabsTrigger>
            <TabsTrigger value="bookings">Bokningar</TabsTrigger>
            <TabsTrigger value="students">Elever</TabsTrigger>
            <TabsTrigger value="dates">Viktiga datum</TabsTrigger>
            <TabsTrigger value="discussions">Diskussionsfrågor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <SYVDashboard isDemo={isDemo} />
          </TabsContent>
          
          <TabsContent value="bookings">
            <SYVBookingManager />
          </TabsContent>
          
          <TabsContent value="students">
            <SYVStudentList />
          </TabsContent>
          
          <TabsContent value="dates">
            <SYVImportantDates />
          </TabsContent>
          
          <TabsContent value="discussions">
            <SYVDiscussionQuestions />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default SYVDashboardPage;
