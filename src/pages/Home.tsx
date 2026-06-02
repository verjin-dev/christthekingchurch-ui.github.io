import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDTilt } from '../components/ThreeDTilt';
import { Flame, HeartHandshake, Users, Clock, BookOpen, Smile, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { getPreviewImages } from '../data/galleryData';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const heroImages = ['/images/hero-bg1.jpg', '/images/hero-bg2.jpg', '/images/hero-bg3.jpg'];

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [heroIdx, setHeroIdx] = useState(0);

  // Auto-cycle hero background images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="hero-wrapper">
        {/* Real church photo background with crossfade */}
        {heroImages.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: i === heroIdx ? 1 : 0,
              transition: 'opacity 1.8s ease-in-out',
            }}
          />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-tag">⛪ Iruthyapuram Parish • Est. 1943</p>
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroDescription')}</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => onNavigate('contact')}>
              {t('contactBtn')} <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('history')}>
              {t('learnMoreBtn')}
            </button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span /><span /><span />
        </div>
      </section>

      {/* ═══════════════════ MISSION ═══════════════════ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center"><span>{t('missionTitle')}</span></h2>
          <p className="text-center" style={{ maxWidth: '750px', margin: '0 auto var(--space-xl) auto', fontSize: '1.15rem' }}>
            {t('missionDescription')}
          </p>

          <div className="grid grid-3" style={{ marginTop: '2rem' }}>
            {[
              { icon: <Flame size={32} />, title: t('worshipTitle'), text: t('worshipText'), color: '#f97316' },
              { icon: <HeartHandshake size={32} />, title: t('serviceTitle'), text: t('serviceText'), color: '#ec4899' },
              { icon: <Users size={32} />, title: t('communityTitle'), text: t('communityText'), color: '#6366f1' },
            ].map((card, i) => (
              <ThreeDTilt key={i} className="card">
                <div className="card-icon-circle" style={{ background: `${card.color}18`, color: card.color }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{card.title}</h3>
                <p>{card.text}</p>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title text-center"><span>{t('servicesTitle')}</span></h2>
          <div className="grid grid-2" style={{ marginTop: '3rem' }}>
            {[
              { icon: <Clock size={28} />, title: t('sundayMassTitle'), text: t('sundayMassText') },
              { icon: <BookOpen size={28} />, title: t('bibleStudyTitle'), text: t('bibleStudyText') },
              { icon: <Smile size={28} />, title: t('sundaySchoolTitle'), text: t('sundaySchoolText') },
              { icon: <Sparkles size={28} />, title: t('specialServicesTitle'), text: t('specialServicesText') },
            ].map((s, i) => (
              <ThreeDTilt key={i} className="card service-row">
                <div className="service-icon">{s.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ GALLERY PREVIEW ═══════════════════ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center"><span>{t('galleryPreviewTitle')}</span></h2>

          <div className="gallery-preview-grid">
            {/* Dynamic feature image and stack */}
            {(() => {
              const previewImages = getPreviewImages(3);
              if (previewImages.length === 0) {
                return <div className="text-center" style={{ gridColumn: '1 / -1' }}><p>No images yet.</p></div>;
              }
              
              const feature = previewImages[0];
              const smallerImages = previewImages.slice(1);

              return (
                <>
                  {/* Large feature image */}
                  <ThreeDTilt className="gallery-preview-feature" onClick={() => onNavigate('gallery')}>
                    <img src={feature.src} alt={feature.alt} />
                    <div className="gallery-preview-label">
                      <h3>{feature.folder} {feature.year}</h3>
                    </div>
                  </ThreeDTilt>
                  
                  {/* Smaller stacked images */}
                  {smallerImages.length > 0 && (
                    <div className="gallery-preview-stack">
                      {smallerImages.map((img, i) => (
                        <ThreeDTilt key={i} className="gallery-preview-small" onClick={() => onNavigate('gallery')}>
                          <img src={img.src} alt={img.alt} />
                          <div className="gallery-preview-label">
                            <h3>{img.folder} {img.year}</h3>
                          </div>
                        </ThreeDTilt>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('gallery')}>
              {t('viewFullGalleryBtn')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
