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
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact, need }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed submission');
      }
      
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
      console.error('Submission proxy error:', err);
      const errMsg = err instanceof Error ? err.message : 'Something went wrong. Please check your network.';
      setErrorMessage(errMsg);
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
                    {errorMessage || 'Something went wrong. Please check your network and try again.'}
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
