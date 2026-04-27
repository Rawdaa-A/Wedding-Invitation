import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingScreen from './components/LoadingScreen';
import EnvelopeCard from './components/EnvelopeCard';
import InvitationPage from './components/InvitationPage';
import MusicToggle from './components/MusicToggle';

type PageState = 'loading' | 'envelope' | 'invitation';

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('loading');

  const handleLoadingComplete = () => {
    setCurrentPage('envelope');
  };

  const handleEnvelopeOpen = () => {
    setCurrentPage('invitation');
  };

  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-[#f9f8f6]">
          {currentPage === 'loading' && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}

          {currentPage === 'envelope' && (
            <EnvelopeCard onOpen={handleEnvelopeOpen} />
          )}

          {currentPage === 'invitation' && (
            <InvitationPage />
          )}

          {currentPage !== 'loading' && (
            <MusicToggle />
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
