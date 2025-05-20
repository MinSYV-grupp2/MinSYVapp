
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface MeetingScheduleProps {
  meetingDate: string;
  onDateChange: (date: string) => void;
}

const MeetingSchedule: React.FC<MeetingScheduleProps> = ({ 
  meetingDate, 
  onDateChange 
}) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="mr-2 text-guidance-purple" />
          Nästa utvecklingssamtal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="meeting-date">Datum</Label>
            <Input 
              id="meeting-date" 
              type="date" 
              value={meetingDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="meeting-time">Tid</Label>
            <div className="flex items-center mt-1">
              <Input id="meeting-time" type="time" className="flex-grow" />
              <Clock className="ml-2 text-gray-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingSchedule;
