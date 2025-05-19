
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Interview {
  id: string;
  title: string;
  description: string;
  videoId?: string;
  tiktokUrl?: string;
  videoType: 'youtube' | 'tiktok';
  category: 'student' | 'professional' | 'counselor' | 'program';
  tags: string[];
  programName?: string;
}

const interviews: Interview[] = [
  {
    id: '1',
    title: 'Mina två år på Teknikprogrammet',
    description: 'Emil berättar om sina erfarenheter från Teknikprogrammet och vad han lärt sig.',
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    category: 'student',
    tags: ['Teknikprogrammet', 'Programmering', 'Matematik']
  },
  {
    id: '2',
    title: 'Från Naturprogrammet till Läkarlinjen',
    description: 'Sofia delar sin resa från gymnasiet till läkarstudier.',
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    category: 'student',
    tags: ['Naturvetenskap', 'Medicin', 'Högskola']
  },
  {
    id: '3',
    title: 'Min vardag som Civilingenjör',
    description: 'Anders berättar om hur en vanlig arbetsdag ser ut som ingenjör.',
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    category: 'professional',
    tags: ['Ingenjör', 'Teknik', 'Arbetsliv']
  },
  {
    id: '4',
    title: 'Att jobba med människor i vården',
    description: 'Maria delar sin upplevelse av att jobba som sjuksköterska.',
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    category: 'professional',
    tags: ['Vård', 'Omvårdnad', 'Arbetsliv']
  },
  {
    id: '5',
    title: 'Så hjälper vi dig hitta rätt',
    description: 'Peter, studie- och yrkesvägledare, berättar om hur vägledningsprocessen går till.',
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    category: 'counselor',
    tags: ['SYV', 'Vägledning', 'Gymnasieval']
  },
  {
    id: '6',
    title: 'Barn- och fritidsprogrammet på Tumba gymnasium',
    description: 'En inblick i hur det är att studera Barn- och fritidsprogrammet',
    tiktokUrl: 'https://vm.tiktok.com/ZNdrsv7oQ/',
    videoType: 'tiktok',
    category: 'program',
    tags: ['Barn- och fritidsprogrammet', 'Omsorg', 'Pedagogik'],
    programName: 'Barn- och fritidsprogrammet'
  },
  {
    id: '7',
    title: 'Ekonomiprogrammet på Thorildsplans gymnasium',
    description: 'Elever som går ekonomiprogrammet berättar om sina upplevelser',
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    category: 'program',
    tags: ['Ekonomiprogrammet', 'Företagsekonomi', 'Juridik'],
    programName: 'Ekonomiprogrammet'
  },
  {
    id: '8',
    title: 'Teknikprogrammet - En djupdykning',
    description: 'Lär känna programmet, kurserna och framtidsmöjligheterna',
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    category: 'program',
    tags: ['Teknikprogrammet', 'Programmering', 'Design'],
    programName: 'Teknikprogrammet'
  }
];

const VideoContent = ({ interview }: { interview: Interview }) => {
  if (interview.videoType === 'youtube' && interview.videoId) {
    return (
      <iframe 
        width="100%" 
        height="100%" 
        src={`https://www.youtube.com/embed/${interview.videoId}`}
        title={interview.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
      ></iframe>
    );
  } else if (interview.videoType === 'tiktok' && interview.tiktokUrl) {
    return (
      <iframe 
        width="100%" 
        height="100%" 
        src={`https://www.tiktok.com/embed/v2/${getTikTokVideoId(interview.tiktokUrl)}`}
        title={interview.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }
  
  return <div className="bg-gray-200 flex items-center justify-center h-full">Video not available</div>;
};

const getTikTokVideoId = (url: string) => {
  // Extract the video ID from TikTok URL
  // This is a simple implementation and might need to be adjusted based on the actual URL format
  const regex = /\/video\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

const getTagColorsByCategory = (category: string) => {
  switch (category) {
    case 'student':
      return 'bg-guidance-lightBlue text-guidance-blue';
    case 'professional':
      return 'bg-guidance-lightGreen text-guidance-green';
    case 'counselor':
      return 'bg-guidance-lightPurple text-guidance-purple';
    case 'program':
      return 'bg-guidance-lightOrange text-guidance-orange';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

const InterviewsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Videointervjuer</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Lyssna på studenter, yrkesverksamma, vägledare och programinformation
            </p>
          </div>
        </div>
        
        <div className="container mx-auto p-4 py-8">
          <Tabs defaultValue="student">
            <TabsList className="mb-6">
              <TabsTrigger value="student">Gymnasieelever</TabsTrigger>
              <TabsTrigger value="professional">Yrkesverksamma</TabsTrigger>
              <TabsTrigger value="counselor">Vägledare</TabsTrigger>
              <TabsTrigger value="program">Programinformation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews
                  .filter(interview => interview.category === 'student')
                  .map(interview => (
                    <Card key={interview.id}>
                      <CardContent className="p-0">
                        <div className="aspect-video bg-black">
                          <VideoContent interview={interview} />
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
                          <VideoContent interview={interview} />
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
                          <VideoContent interview={interview} />
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
            
            <TabsContent value="program">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews
                  .filter(interview => interview.category === 'program')
                  .map(interview => (
                    <Card key={interview.id}>
                      <CardContent className="p-0">
                        <div className="aspect-video bg-black">
                          <VideoContent interview={interview} />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">{interview.title}</h3>
                          {interview.programName && (
                            <p className="text-sm font-medium text-guidance-orange mb-1">
                              {interview.programName}
                            </p>
                          )}
                          <p className="text-gray-600 text-sm mb-2">{interview.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {interview.tags.map(tag => (
                              <span key={tag} className="text-xs bg-guidance-lightOrange text-guidance-orange px-2 py-1 rounded-full">
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
