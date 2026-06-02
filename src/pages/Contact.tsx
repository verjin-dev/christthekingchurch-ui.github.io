import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, PhoneCall, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <PhoneCall size={28} />
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('contactHeroTitle')}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {t('contactHeroDescription')}
          </p>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {/* Address */}
            <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', marginBottom: '1.5rem' }}>
                <MapPin size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>{t('addressTitle')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('addressText')}</p>
            </div>

            {/* Contact Details */}
            <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', marginBottom: '1.5rem' }}>
                <PhoneCall size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>{t('contactDetailsTitle')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('contactDetailsText')}</p>
            </div>

            {/* Service Times */}
            <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', marginBottom: '1.5rem' }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>{t('serviceTimesTitle')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('serviceTimesText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section section-dark">
        <div className="container" style={{ maxWidth: '650px' }}>
          <h2 className="section-title text-center">
            <span>{t('formTitle')}</span>
          </h2>

          <div className="card" style={{ padding: '2.5rem 3rem', marginTop: '2rem' }}>
            {isSuccess && (
              <div style={{ 
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.5rem',
                marginBottom: '1.5rem',
                color: '#4ade80',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <CheckCircle2 size={20} />
                <span>{t('formSuccessMsg')}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{t('formNameLabel')}</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  className="form-control"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('formEmailLabel')}</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="form-control"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('formMessageLabel')}</label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5} 
                  required 
                  className="form-control"
                  placeholder="Your message or prayer request..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>{t('formSubmitBtn')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
