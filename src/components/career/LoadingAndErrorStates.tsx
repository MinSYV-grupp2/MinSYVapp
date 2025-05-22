
import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Laddar data..." }: LoadingStateProps) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-guidance-blue mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

interface ErrorStateProps {
  error: Error | unknown;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
      <h3 className="text-lg font-medium mb-2">Ett fel uppstod</h3>
      <p>Det gick inte att ladda data. Vänligen försök igen senare.</p>
      <p className="text-sm mt-2">Detalj: {error instanceof Error ? error.message : 'Okänt fel'}</p>
    </div>
  );
};
