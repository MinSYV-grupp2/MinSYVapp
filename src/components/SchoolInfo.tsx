
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Calendar } from 'lucide-react';

interface SchoolInfoProps {
  name: string;
  programs: string[];
  rating: number;
  location: string;
  admissionPoints?: number;
  openHouseDate?: string;
  facilities?: string[];
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ 
  name, 
  programs, 
  rating, 
  location,
  admissionPoints,
  openHouseDate,
  facilities
}) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {programs.map((program, index) => (
            <span key={index} className="bg-guidance-lightBlue text-guidance-blue text-xs px-2 py-1 rounded-full">
              {program}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{rating}/5 betyg</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-guidance-purple mr-1" />
            <span>{location}</span>
          </div>
        </div>
        
        {admissionPoints && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Antagningspoäng:</span> {admissionPoints} poäng
          </div>
        )}
        
        {openHouseDate && (
          <div className="mt-2 text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-guidance-green" />
            <span>Öppet hus: {openHouseDate}</span>
          </div>
        )}
        
        {facilities && facilities.length > 0 && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Faciliteter:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {facilities.map((facility, index) => (
                <span key={index} className="bg-gray-100 text-xs px-2 py-0.5 rounded">
                  {facility}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolInfo;
