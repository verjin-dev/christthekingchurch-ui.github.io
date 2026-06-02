import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDTilt } from '../components/ThreeDTilt';
import priestsData from '../data/priests.json';

export const Priests: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* ═══════ HERO SECTION ═══════ */}
      <section 
        className="section text-center" 
        style={{ 
          padding: '8rem 0 4rem 0',
          background: 'var(--gradient-hero)',
          borderBottom: '1px solid var(--border-glass)'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
            <span className="text-gradient">{t('priestsLink') || 'Parish Priests'}</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            Honoring the dedicated priests who have faithfully served and guided our parish community over the years.
          </p>
        </div>
      </section>

      {/* ═══════ PRIESTS GRID ═══════ */}
      <section className="section section-dark" style={{ paddingBottom: '8rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {priestsData.map((priest) => {
              return (
                <ThreeDTilt key={priest.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Photo Header */}
                  <div style={{ height: '250px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
                    <img 
                      src={priest.photoPath} 
                      alt={priest.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(priest.name) + '&background=0D8ABC&color=fff&size=256';
                      }}
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}></div>
                    
                    <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', right: '1.5rem' }}>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '0.25rem 0.75rem', 
                        background: 'var(--accent)', 
                        color: '#fff', 
                        fontSize: '0.8rem', 
                        fontWeight: 600, 
                        borderRadius: 'var(--radius-full)', 
                        marginBottom: '0.5rem' 
                      }}>
                        {priest.years}
                      </span>
                      <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: 0, fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {priest.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content Body */}
                  <div style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-glass)' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                      {priest.description}
                    </p>
                  </div>

                </ThreeDTilt>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
