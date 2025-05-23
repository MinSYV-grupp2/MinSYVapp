
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Users, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardStats {
  totalStudents: number;
  upcomingAppointments: number;
  pendingQuestions: number;
  upcomingDates: number;
}

interface SYVDashboardProps {
  isDemo?: boolean;
}

// Demo data for when in demo mode
const demoStats: DashboardStats = {
  totalStudents: 24,
  upcomingAppointments: 5,
  pendingQuestions: 8,
  upcomingDates: 3
};

export const SYVDashboard = ({ isDemo = false }: SYVDashboardProps) => {
  const [stats, setStats] = useState<DashboardStats>(demoStats);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If in demo mode, use pre-defined demo stats
    if (isDemo) {
      setStats(demoStats);
      setLoading(false);
      return;
    }
    
    const fetchDashboardData = async () => {
      setLoading(true);
      
      try {
        const { data: syvData } = await supabase.rpc('get_syv_id');
        if (!syvData) return;

        // Get total assigned students
        const { count: studentCount } = await supabase
          .from('student_syv_assignments')
          .select('*', { count: 'exact', head: true })
          .eq('syv_id', syvData)
          .eq('is_active', true);
        
        // Get upcoming appointments
        const today = new Date();
        const { count: appointmentCount } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('syv_id', syvData)
          .gte('date', today.toISOString().split('T')[0]);
        
        // Get pending discussion questions
        const { count: questionsCount } = await supabase
          .from('discussion_questions')
          .select('*', { count: 'exact', head: true })
          .eq('syv_id', syvData);
        
        // Get upcoming important dates
        const { count: datesCount } = await supabase
          .from('important_dates')
          .select('*', { count: 'exact', head: true })
          .eq('syv_id', syvData)
          .gte('date', today.toISOString().split('T')[0]);
        
        setStats({
          totalStudents: studentCount || 0,
          upcomingAppointments: appointmentCount || 0,
          pendingQuestions: questionsCount || 0,
          upcomingDates: datesCount || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [isDemo]);

  const navigateToTab = (tab: string) => {
    // We use a small timeout to allow the click event to complete
    // before changing tabs to improve user experience
    setTimeout(() => {
      const tabElement = document.querySelector(`[data-state="inactive"][value="${tab}"]`);
      if (tabElement) {
        (tabElement as HTMLElement).click();
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Elever
            </CardTitle>
            <CardDescription>Aktiva elever under din handledning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : stats.totalStudents}
            </div>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => navigateToTab("students")}
            >
              Se alla elever
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Bokningar
            </CardTitle>
            <CardDescription>Kommande möten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : stats.upcomingAppointments}
            </div>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => navigateToTab("bookings")}
            >
              Hantera bokningar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              Diskussionsfrågor
            </CardTitle>
            <CardDescription>Frågor från elever</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : stats.pendingQuestions}
            </div>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => navigateToTab("discussions")}
            >
              Se alla frågor
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2" />
              Viktiga datum
            </CardTitle>
            <CardDescription>Kommande viktiga datum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : stats.upcomingDates}
            </div>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => navigateToTab("dates")}
            >
              Se alla datum
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Senaste bokningarna</CardTitle>
            <CardDescription>Dina kommande bokade möten</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Bokningsöversikt kommer inom kort</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigateToTab("bookings")}
                >
                  Gå till bokningshanteraren
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Elevärenden</CardTitle>
            <CardDescription>Elever som kan behöva extra uppmärksamhet</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Elevärenden kommer inom kort</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigateToTab("students")}
                >
                  Gå till elevlistan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
