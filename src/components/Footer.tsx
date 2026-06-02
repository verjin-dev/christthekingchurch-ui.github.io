import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleLinkClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container grid grid-4">
        {/* About column */}
        <div>
          <div className="footer-logo">
            <img src="/images/logo.png" alt="Church Logo" />
            <span className="footer-logo-text">{t('churchName')}</span>
          </div>
          <p style={{ fontSize: '0.95rem', marginTop: '1rem' }}>
            {t('footerDesc')}
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h4>{t('footerQuickLinks')}</h4>
          <ul>
            <li>
              <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
                {t('homeLink')}
              </a>
            </li>
            <li>
              <a href="#history" onClick={(e) => { e.preventDefault(); handleLinkClick('history'); }}>
                {t('historyLink')}
              </a>
            </li>
            <li>
              <a href="#gallery" onClick={(e) => { e.preventDefault(); handleLinkClick('gallery'); }}>
                {t('galleryLink')}
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}>
                {t('contactLink')}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact info column */}
        <div className="footer-links-col">
          <h4>{t('footerContactInfo')}</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <MapPin size={18} className="text-accent" style={{ flexShrink: 0, marginTop: '0.2rem', color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.95rem' }}>Iruthyapuram, Kerala, India</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Phone size={18} className="text-accent" style={{ flexShrink: 0, color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.95rem' }}>04651-243375</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Mail size={18} className="text-accent" style={{ flexShrink: 0, color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.95rem', wordBreak: 'break-all' }}>contact@christthekingchurch.com</span>
            </li>
          </ul>
        </div>

        {/* Service Times Column */}
        <div className="footer-links-col">
          <h4>{t('footerServiceTimes')}</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <Clock size={18} className="text-accent" style={{ flexShrink: 0, marginTop: '0.2rem', color: 'var(--accent)' }} />
              <div style={{ fontSize: '0.95rem' }}>
                <strong>Sunday Mass:</strong> 8:00 AM<br />
                <strong>Evening Prayer:</strong> 6:00 PM<br />
                <strong>Bible Study:</strong> Wed 7:00 PM
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ margin: 0 }}>{t('footerCopy')}</p>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <a href="https://www.instagram.com/christthekingchurchiru/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ec4899'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.youtube.com/@ChristTheKingChurchIru" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
