import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeHeroCanvas } from '../components/ThreeHeroCanvas';
import { Flame, HeartHandshake, Users, Clock, BookOpen, Smile, Sparkles, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div>
      {/* 3D Interactive Hero Section */}
      <section className="hero-wrapper">
        <ThreeHeroCanvas />
        <div className="hero-overlay" />
        <div className="hero-content">
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
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">
            <span>{t('missionTitle')}</span>
          </h2>
          <p className="text-center" style={{ maxWidth: '750px', margin: '0 auto var(--space-xl) auto', fontSize: '1.2rem' }}>
            {t('missionDescription')}
          </p>

          <div className="grid grid-3" style={{ marginTop: '2rem' }}>
            {/* Worship Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent)', marginBottom: '1.5rem' }}>
                <Flame size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('worshipTitle')}</h3>
              <p>{t('worshipText')}</p>
            </div>

            {/* Service Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent)', marginBottom: '1.5rem' }}>
                <HeartHandshake size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('serviceTitle')}</h3>
              <p>{t('serviceText')}</p>
            </div>

            {/* Community Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent)', marginBottom: '1.5rem' }}>
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('communityTitle')}</h3>
              <p>{t('communityText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title text-center">
            <span>{t('servicesTitle')}</span>
          </h2>

          <div className="grid grid-2" style={{ marginTop: '3rem' }}>
            {/* Sunday Mass */}
            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <Clock size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{t('sundayMassTitle')}</h3>
                <p>{t('sundayMassText')}</p>
              </div>
            </div>

            {/* Bible Study */}
            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <BookOpen size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{t('bibleStudyTitle')}</h3>
                <p>{t('bibleStudyText')}</p>
              </div>
            </div>

            {/* Sunday School */}
            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <Smile size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{t('sundaySchoolTitle')}</h3>
                <p>{t('sundaySchoolText')}</p>
              </div>
            </div>

            {/* Special Services */}
            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <Sparkles size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{t('specialServicesTitle')}</h3>
                <p>{t('specialServicesText')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Gallery Preview Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">
            <span>{t('galleryPreviewTitle')}</span>
          </h2>
          
          <div className="grid grid-3" style={{ margin: '3rem 0' }}>
            <div className="gallery-card" onClick={() => onNavigate('gallery')}>
              <img src="/images/logo.png" alt="Church Preview" style={{ objectFit: 'contain', padding: '20px', background: 'rgba(255, 255, 255, 0.03)' }} />
              <div className="gallery-card-overlay">
                <h3>Christ the King Church</h3>
                <p>Iruthyapuram</p>
              </div>
            </div>
            
            <div className="gallery-card" onClick={() => onNavigate('gallery')}>
              <img src="/images/logo.png" alt="Feast Preview" style={{ objectFit: 'contain', padding: '20px', background: 'rgba(255, 255, 255, 0.03)' }} />
              <div className="gallery-card-overlay">
                <h3>Mother Mary Feast</h3>
                <p>Feast Celebration</p>
              </div>
            </div>

            <div className="gallery-card" onClick={() => onNavigate('gallery')}>
              <img src="/images/logo.png" alt="Christmas Preview" style={{ objectFit: 'contain', padding: '20px', background: 'rgba(255, 255, 255, 0.03)' }} />
              <div className="gallery-card-overlay">
                <h3>Christmas Celebration</h3>
                <p>Christmas Events</p>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => onNavigate('gallery')}>
            {t('viewFullGalleryBtn')}
          </button>
        </div>
      </section>
    </div>
  );
};
