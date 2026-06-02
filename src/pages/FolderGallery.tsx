import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { galleryData } from '../data/galleryData';
import { ArrowLeft, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';

interface FolderGalleryProps {
  year: string;
  folderKey: string;
  onNavigate: (page: string) => void;
}

export const FolderGallery: React.FC<FolderGalleryProps> = ({ year, folderKey, onNavigate }) => {
  const { t } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Retrieve folder config
  const folder = galleryData[year]?.[folderKey];

  // Handle keyboard events when lightbox is active
  useEffect(() => {
    if (activePhotoIndex === null || !folder) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => 
          prev !== null ? (prev + 1) % folder.images.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => 
          prev !== null ? (prev - 1 + folder.images.length) % folder.images.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, folder]);

  if (!folder) {
    return (
      <div style={{ padding: '8rem 0' }} className="container text-center">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
          <AlertCircle size={48} className="text-accent" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Gallery Not Found</h2>
          <p style={{ marginBottom: '2rem' }}>The requested gallery folder does not exist or has been removed.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('gallery')}>
            {t('backToGalleryBtn')}
          </button>
        </div>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => 
      prev !== null ? (prev - 1 + folder.images.length) % folder.images.length : null
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => 
      prev !== null ? (prev + 1) % folder.images.length : null
    );
  };

  return (
    <div>
      {/* Header Banner */}
      <section 
        className="section" 
        style={{ 
          padding: '8rem 0 3rem 0',
          background: 'linear-gradient(to bottom, #0f172a, #020617)',
          borderBottom: '1px solid var(--border-glass)'
        }}
      >
        <div className="container">
          <button 
            onClick={() => onNavigate('gallery')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '1rem',
              marginBottom: '1.5rem',
              transition: 'color var(--transition-base)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ArrowLeft size={16} />
            {t('backToGalleryBtn')}
          </button>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{folder.displayName}</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {year} • {folder.description}
          </p>
        </div>
      </section>

      {/* Grid of Images */}
      <section className="section">
        <div className="container">
          {folder.images.length === 0 ? (
            <div className="card text-center" style={{ padding: '4rem 2rem' }}>
              <p>{t('noImagesMsg')}</p>
            </div>
          ) : (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {folder.images.map((imgName, index) => {
                const imgPath = `/images/gallery/${year}/${folderKey}/${imgName}`;
                return (
                  <div 
                    key={index} 
                    className="gallery-card"
                    onClick={() => setActivePhotoIndex(index)}
                    style={{ aspectRatio: '4/3' }}
                  >
                    <img 
                      src={imgPath} 
                      alt={`${folder.displayName} - ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/logo.png';
                        e.currentTarget.style.padding = '20px';
                        e.currentTarget.style.objectFit = 'contain';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="lightbox" onClick={() => setActivePhotoIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="lightbox-close" onClick={() => setActivePhotoIndex(null)}>
              <X size={32} />
            </button>

            {/* Navigation Arrows */}
            {folder.images.length > 1 && (
              <>
                <button className="lightbox-nav lightbox-prev" onClick={handlePrev}>
                  <ChevronLeft size={28} />
                </button>
                <button className="lightbox-nav lightbox-next" onClick={handleNext}>
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Image display */}
            <img 
              className="lightbox-img"
              src={`/images/gallery/${year}/${folderKey}/${folder.images[activePhotoIndex]}`}
              alt={`${folder.displayName} - Large ${activePhotoIndex + 1}`}
              onError={(e) => {
                e.currentTarget.src = '/images/logo.png';
                e.currentTarget.style.padding = '40px';
                e.currentTarget.style.objectFit = 'contain';
                e.currentTarget.style.background = 'white';
              }}
            />

            {/* Bottom Caption indicator */}
            <div style={{
              textAlign: 'center',
              marginTop: '1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              {folder.displayName} ({activePhotoIndex + 1} / {folder.images.length})
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
