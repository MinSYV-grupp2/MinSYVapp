
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { CalendarIcon, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  student_id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
  location?: string;
  status?: string;
  studentName?: string;
}

export const SYVBookingManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [syvId, setSyvId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formValues, setFormValues] = useState({
    title: "",
    time: "",
    location: "",
    description: "",
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const getSYVId = async () => {
      const { data, error } = await supabase.rpc('get_syv_id');
      if (error) {
        console.error("Error getting SYV ID:", error);
        return;
      }
      setSyvId(data);
    };
    
    getSYVId();
  }, []);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!syvId) return;
      
      setLoading(true);
      
      try {
        // Fetch appointments
        const { data: appointmentsData, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('syv_id', syvId)
          .order('date', { ascending: true })
          .order('time', { ascending: true });
          
        if (error) throw error;
        
        // Fetch student names
        if (appointmentsData && appointmentsData.length > 0) {
          const studentIds = appointmentsData.map(app => app.student_id);
          
          const { data: studentProfilesData, error: studentsError } = await supabase
            .from('student_profiles')
            .select('id, profile_id');
            
          if (studentsError) throw studentsError;
          
          // Get profile data for student names
          const profileIds = studentProfilesData?.map(sp => sp.profile_id) || [];
          
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, first_name, last_name')
            .in('id', profileIds);
            
          if (profilesError) throw profilesError;
          
          // Map student profiles to names
          const studentProfilesToProfiles = new Map();
          studentProfilesData?.forEach(sp => {
            const profile = profilesData?.find(p => p.id === sp.profile_id);
            if (profile) {
              studentProfilesToProfiles.set(sp.id, `${profile.first_name} ${profile.last_name}`);
            }
          });
          
          // Add student names to appointments
          const appointmentsWithNames = appointmentsData.map(app => ({
            ...app,
            studentName: studentProfilesToProfiles.get(app.student_id) || 'Okänd elev'
          }));
          
          setAppointments(appointmentsWithNames);
        } else {
          setAppointments(appointmentsData || []);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte hämta bokningar.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, [syvId, toast]);
  
  const openEditDialog = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setFormValues({
      title: appointment.title,
      time: appointment.time,
      location: appointment.location || "",
      description: appointment.description || "",
    });
    setSelectedDate(appointment.date ? new Date(appointment.date) : undefined);
    setIsEditDialogOpen(true);
  };
  
  const handleUpdate = async () => {
    if (!currentAppointment || !selectedDate) return;
    
    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          title: formValues.title,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: formValues.time,
          location: formValues.location,
          description: formValues.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentAppointment.id);
        
      if (error) throw error;
      
      toast({
        title: "Bokning uppdaterad",
        description: "Bokningsinformationen har sparats.",
      });
      
      // Update the appointments list
      setAppointments(appointments.map(app => 
        app.id === currentAppointment.id 
          ? { 
              ...app, 
              title: formValues.title,
              date: format(selectedDate, 'yyyy-MM-dd'),
              time: formValues.time,
              location: formValues.location,
              description: formValues.description
            } 
          : app
      ));
      
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Error updating appointment:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte uppdatera bokningen.",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm("Är du säker på att du vill ta bort denna bokning?")) return;
    
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Bokning borttagen",
        description: "Bokningen har tagits bort.",
      });
      
      // Update the appointments list
      setAppointments(appointments.filter(app => app.id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte ta bort bokningen.",
        variant: "destructive",
      });
    }
  };
  
  const formatAppointmentDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'EEEE d MMMM', { locale: sv });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bokningshantering</h2>
        <Button>Skapa ny bokning</Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Inga bokningar hittades</p>
          <p className="mt-2">Skapa en ny bokning för att komma igång.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Elev</TableHead>
              <TableHead>Titel</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Tid</TableHead>
              <TableHead>Plats</TableHead>
              <TableHead className="text-right">Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.studentName || 'Okänd elev'}</TableCell>
                <TableCell>{appointment.title}</TableCell>
                <TableCell>{formatAppointmentDate(appointment.date)}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.location || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="mr-2"
                    onClick={() => openEditDialog(appointment)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Redigera bokning</DialogTitle>
            <DialogDescription>
              Uppdatera informationen för denna bokning.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titel
              </Label>
              <Input
                id="title"
                value={formValues.title}
                onChange={(e) => setFormValues({...formValues, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Datum
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PP', { locale: sv }) : <span>Välj ett datum</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Tid
              </Label>
              <Input
                id="time"
                value={formValues.time}
                onChange={(e) => setFormValues({...formValues, time: e.target.value})}
                className="col-span-3"
                placeholder="09:00"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Plats
              </Label>
              <Input
                id="location"
                value={formValues.location}
                onChange={(e) => setFormValues({...formValues, location: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Beskrivning
              </Label>
              <Input
                id="description"
                value={formValues.description}
                onChange={(e) => setFormValues({...formValues, description: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Avbryt
            </Button>
            <Button onClick={handleUpdate}>Spara ändringar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
