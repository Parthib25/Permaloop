import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Footer Left */}
        <div>
          <Logo size={28} showTagline={true} />
          <p className="footer-text" style={{ maxWidth: '350px' }}>
            Full Stack Developer · Fintech<br />
            Building financial systems that scale.
          </p>
        </div>

        {/* Footer Right */}
        <div>
          <h4 className="footer-title">Connect</h4>
          <ul className="footer-links">
            <li className="footer-link-item">
              <a href="mailto:parthibgoswami25@gmail.com">
                <Mail size={16} /> parthibgoswami25@gmail.com
              </a>
            </li>
            <li className="footer-link-item">
              <a href="https://github.com/Parthib25" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} /> github.com/Parthib25
              </a>
            </li>
            <li className="footer-link-item">
              <a href="https://linkedin.com/in/parthib-goswami-696685208" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={16} /> linkedin.com/in/parthib-goswami-696685208
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '1.5rem' }}>
        <p style={{ color: 'var(--faint-foreground)', fontSize: '0.75rem', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Parthib Goswami. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
