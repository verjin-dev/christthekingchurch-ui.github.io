import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Gallery } from './pages/Gallery';
import { FolderGallery } from './pages/FolderGallery';
import { Contact } from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentParams, setCurrentParams] = useState<any>(null);

  // Custom Hash Router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (!hash || hash === 'home') {
        setCurrentPage('home');
        setCurrentParams(null);
        return;
      }

      if (hash.startsWith('gallery-folder/')) {
        const parts = hash.split('/');
        if (parts.length >= 3) {
          setCurrentPage('gallery-folder');
          setCurrentParams({ 
            year: parts[1], 
            folderKey: decodeURIComponent(parts[2]) 
          });
          return;
        }
      }

      if (['home', 'history', 'gallery', 'contact'].includes(hash)) {
        setCurrentPage(hash);
        setCurrentParams(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initialize routing on first mount
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string, params?: any) => {
    if (page === 'gallery-folder' && params) {
      window.location.hash = `gallery-folder/${params.year}/${encodeURIComponent(params.folderKey)}`;
    } else {
      window.location.hash = page;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'history':
        return <History />;
      case 'gallery':
        return <Gallery onNavigate={handleNavigate} />;
      case 'gallery-folder':
        return (
          <FolderGallery 
            year={currentParams?.year || ''} 
            folderKey={currentParams?.folderKey || ''} 
            onNavigate={handleNavigate} 
          />
        );
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main style={{ flex: '1 0 auto' }}>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
