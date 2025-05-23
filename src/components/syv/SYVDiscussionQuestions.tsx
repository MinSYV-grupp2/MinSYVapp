
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiscussionQuestion {
  id: string;
  question: string;
  created_at: string;
  student_id: string;
  studentName?: string;
}

export const SYVDiscussionQuestions = () => {
  const [questions, setQuestions] = useState<DiscussionQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [syvId, setSyvId] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<DiscussionQuestion | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
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
    const fetchQuestions = async () => {
      if (!syvId) return;
      
      setLoading(true);
      
      try {
        // Fetch questions assigned to this SYV
        const { data: questionsData, error } = await supabase
          .from('discussion_questions')
          .select('*')
          .eq('syv_id', syvId)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (questionsData && questionsData.length > 0) {
          // Get student names for the questions
          const studentIds = questionsData.map(q => q.student_id).filter(Boolean);
          
          if (studentIds.length > 0) {
            // Get student profiles
            const { data: studentProfilesData } = await supabase
              .from('student_profiles')
              .select('id, profile_id')
              .in('id', studentIds);
              
            if (studentProfilesData && studentProfilesData.length > 0) {
              const profileIds = studentProfilesData.map(sp => sp.profile_id);
              
              // Get profile names
              const { data: profilesData } = await supabase
                .from('profiles')
                .select('id, first_name, last_name')
                .in('id', profileIds);
                
              if (profilesData) {
                // Create map of student profile id to name
                const studentNameMap = new Map();
                studentProfilesData.forEach(sp => {
                  const profile = profilesData.find(p => p.id === sp.profile_id);
                  if (profile) {
                    studentNameMap.set(sp.id, `${profile.first_name} ${profile.last_name}`);
                  }
                });
                
                // Add student names to questions
                const questionsWithNames = questionsData.map(q => ({
                  ...q,
                  studentName: q.student_id ? studentNameMap.get(q.student_id) || 'Okänd elev' : 'Okänd elev'
                }));
                
                setQuestions(questionsWithNames);
              }
            } else {
              setQuestions(questionsData);
            }
          } else {
            setQuestions(questionsData);
          }
        } else {
          setQuestions([]);
        }
      } catch (err) {
        console.error("Error fetching discussion questions:", err);
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte hämta diskussionsfrågor.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [syvId, toast]);
  
  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Är du säker på att du vill ta bort denna diskussionsfråga?")) return;
    
    try {
      const { error } = await supabase
        .from('discussion_questions')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setQuestions(questions.filter(q => q.id !== id));
      toast({
        title: "Fråga borttagen",
        description: "Diskussionsfrågan har tagits bort.",
      });
    } catch (err) {
      console.error("Error deleting discussion question:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte ta bort frågan.",
        variant: "destructive",
      });
    }
  };
  
  const openResponseDialog = (question: DiscussionQuestion) => {
    setSelectedQuestion(question);
    setResponseText("");
    setIsResponseDialogOpen(true);
  };
  
  const handleSendResponse = async () => {
    if (!selectedQuestion || !responseText.trim()) return;
    
    // Here you would typically implement the logic to send a response to the student
    // This could be through email, a notification, or adding to a responses table
    
    toast({
      title: "Svar skickat",
      description: "Ditt svar har skickats till eleven.",
    });
    
    setIsResponseDialogOpen(false);
  };
  
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('sv-SE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Diskussionsfrågor</h2>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Inga diskussionsfrågor än</p>
          <p className="mt-2">När elever har frågor kommer de att visas här.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <CardTitle>Fråga från {question.studentName || 'Okänd elev'}</CardTitle>
                    </div>
                    <CardDescription>
                      {formatDate(question.created_at)}
                    </CardDescription>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{question.question}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button onClick={() => openResponseDialog(question)}>Svara</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Svara på fråga</DialogTitle>
            <DialogDescription>
              Skriv ett svar till eleven.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-muted p-3 rounded-md mb-4">
              <p className="font-medium text-sm">Fråga från {selectedQuestion?.studentName || 'Okänd elev'}:</p>
              <p className="mt-1">{selectedQuestion?.question}</p>
            </div>
            
            <Textarea 
              placeholder="Skriv ditt svar här..."
              className="min-h-[150px]"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
              Avbryt
            </Button>
            <Button 
              onClick={handleSendResponse}
              disabled={!responseText.trim()}
            >
              Skicka svar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
