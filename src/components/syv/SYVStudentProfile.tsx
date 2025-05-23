
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface StudentProfileProps {
  studentId: string;
}

interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  school: string | null;
  program: string | null;
  grade: string | null;
  quizCompleted: boolean;
  interests: string[];
  strengths: string[];
  savedPrograms: {
    id: string;
    programName: string;
    schoolName: string;
    specialization?: string;
  }[];
  favoriteSchools: {
    id: string;
    schoolName: string;
    program?: string;
  }[];
  notes: {
    id: string;
    content: string;
    createdAt: string;
    visibility: string;
  }[];
  aiInsights: {
    id: string;
    content: string;
    insightType: string;
    createdAt: string;
    confidence: number;
  }[];
  reflections: {
    id: string;
    reflection: string;
    createdAt: string;
  }[];
}

export const SYVStudentProfile = ({ studentId }: StudentProfileProps) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [noteVisibility, setNoteVisibility] = useState<"private" | "shared">("private");
  const [savingNote, setSavingNote] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchStudentProfile = async () => {
      setLoading(true);
      
      try {
        // Get student profile info
        const { data: studentProfile, error: studentProfileError } = await supabase
          .from('student_profiles')
          .select('profile_id, school_id, grade, program, quiz_completed, notes')
          .eq('id', studentId)
          .single();
          
        if (studentProfileError) throw studentProfileError;
        
        // Get profile info (name, email)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, email')
          .eq('id', studentProfile.profile_id)
          .single();
          
        if (profileError) throw profileError;
        
        // Get school info
        let schoolName = null;
        if (studentProfile.school_id) {
          const { data: school, error: schoolError } = await supabase
            .from('schools')
            .select('name')
            .eq('id', studentProfile.school_id)
            .single();
            
          if (!schoolError && school) {
            schoolName = school.name;
          }
        }
        
        // Get student interests
        const { data: interestsData, error: interestsError } = await supabase
          .from('student_interests')
          .select('id, interest, created_at')
          .eq('student_id', studentId);
          
        if (interestsError) throw interestsError;
        
        // Get student strengths
        const { data: strengthsData, error: strengthsError } = await supabase
          .from('student_strengths')
          .select('id, strength, created_at')
          .eq('student_id', studentId);
          
        if (strengthsError) throw strengthsError;
        
        // Get saved programs
        const { data: savedProgramsData, error: savedProgramsError } = await supabase
          .from('saved_programs')
          .select('id, program_name, school_name, specialization')
          .eq('student_id', studentId);
          
        if (savedProgramsError) throw savedProgramsError;
        
        // Get favorite schools
        const { data: favoriteSchoolsData, error: favoriteSchoolsError } = await supabase
          .from('favorite_schools')
          .select('id, school_name, program')
          .eq('student_id', studentId);
          
        if (favoriteSchoolsError) throw favoriteSchoolsError;
        
        // Get student notes
        const { data: notesData, error: notesError } = await supabase
          .from('student_notes')
          .select('id, content, created_at, visibility')
          .eq('student_id', studentId)
          .order('created_at', { ascending: false });
          
        if (notesError) throw notesError;
        
        // Get AI insights
        const { data: aiInsightsData, error: aiInsightsError } = await supabase
          .from('ai_insights')
          .select('id, content, insight_type, created_at, confidence')
          .eq('student_id', studentId)
          .order('created_at', { ascending: false });
          
        if (aiInsightsError) throw aiInsightsError;
        
        // Get reflections
        const { data: reflectionsData, error: reflectionsError } = await supabase
          .from('student_reflections')
          .select('id, reflection, created_at')
          .eq('student_id', studentId)
          .order('created_at', { ascending: false });
          
        if (reflectionsError) throw reflectionsError;
        
        setStudentData({
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: profile.email,
          school: schoolName,
          program: studentProfile.program,
          grade: studentProfile.grade,
          quizCompleted: studentProfile.quiz_completed || false,
          interests: interestsData?.map(i => i.interest) || [],
          strengths: strengthsData?.map(s => s.strength) || [],
          savedPrograms: savedProgramsData?.map(p => ({
            id: p.id,
            programName: p.program_name,
            schoolName: p.school_name,
            specialization: p.specialization
          })) || [],
          favoriteSchools: favoriteSchoolsData?.map(s => ({
            id: s.id,
            schoolName: s.school_name,
            program: s.program
          })) || [],
          notes: notesData?.map(n => ({
            id: n.id,
            content: n.content,
            createdAt: n.created_at,
            visibility: n.visibility
          })) || [],
          aiInsights: aiInsightsData?.map(i => ({
            id: i.id,
            content: i.content,
            insightType: i.insight_type,
            createdAt: i.created_at,
            confidence: i.confidence
          })) || [],
          reflections: reflectionsData?.map(r => ({
            id: r.id,
            reflection: r.reflection,
            createdAt: r.created_at
          })) || []
        });
      } catch (err) {
        console.error("Error fetching student profile:", err);
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte hämta elevprofilen.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentProfile();
  }, [studentId, toast]);
  
  const handleSaveNote = async () => {
    if (!newNote.trim()) return;
    
    setSavingNote(true);
    
    try {
      const { data: syvId } = await supabase.rpc('get_syv_id');
      
      if (!syvId) {
        throw new Error("Could not determine SYV ID");
      }
      
      const { data, error } = await supabase
        .from('student_notes')
        .insert({
          student_id: studentId,
          syv_id: syvId,
          content: newNote,
          visibility: noteVisibility
        })
        .select('id, content, created_at, visibility');
        
      if (error) throw error;
      
      // Update the student data with the new note
      if (studentData && data) {
        setStudentData({
          ...studentData,
          notes: [{
            id: data[0].id,
            content: data[0].content,
            createdAt: data[0].created_at,
            visibility: data[0].visibility
          }, ...studentData.notes]
        });
      }
      
      setNewNote("");
      toast({
        title: "Anteckning sparad",
        description: "Din anteckning har sparats.",
      });
    } catch (err) {
      console.error("Error saving note:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte spara anteckningen.",
        variant: "destructive",
      });
    } finally {
      setSavingNote(false);
    }
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
  
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!studentData) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">Kunde inte hitta elevprofilen</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Personlig information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Namn:</span> {studentData.firstName} {studentData.lastName}
              </div>
              <div>
                <span className="font-medium">E-post:</span> {studentData.email}
              </div>
              {studentData.school && (
                <div>
                  <span className="font-medium">Skola:</span> {studentData.school}
                </div>
              )}
              {studentData.program && (
                <div>
                  <span className="font-medium">Program:</span> {studentData.program}
                </div>
              )}
              {studentData.grade && (
                <div>
                  <span className="font-medium">Årskurs:</span> {studentData.grade}
                </div>
              )}
              <div>
                <span className="font-medium">Quiz genomfört:</span> {studentData.quizCompleted ? 'Ja' : 'Nej'}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Intressen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {studentData.interests.length === 0 ? (
                <p className="text-muted-foreground">Inga intressen registrerade</p>
              ) : (
                studentData.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">{interest}</Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Styrkor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {studentData.strengths.length === 0 ? (
                <p className="text-muted-foreground">Inga styrkor registrerade</p>
              ) : (
                studentData.strengths.map((strength, index) => (
                  <Badge key={index} variant="outline">{strength}</Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="notes">
        <TabsList className="mb-4">
          <TabsTrigger value="notes">Anteckningar</TabsTrigger>
          <TabsTrigger value="saved-programs">Sparade program</TabsTrigger>
          <TabsTrigger value="reflections">Reflektioner</TabsTrigger>
          <TabsTrigger value="ai-insights">AI-insikter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ny anteckning</CardTitle>
              <CardDescription>
                Skriv en ny anteckning om eleven. Privata anteckningar visas endast för dig.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Skriv din anteckning här..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
              />
              <div className="flex items-center mt-2">
                <div className="flex items-center space-x-2 mr-4">
                  <input 
                    type="radio" 
                    id="private" 
                    name="visibility" 
                    value="private"
                    checked={noteVisibility === "private"}
                    onChange={() => setNoteVisibility("private")}
                    className="mr-1"
                  />
                  <label htmlFor="private">Privat</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="shared" 
                    name="visibility" 
                    value="shared"
                    checked={noteVisibility === "shared"}
                    onChange={() => setNoteVisibility("shared")}
                    className="mr-1"
                  />
                  <label htmlFor="shared">Delad med elev</label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveNote} 
                disabled={!newNote.trim() || savingNote}
              >
                {savingNote ? "Sparar..." : "Spara anteckning"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-4">
            {studentData.notes.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Inga anteckningar ännu</p>
            ) : (
              studentData.notes.map((note) => (
                <Card key={note.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">
                        {formatDate(note.createdAt)}
                      </CardTitle>
                      <Badge variant={note.visibility === "private" ? "outline" : "secondary"}>
                        {note.visibility === "private" ? "Privat" : "Delad med elev"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{note.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="saved-programs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentData.savedPrograms.length === 0 ? (
              <p className="text-center text-muted-foreground py-4 col-span-full">Inga sparade program</p>
            ) : (
              studentData.savedPrograms.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <CardTitle>{program.programName}</CardTitle>
                    <CardDescription>{program.schoolName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {program.specialization && (
                      <div>
                        <span className="font-medium">Inriktning:</span> {program.specialization}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reflections">
          <div className="space-y-4">
            {studentData.reflections.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Inga reflektioner ännu</p>
            ) : (
              studentData.reflections.map((reflection) => (
                <Card key={reflection.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {formatDate(reflection.createdAt)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{reflection.reflection}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="ai-insights">
          <div className="space-y-4">
            {studentData.aiInsights.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Inga AI-insikter tillgängliga</p>
            ) : (
              studentData.aiInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">
                        {insight.insightType}
                      </CardTitle>
                      <Badge variant="outline">
                        {(insight.confidence * 100).toFixed(0)}% säkerhet
                      </Badge>
                    </div>
                    <CardDescription>
                      {formatDate(insight.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{insight.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
