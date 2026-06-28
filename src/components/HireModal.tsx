'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Check } from 'lucide-react';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireModal({ isOpen, onClose }: HireModalProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [need, setNeed] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !need) return;

    setStatus('submitting');

    // Confirmed entry IDs via DevTools on the live /viewform page
    // IMPORTANT: The form URL must end in /formResponse — NOT a forms.gle short link
    const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || '';
    const nameField = process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_FIELD || 'entry.1976640981';
    const contactField = process.env.NEXT_PUBLIC_GOOGLE_FORM_CONTACT_FIELD || 'entry.775958089';
    const needField = process.env.NEXT_PUBLIC_GOOGLE_FORM_NEED_FIELD || 'entry.1440450007';

    if (!formUrl || !formUrl.includes('/formResponse')) {
      console.error(
        '❌ Google Form URL is not configured correctly.\n' +
        'It must end in /formResponse — not a forms.gle short link.\n' +
        'Set NEXT_PUBLIC_GOOGLE_FORM_URL in .env.local and restart the dev server.'
      );
      setStatus('error');
      return;
    }

    const formData = new FormData();
    formData.append(nameField, name);
    formData.append(contactField, contact);
    formData.append(needField, need);

    try {
      // mode: 'no-cors' is required — Google Forms blocks CORS, response will be opaque
      // The request still succeeds even though we can't read the response
      await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      
      setStatus('success');
      setName('');
      setContact('');
      setNeed('');
      
      // Auto close after 2.5 seconds on success
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2500);
    } catch (err) {
      console.error('Google Form submission error:', err);
      setStatus('error');
    }
  };


  return (
    <div 
      className={`dialog-overlay open`}
      onClick={(e) => {
        if (e.target === e.currentTarget && status !== 'submitting') {
          onClose();
        }
      }}
    >
      <div className="dialog-box">
        <div className="dialog-header">
          {status === 'success' ? (
            <h2 className="dialog-title">Success!</h2>
          ) : (
            <h2 className="dialog-title">Let&apos;s work together.</h2>
          )}
          <button 
            type="button" 
            className="dialog-close" 
            onClick={onClose}
            disabled={status === 'submitting'}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="dialog-body">
          {status === 'success' ? (
            <div className="form-success-container">
              <div className="success-icon-wrapper">
                <Check size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Request Sent!
              </h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                Thank you. I&apos;ve received your request and will get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <p className="dialog-desc">
                Tell me what you&apos;re building and I&apos;ll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact" className="form-label">
                    Email or Phone <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact"
                    className="form-control"
                    placeholder="jane@company.com or +91 98765 43210"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="need" className="form-label">
                    What do you need? <span className="req">*</span>
                  </label>
                  <textarea
                    id="need"
                    className="form-control"
                    placeholder="Describe the role, project, or problem you need help with..."
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Something went wrong. Please check your network and try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary flex items-center justify-center gap-2"
                  disabled={status === 'submitting' || !name || !contact || !need}
                  style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
                >
                  <Send size={16} />
                  {status === 'submitting' ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
