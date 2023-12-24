// app/components/layout/Layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
        {/* Liens de navigation ici */}
        <a href="/" className="text-xl">Accueil</a>
        {/* Ajoutez d'autres liens de navigation au besoin */}
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        Pied de page
      </footer>
    </div>
  );
};

export default Layout;
