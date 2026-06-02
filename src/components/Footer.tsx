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
              <span style={{ fontSize: '0.95rem' }}>+91 XXXX XXXXXX</span>
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

      <div className="container footer-bottom-bar">
        <p>{t('footerCopy')}</p>
      </div>
    </footer>
  );
};
