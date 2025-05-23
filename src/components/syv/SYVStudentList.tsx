
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SYVStudentProfile } from "@/components/syv/SYVStudentProfile";
import { Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: string;
  studentProfileId: string;
  profileId: string;
  firstName: string;
  lastName: string;
  school: string | null;
  program: string | null;
  grade: string | null;
  notes: string | null;
}

export const SYVStudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [syvId, setSyvId] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
    const fetchStudents = async () => {
      if (!syvId) return;
      
      setLoading(true);
      
      try {
        // Get all assigned students to this SYV
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('student_syv_assignments')
          .select('student_id')
          .eq('syv_id', syvId)
          .eq('is_active', true);
          
        if (assignmentsError) throw assignmentsError;
        
        if (!assignmentsData || assignmentsData.length === 0) {
          setStudents([]);
          setFilteredStudents([]);
          setLoading(false);
          return;
        }
        
        const studentIds = assignmentsData.map(a => a.student_id);
        
        // Get student profiles information
        const { data: studentProfilesData, error: studentsError } = await supabase
          .from('student_profiles')
          .select('id, profile_id, school_id, grade, program, notes')
          .in('id', studentIds);
          
        if (studentsError) throw studentsError;
        
        if (!studentProfilesData || studentProfilesData.length === 0) {
          setStudents([]);
          setFilteredStudents([]);
          setLoading(false);
          return;
        }
        
        // Get profiles information (names, etc)
        const profileIds = studentProfilesData.map(sp => sp.profile_id);
        
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name')
          .in('id', profileIds);
          
        if (profilesError) throw profilesError;
        
        // Get schools information
        const schoolIds = studentProfilesData
          .map(sp => sp.school_id)
          .filter(id => id) as string[];
          
        let schoolsMap: Record<string, string> = {};
        
        if (schoolIds.length > 0) {
          const { data: schoolsData, error: schoolsError } = await supabase
            .from('schools')
            .select('id, name')
            .in('id', schoolIds);
            
          if (schoolsError) throw schoolsError;
          
          // Create a map of school id to name
          schoolsMap = (schoolsData || []).reduce((acc, school) => {
            acc[school.id] = school.name;
            return acc;
          }, {} as Record<string, string>);
        }
        
        // Combine all data into student objects
        const studentsData = studentProfilesData.map(studentProfile => {
          const profile = profilesData?.find(p => p.id === studentProfile.profile_id);
          return {
            id: studentProfile.id,
            studentProfileId: studentProfile.id,
            profileId: studentProfile.profile_id,
            firstName: profile?.first_name || "Okänd",
            lastName: profile?.last_name || "Elev",
            school: studentProfile.school_id ? schoolsMap[studentProfile.school_id] : null,
            program: studentProfile.program || null,
            grade: studentProfile.grade || null,
            notes: studentProfile.notes || null,
          };
        });
        
        setStudents(studentsData);
        setFilteredStudents(studentsData);
      } catch (err) {
        console.error("Error fetching students:", err);
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte hämta elever.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [syvId, toast]);
  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      setFilteredStudents(students.filter(student => 
        student.firstName.toLowerCase().includes(lowercasedSearch) ||
        student.lastName.toLowerCase().includes(lowercasedSearch) ||
        student.school?.toLowerCase().includes(lowercasedSearch) ||
        student.program?.toLowerCase().includes(lowercasedSearch) ||
        student.grade?.toLowerCase().includes(lowercasedSearch)
      ));
    }
  }, [searchTerm, students]);
  
  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Elever</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sök elever..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          {searchTerm.trim() !== "" ? (
            <p className="text-xl text-muted-foreground">Inga elever matchar din sökning</p>
          ) : (
            <>
              <p className="text-xl text-muted-foreground">Inga elever tilldelade</p>
              <p className="mt-2">Du har inga tilldelade elever för tillfället.</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      {student.firstName} {student.lastName}
                    </CardTitle>
                    {student.grade && (
                      <CardDescription className="mt-1">
                        Årskurs: {student.grade}
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {student.program && (
                    <div>
                      <span className="font-medium">Program:</span> {student.program}
                    </div>
                  )}
                  {student.school && (
                    <div>
                      <span className="font-medium">Skola:</span> {student.school}
                    </div>
                  )}
                  {student.notes && (
                    <div>
                      <span className="font-medium">Anteckningar:</span>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{student.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleStudentSelect(student)}
                >
                  Visa profil
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {selectedStudent && (
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Elevprofil: {selectedStudent.firstName} {selectedStudent.lastName}</DialogTitle>
              <DialogDescription>
                Detaljerad information om eleven.
              </DialogDescription>
            </DialogHeader>
            <SYVStudentProfile studentId={selectedStudent.id} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
