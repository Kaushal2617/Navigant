import React from 'react';
import Navigation from '../navbar/navigation';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navigation />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

