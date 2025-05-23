
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { CalendarIcon, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";

interface ImportantDate {
  id: string;
  title: string;
  description?: string;
  date: string;
}

export const SYVImportantDates = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [syvId, setSyvId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<ImportantDate | null>(null);
  const [newDateInfo, setNewDateInfo] = useState({
    title: "",
    description: "",
    date: new Date(),
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
    const fetchDates = async () => {
      if (!syvId) return;
      
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('important_dates')
          .select('id, title, description, date')
          .eq('syv_id', syvId)
          .order('date', { ascending: true });
          
        if (error) throw error;
        
        setDates(data || []);
      } catch (err) {
        console.error("Error fetching important dates:", err);
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte hämta viktiga datum.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDates();
  }, [syvId, toast]);
  
  const handleAddDate = async () => {
    if (!newDateInfo.title || !newDateInfo.date) {
      toast({
        title: "Fyll i obligatoriska fält",
        description: "Titel och datum måste anges.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('important_dates')
        .insert({
          title: newDateInfo.title,
          description: newDateInfo.description || null,
          date: format(newDateInfo.date, 'yyyy-MM-dd'),
          syv_id: syvId
        })
        .select('id, title, description, date');
        
      if (error) throw error;
      
      setDates([...dates, data[0]]);
      setIsAddDialogOpen(false);
      setNewDateInfo({
        title: "",
        description: "",
        date: new Date(),
      });
      
      toast({
        title: "Datum tillagt",
        description: "Det nya viktiga datumet har sparats.",
      });
    } catch (err) {
      console.error("Error adding important date:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte lägga till datum.",
        variant: "destructive",
      });
    }
  };
  
  const handleEditDate = () => {
    if (!currentDate) return;
    
    setNewDateInfo({
      title: currentDate.title,
      description: currentDate.description || "",
      date: new Date(currentDate.date),
    });
    
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateDate = async () => {
    if (!currentDate || !newDateInfo.title || !newDateInfo.date) return;
    
    try {
      const { error } = await supabase
        .from('important_dates')
        .update({
          title: newDateInfo.title,
          description: newDateInfo.description || null,
          date: format(newDateInfo.date, 'yyyy-MM-dd')
        })
        .eq('id', currentDate.id);
        
      if (error) throw error;
      
      setDates(dates.map(date => 
        date.id === currentDate.id 
          ? { 
              ...date, 
              title: newDateInfo.title,
              description: newDateInfo.description || null,
              date: format(newDateInfo.date, 'yyyy-MM-dd')
            } 
          : date
      ));
      
      setIsEditDialogOpen(false);
      toast({
        title: "Datum uppdaterat",
        description: "Det viktiga datumet har uppdaterats.",
      });
    } catch (err) {
      console.error("Error updating important date:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte uppdatera datumet.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteDate = async (id: string) => {
    if (!confirm("Är du säker på att du vill ta bort detta datum?")) return;
    
    try {
      const { error } = await supabase
        .from('important_dates')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setDates(dates.filter(date => date.id !== id));
      toast({
        title: "Datum borttaget",
        description: "Det viktiga datumet har tagits bort.",
      });
    } catch (err) {
      console.error("Error deleting important date:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte ta bort datumet.",
        variant: "destructive",
      });
    }
  };
  
  const formatDateStr = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: sv });
    } catch (e) {
      return dateStr;
    }
  };
  
  const isDateInPast = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Viktiga datum</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>Lägg till nytt datum</Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : dates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Inga viktiga datum tillagda</p>
          <p className="mt-2">Lägg till viktiga datum för att hålla koll på deadlines och händelser.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dates.map((date) => (
            <Card 
              key={date.id} 
              className={cn(
                "hover:shadow-md transition-shadow",
                isDateInPast(date.date) ? "opacity-70" : ""
              )}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{date.title}</CardTitle>
                    <CardDescription>
                      {formatDateStr(date.date)}
                      {isDateInPast(date.date) && " (passerat)"}
                    </CardDescription>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setCurrentDate(date);
                        handleEditDate();
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteDate(date.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {date.description && (
                <CardContent>
                  <p className="text-muted-foreground">{date.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
      
      {/* Add Date Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lägg till viktigt datum</DialogTitle>
            <DialogDescription>
              Lägg till ett viktigt datum som du vill hålla koll på.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title">Titel</label>
              <Input
                id="title"
                placeholder="Titel på viktigt datum"
                value={newDateInfo.title}
                onChange={(e) => setNewDateInfo({...newDateInfo, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <label>Datum</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !newDateInfo.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDateInfo.date ? format(newDateInfo.date, 'PP', { locale: sv }) : <span>Välj ett datum</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newDateInfo.date}
                    onSelect={(date) => setNewDateInfo({...newDateInfo, date: date || new Date()})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description">Beskrivning (valfritt)</label>
              <Textarea
                id="description"
                placeholder="Beskrivning av det viktiga datumet"
                value={newDateInfo.description}
                onChange={(e) => setNewDateInfo({...newDateInfo, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleAddDate}>
              Lägg till
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Date Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redigera viktigt datum</DialogTitle>
            <DialogDescription>
              Uppdatera information för det viktiga datumet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title">Titel</label>
              <Input
                id="edit-title"
                placeholder="Titel på viktigt datum"
                value={newDateInfo.title}
                onChange={(e) => setNewDateInfo({...newDateInfo, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <label>Datum</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !newDateInfo.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDateInfo.date ? format(newDateInfo.date, 'PP', { locale: sv }) : <span>Välj ett datum</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newDateInfo.date}
                    onSelect={(date) => setNewDateInfo({...newDateInfo, date: date || new Date()})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="edit-description">Beskrivning (valfritt)</label>
              <Textarea
                id="edit-description"
                placeholder="Beskrivning av det viktiga datumet"
                value={newDateInfo.description}
                onChange={(e) => setNewDateInfo({...newDateInfo, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleUpdateDate}>
              Spara ändringar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
