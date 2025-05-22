
import React from 'react';
import { Button } from '@/components/ui/button';
import { SplitSquareVertical } from 'lucide-react';
import { CompareItems } from './types';
import { toast } from '@/components/ui/use-toast';

interface ViewActionsProps {
  viewMode: string;
  compareItems: CompareItems;
  handleBackToPrograms: () => void;
  handleViewCompare: () => void;
}

export const ViewActions = ({ 
  viewMode, 
  compareItems, 
  handleBackToPrograms,
  handleViewCompare 
}: ViewActionsProps) => {
  return (
    <>
      {viewMode !== 'programs' && (
        <Button 
          variant="outline"
          onClick={handleBackToPrograms}
          className="flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
          Tillbaka till programöversikt
        </Button>
      )}

      {(compareItems.programs.length > 0 || compareItems.schools.length > 0) && viewMode !== 'compare' && (
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={handleViewCompare}
            className="flex items-center gap-2"
          >
            <SplitSquareVertical className="h-4 w-4" />
            Jämför valda ({compareItems.programs.length + compareItems.schools.length})
          </Button>
        </div>
      )}
    </>
  );
};

export const getCompareToast = () => {
  return toast({
    title: "Max antal för jämförelse",
    description: "Du kan jämföra max 3 skolor/program samtidigt. Ta bort någon först.",
    variant: "destructive"
  });
};
