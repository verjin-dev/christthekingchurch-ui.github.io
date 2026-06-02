import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getFlatGalleryFolders } from '../data/galleryData';
import type { FlatGalleryFolder } from '../data/galleryData';
import { Image, FolderOpen, Calendar } from 'lucide-react';

interface GalleryProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const folders = getFlatGalleryFolders();

  const handleFolderClick = (folder: FlatGalleryFolder) => {
    onNavigate('gallery-folder', { year: folder.year, folderKey: folder.folderKey });
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section text-center" 
        style={{ 
          padding: '8rem 0 4rem 0',
          background: 'linear-gradient(to bottom, #0f172a, #020617)',
          borderBottom: '1px solid var(--border-glass)'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.15)', color: 'var(--accent)', marginBottom: '1.5rem' }}>
            <Image size={28} />
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('galleryLink')}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {t('galleryPageDesc')}
          </p>
        </div>
      </section>

      {/* Folders Section */}
      <section className="section">
        <div className="container">
          {folders.length === 0 ? (
            <div className="card text-center" style={{ padding: '4rem 2rem' }}>
              <FolderOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <p>{t('noGalleriesMsg')}</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {folders.map((folder, index) => {
                const coverPath = `/images/gallery/${folder.year}/${folder.folderKey}/${folder.coverImage}`;
                
                return (
                  <div 
                    key={`${folder.year}-${folder.folderKey}-${index}`}
                    className="gallery-card"
                    onClick={() => handleFolderClick(folder)}
                  >
                    <img 
                      src={coverPath} 
                      alt={folder.displayName}
                      onError={(e) => {
                        e.currentTarget.src = '/images/logo.png';
                        e.currentTarget.style.padding = '20px';
                        e.currentTarget.style.objectFit = 'contain';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                    />
                    <div className="gallery-card-overlay">
                      <h3 style={{ color: 'white' }}>{folder.displayName}</h3>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                        <Calendar size={14} />
                        {folder.year} • {folder.images.length} {folder.images.length === 1 ? 'photo' : 'photos'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
