
import React from 'react';
import { BookText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  onSaveNotes: () => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onNotesChange,
  onSaveNotes
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BookText className="mr-2 text-guidance-green" />
          Mina anteckningar och tankar
        </h3>
        
        <Textarea 
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Skriv ner dina tankar, mål och önskemål inför samtalet här..."
          className="mb-4"
          rows={6}
        />
        
        <Button 
          onClick={onSaveNotes}
          className="bg-guidance-green hover:bg-guidance-green/90"
        >
          Spara anteckningar
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotesSection;
