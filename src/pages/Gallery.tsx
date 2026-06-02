import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { galleryData, getFlatGalleryFolders, getAllImages } from '../data/galleryData';
import type { FlatImage } from '../data/galleryData';
import { Image, X, ChevronLeft, ChevronRight, Grid3x3, FolderOpen, ZoomIn } from 'lucide-react';

interface GalleryProps {
  onNavigate: (page: string, params?: any) => void;
}

type ViewMode = 'folders' | 'all';

export const Gallery: React.FC<GalleryProps> = ({ onNavigate: _onNavigate }) => {
  const { t } = useLanguage();
  const folders = getFlatGalleryFolders();
  const allImages = getAllImages();

  const [viewMode, setViewMode] = useState<ViewMode>('folders');
  const [activeYear, setActiveYear] = useState<string>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<FlatImage[]>([]);

  // Unique years for filter tabs
  const years = ['all', ...Array.from(new Set(folders.map(f => f.year))).sort((a, b) => b.localeCompare(a))];

  // Filtered images for "all photos" view
  const filteredImages = activeYear === 'all'
    ? allImages
    : allImages.filter(img => img.year === activeYear);

  // Filtered folders
  const filteredFolders = activeYear === 'all'
    ? folders
    : folders.filter(f => f.year === activeYear);

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      else if (e.key === 'ArrowRight') setLightboxIdx(prev => prev !== null ? (prev + 1) % lightboxImages.length : null);
      else if (e.key === 'ArrowLeft') setLightboxIdx(prev => prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx, lightboxImages]);

  // Open lightbox for a specific set of images
  const openLightbox = useCallback((images: FlatImage[], startIdx: number) => {
    setLightboxImages(images);
    setLightboxIdx(startIdx);
  }, []);

  // Open lightbox for a folder
  const openFolderLightbox = useCallback((year: string, folderKey: string, imgIdx: number) => {
    const folder = galleryData[year]?.[folderKey];
    if (!folder) return;
    const imgs: FlatImage[] = folder.imagePaths.map((path, i) => ({
      src: path,
      alt: `${folder.displayName} - ${i + 1}`,
      year,
      folder: folderKey,
    }));
    openLightbox(imgs, imgIdx);
  }, [openLightbox]);

  return (
    <div>
      {/* ═══════ HERO ═══════ */}
      <section className="gallery-hero">
        <div 
          className="gallery-hero-bg" 
          style={{ backgroundImage: `url(${folders[0]?.imagePaths[0] || '/images/hero-bg1.jpg'})` }} 
        />
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content">
          <div className="gallery-hero-badge"><Image size={20} /> Gallery</div>
          <h1>{t('galleryPageTitle') || 'Gallery'}</h1>
          <p>{t('galleryPageDesc')}</p>
        </div>
      </section>

      {/* ═══════ TOOLBAR ═══════ */}
      <section className="gallery-toolbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* View mode toggle */}
          <div className="gallery-view-toggle">
            <button className={viewMode === 'folders' ? 'active' : ''} onClick={() => setViewMode('folders')}>
              <FolderOpen size={16} /> Folders
            </button>
            <button className={viewMode === 'all' ? 'active' : ''} onClick={() => setViewMode('all')}>
              <Grid3x3 size={16} /> All Photos
            </button>
          </div>
          {/* Year filter pills */}
          <div className="gallery-year-pills">
            {years.map(y => (
              <button key={y} className={activeYear === y ? 'active' : ''} onClick={() => setActiveYear(y)}>
                {y === 'all' ? 'All Years' : y}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MAIN GALLERY CONTENT ═══════ */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          {viewMode === 'folders' ? (
            /* ──── FOLDER VIEW ──── */
            filteredFolders.length === 0 ? (
              <div className="gallery-empty">
                <FolderOpen size={48} />
                <p>{t('noGalleriesMsg')}</p>
              </div>
            ) : (
              <div className="gallery-folders-list">
                {filteredFolders.map((folder) => {
                  return (
                    <div key={`${folder.year}-${folder.folderKey}`} className="gallery-folder-section">
                      {/* Folder header */}
                      <div className="gallery-folder-header">
                        <div>
                          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>{folder.displayName}</h2>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            {folder.year} · {folder.imagePaths.length} photos · {folder.description}
                          </p>
                        </div>
                      </div>
                      {/* Image grid for this folder */}
                      <div className="gallery-masonry">
                        {folder.imagePaths.map((src, imgIdx) => {
                          return (
                            <div
                              key={imgIdx}
                              className="gallery-masonry-item"
                              onClick={() => openFolderLightbox(folder.year, folder.folderKey, imgIdx)}
                            >
                              <img src={src} alt={`${folder.displayName} ${imgIdx + 1}`} loading="lazy" />
                              <div className="gallery-masonry-hover">
                                <ZoomIn size={24} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* ──── ALL PHOTOS VIEW ──── */
            filteredImages.length === 0 ? (
              <div className="gallery-empty">
                <Image size={48} />
                <p>{t('noImagesMsg')}</p>
              </div>
            ) : (
              <div className="gallery-masonry">
                {filteredImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="gallery-masonry-item"
                    onClick={() => openLightbox(filteredImages, idx)}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <div className="gallery-masonry-hover">
                      <ZoomIn size={24} />
                      <span className="gallery-masonry-tag">{img.folder} · {img.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightboxIdx !== null && lightboxImages.length > 0 && (
        <div className="lightbox" onClick={() => setLightboxIdx(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxIdx(null)}><X size={28} /></button>

            {lightboxImages.length > 1 && (
              <>
                <button className="lightbox-nav lightbox-prev" onClick={e => { e.stopPropagation(); setLightboxIdx(prev => prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null); }}>
                  <ChevronLeft size={28} />
                </button>
                <button className="lightbox-nav lightbox-next" onClick={e => { e.stopPropagation(); setLightboxIdx(prev => prev !== null ? (prev + 1) % lightboxImages.length : null); }}>
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <img className="lightbox-img" src={lightboxImages[lightboxIdx].src} alt={lightboxImages[lightboxIdx].alt} />

            <div className="lightbox-caption">
              {lightboxImages[lightboxIdx].alt}
              <span style={{ opacity: 0.6, marginLeft: '0.5rem' }}>
                ({lightboxIdx + 1} / {lightboxImages.length})
              </span>
            </div>

            {/* Thumbnail strip */}
            {lightboxImages.length > 1 && (
              <div className="lightbox-thumbs">
                {lightboxImages.map((img, i) => (
                  <button
                    key={i}
                    className={`lightbox-thumb ${i === lightboxIdx ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                  >
                    <img src={img.src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
