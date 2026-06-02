import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen } from 'lucide-react';

export const History: React.FC = () => {
  const { t } = useLanguage();

  const timelineItems = t('historyTimelineItems') || [];

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
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', marginBottom: '1.5rem' }}>
            <BookOpen size={28} />
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('historyHeroTitle')}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {t('historyHeroDescription')}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: '4px', height: '24px', background: 'var(--gradient-accent)', borderRadius: 'var(--radius-full)' }}></span>
              {t('historyIntroTitle')}
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.85', color: 'var(--text-secondary)' }}>
              {t('historyIntroText')}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title text-center">
            <span>{t('historyTimelineTitle')}</span>
          </h2>

          <div className="timeline-container" style={{ marginTop: '4rem' }}>
            <div className="timeline-line"></div>

            {timelineItems.map((item: any, index: number) => (
              <div key={index} className="timeline-card-wrapper">
                <div className="timeline-node"></div>
                <div className="timeline-card-content">
                  <div className="card">
                    <div style={{ 
                      display: 'inline-block',
                      padding: '0.25rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--gradient-accent)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      marginBottom: '1rem'
                    }}>
                      {item.year}
                    </div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'white' }}>
                      {item.event}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
