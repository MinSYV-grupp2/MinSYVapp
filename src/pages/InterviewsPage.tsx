
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Interview {
  id: string;
  title: string;
  description: string;
  videoId: string;
  category: 'student' | 'professional' | 'counselor';
  tags: string[];
}

const interviews: Interview[] = [
  {
    id: '1',
    title: 'Mina två år på Teknikprogrammet',
    description: 'Emil berättar om sina erfarenheter från Teknikprogrammet och vad han lärt sig.',
    videoId: 'naZMOG85tE8', // Updated to the new YouTube video ID
    category: 'student',
    tags: ['Teknikprogrammet', 'Programmering', 'Matematik']
  },
  {
    id: '2',
    title: 'Från Naturprogrammet till Läkarlinjen',
    description: 'Sofia delar sin resa från gymnasiet till läkarstudier.',
    videoId: 'naZMOG85tE8', // Updated to the new YouTube video ID
    category: 'student',
    tags: ['Naturvetenskap', 'Medicin', 'Högskola']
  },
  {
    id: '3',
    title: 'Min vardag som Civilingenjör',
    description: 'Anders berättar om hur en vanlig arbetsdag ser ut som ingenjör.',
    videoId: 'naZMOG85tE8', // Updated to the new YouTube video ID
    category: 'professional',
    tags: ['Ingenjör', 'Teknik', 'Arbetsliv']
  },
  {
    id: '4',
    title: 'Att jobba med människor i vården',
    description: 'Maria delar sin upplevelse av att jobba som sjuksköterska.',
    videoId: 'naZMOG85tE8', // Updated to the new YouTube video ID
    category: 'professional',
    tags: ['Vård', 'Omvårdnad', 'Arbetsliv']
  },
  {
    id: '5',
    title: 'Så hjälper vi dig hitta rätt',
    description: 'Peter, studie- och yrkesvägledare, berättar om hur vägledningsprocessen går till.',
    videoId: 'naZMOG85tE8', // Updated to the new YouTube video ID
    category: 'counselor',
    tags: ['SYV', 'Vägledning', 'Gymnasieval']
  }
];

const InterviewsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Videointervjuer</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Lyssna på studenter, yrkesverksamma och vägledare berätta om sina erfarenheter
            </p>
          </div>
        </div>
        
        <div className="container mx-auto p-4 py-8">
          <Tabs defaultValue="student">
            <TabsList className="mb-6">
              <TabsTrigger value="student">Gymnasieelever</TabsTrigger>
              <TabsTrigger value="professional">Yrkesverksamma</TabsTrigger>
              <TabsTrigger value="counselor">Vägledare</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews
                  .filter(interview => interview.category === 'student')
                  .map(interview => (
                    <Card key={interview.id}>
                      <CardContent className="p-0">
                        <div className="aspect-video bg-black">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${interview.videoId}`}
                            title={interview.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen 
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">{interview.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{interview.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {interview.tags.map(tag => (
                              <span key={tag} className="text-xs bg-guidance-lightBlue text-guidance-blue px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="professional">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews
                  .filter(interview => interview.category === 'professional')
                  .map(interview => (
                    <Card key={interview.id}>
                      <CardContent className="p-0">
                        <div className="aspect-video bg-black">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${interview.videoId}`}
                            title={interview.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen 
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">{interview.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{interview.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {interview.tags.map(tag => (
                              <span key={tag} className="text-xs bg-guidance-lightGreen text-guidance-green px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="counselor">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews
                  .filter(interview => interview.category === 'counselor')
                  .map(interview => (
                    <Card key={interview.id}>
                      <CardContent className="p-0">
                        <div className="aspect-video bg-black">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${interview.videoId}`}
                            title={interview.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen 
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">{interview.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{interview.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {interview.tags.map(tag => (
                              <span key={tag} className="text-xs bg-guidance-lightPurple text-guidance-purple px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InterviewsPage;
