
import React, { createContext, useState, useContext, ReactNode } from 'react';

type InterestArea = "tech" | "nature" | "art" | "social" | "physical" | "analytical";

interface School {
  id: string;
  name: string;
  program?: string;
}

interface DiscussionQuestion {
  id: string;
  question: string;
  created: Date;
}

interface UserProfile {
  name: string;
  interests: InterestArea[];
  strengths: string[];
  reflections: string[];
  favoriteSchools: School[];
  discussionQuestions: DiscussionQuestion[];
  quizCompleted: boolean;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addInterest: (interest: InterestArea) => void;
  removeInterest: (interest: InterestArea) => void;
  addStrength: (strength: string) => void;
  removeStrength: (strength: string) => void;
  addReflection: (reflection: string) => void;
  addFavoriteSchool: (school: School) => void;
  removeFavoriteSchool: (schoolId: string) => void;
  addDiscussionQuestion: (question: string) => void;
  removeDiscussionQuestion: (questionId: string) => void;
  markQuizCompleted: () => void;
}

const defaultProfile: UserProfile = {
  name: '',
  interests: [],
  strengths: [],
  reflections: [],
  favoriteSchools: [],
  discussionQuestions: [],
  quizCompleted: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addInterest = (interest: InterestArea) => {
    if (!profile.interests.includes(interest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest: InterestArea) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addStrength = (strength: string) => {
    if (!profile.strengths.includes(strength)) {
      setProfile(prev => ({
        ...prev,
        strengths: [...prev.strengths, strength]
      }));
    }
  };

  const removeStrength = (strength: string) => {
    setProfile(prev => ({
      ...prev,
      strengths: prev.strengths.filter(s => s !== strength)
    }));
  };

  const addReflection = (reflection: string) => {
    setProfile(prev => ({
      ...prev,
      reflections: [...prev.reflections, reflection]
    }));
  };

  const addFavoriteSchool = (school: School) => {
    setProfile(prev => ({
      ...prev,
      favoriteSchools: [...prev.favoriteSchools, school]
    }));
  };

  const removeFavoriteSchool = (schoolId: string) => {
    setProfile(prev => ({
      ...prev,
      favoriteSchools: prev.favoriteSchools.filter(s => s.id !== schoolId)
    }));
  };

  const addDiscussionQuestion = (question: string) => {
    const newQuestion: DiscussionQuestion = {
      id: Date.now().toString(),
      question,
      created: new Date()
    };
    
    setProfile(prev => ({
      ...prev,
      discussionQuestions: [...prev.discussionQuestions, newQuestion]
    }));
  };

  const removeDiscussionQuestion = (questionId: string) => {
    setProfile(prev => ({
      ...prev,
      discussionQuestions: prev.discussionQuestions.filter(q => q.id !== questionId)
    }));
  };

  const markQuizCompleted = () => {
    setProfile(prev => ({
      ...prev,
      quizCompleted: true
    }));
  };

  return (
    <UserContext.Provider value={{
      profile,
      updateProfile,
      addInterest,
      removeInterest,
      addStrength,
      removeStrength,
      addReflection,
      addFavoriteSchool,
      removeFavoriteSchool,
      addDiscussionQuestion,
      removeDiscussionQuestion,
      markQuizCompleted
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
