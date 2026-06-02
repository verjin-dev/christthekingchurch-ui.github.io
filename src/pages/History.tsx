import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDTilt } from '../components/ThreeDTilt';
import { BookOpen, CalendarHeart, Cross, Users, ArrowDown } from 'lucide-react';
import { getFlatGalleryFolders } from '../data/galleryData';

export const History: React.FC = () => {
  const { t } = useLanguage();

  const timelineItems = t('historyTimelineItems') || [];
  
  // Use a gallery image for the hero background if available
  const folders = getFlatGalleryFolders();
  const heroBg = folders.length > 0 && folders[folders.length - 1]?.imagePaths[0] 
    ? folders[folders.length - 1].imagePaths[0] 
    : '/images/hero-bg1.jpg'; // fallback

  return (
    <div>
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="history-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div 
          style={{ 
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.3) contrast(1.2)'
          }} 
        />
        <div 
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, transparent 0%, var(--bg-dark) 100%)'
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '10rem 0 6rem 0', textAlign: 'center', maxWidth: '900px' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
            padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', 
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem',
            color: 'var(--text-secondary)'
          }}>
            <BookOpen size={18} className="text-accent" />
            <span style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Legacy</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            <span className="text-gradient">{t('historyHeroTitle') || 'Our History'}</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
            {t('historyHeroDescription') || 'Tracing the roots of our parish and the faith of our ancestors from 1943 to the present day.'}
          </p>
          
          <div style={{ marginTop: '4rem', animation: 'bounce 2s infinite' }}>
            <ArrowDown size={32} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
      </section>

      {/* ═══════ INTRO / FOUNDATION SECTION ═══════ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'stretch' }}>
            
            {/* Left side: Text Card */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ThreeDTilt className="card" style={{ padding: '3rem', borderLeft: '4px solid var(--accent)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                  {t('historyIntroTitle') || 'The Beginning'}
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  {t('historyIntroText')}
                </p>
                
                <div style={{ display: 'flex', gap: '2.5rem', marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-glass)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.25rem', fontWeight: 800 }}>1943</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Founded</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.25rem', fontWeight: 800 }}>250+</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Families</span>
                  </div>
                </div>
              </ThreeDTilt>
            </div>
            
            {/* Right side: Images */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
              <img 
                src={folders[0]?.imagePaths[0] || '/images/hero-bg2.jpg'} 
                alt="Church History" 
                style={{ width: '100%', flex: '3', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', minHeight: '200px' }} 
              />
              <img 
                src={folders[1]?.imagePaths[0] || '/images/hero-bg3.jpg'} 
                alt="Community" 
                style={{ width: '100%', flex: '2', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', minHeight: '150px' }} 
              />
            </div>

          </div>
        </div>
      </section>



      {/* ═══════ PREMIUM TIMELINE SECTION ═══════ */}
      <section className="section section-dark" style={{ paddingBottom: '8rem', position: 'relative' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '6rem' }}>
            <h2 className="section-title">
              <span>{t('historyTimelineTitle') || 'Journey Through Time'}</span>
            </h2>
          </div>

          <div className="premium-timeline">
            {/* Center glowing line */}
            <div className="premium-timeline-line"></div>

            {timelineItems.map((item: any, index: number) => {
              const icons = [<Cross size={24} />, <Users size={24} />, <CalendarHeart size={24} />];
              const NodeIcon = icons[index % icons.length];

              return (
                <div key={index} className="premium-timeline-item">
                  
                  {/* Glowing Node Icon in the center */}
                  <div className="premium-timeline-node">
                    <div className="node-icon-wrapper">
                      {NodeIcon}
                    </div>
                  </div>
                  
                  {/* Glassmorphic Content Card */}
                  <div className="premium-timeline-content">
                    <ThreeDTilt className="premium-timeline-card">
                      <div className="timeline-year-badge">
                        {item.year}
                      </div>
                      <h3 className="timeline-event-title">
                        {item.event}
                      </h3>
                      <p className="timeline-event-desc">
                        {item.description}
                      </p>
                    </ThreeDTilt>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CSS additions for history bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-7px); }
        }
      `}</style>
    </div>
  );
};


