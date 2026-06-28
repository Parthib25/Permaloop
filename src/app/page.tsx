'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ExternalLink, 
  GraduationCap, 
  Building2, 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/SocialIcons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [typedCommand, setTypedCommand] = useState('');
  const codeInputRef = React.useRef<HTMLInputElement>(null);

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedCommand(e.target.value);
  };

  const handleCommandKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cleanCmd = typedCommand.trim().toLowerCase();
      if (
        cleanCmd === 'developer.hire()' || 
        cleanCmd === 'developer.hire();' || 
        cleanCmd === 'developer.hire'
      ) {
        window.dispatchEvent(new Event('open-hire-modal'));
        setTypedCommand('');
      }
    }
  };

  const focusCodeInput = () => {
    if (codeInputRef.current) {
      codeInputRef.current.focus();
    }
  };

  // Intersection Observer for highlighting navigation links
  useEffect(() => {
    const sections = ['home', 'experience', 'projects', 'about', 'contact'];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.3 } // Trigger when 30% of the section is visible
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Offset for sticky header
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Sticky Header Navigation */}
      <Header activeSection={activeSection} />

      <main className="container">
        {/* Section 1: Hero */}
        <section id="home" className="section" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
          <div className="grid grid-2 grid-2-large-left items-center" style={{ width: '100%' }}>
            {/* Hero Left Column */}
            <div>
              <span className="section-label">Full Stack Developer · Fintech</span>
              <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', margin: '0.5rem 0 1.5rem', lineHeight: 1.1 }}>
                Parthib<br />
                <span className="highlight">Goswami</span>
              </h1>
              <p className="section-desc">
                Building financial systems that scale. Fintech engineer with a focus on consolidation platforms, AI-assisted tooling, and workflow automation.
              </p>
              
              <div className="flex gap-4" style={{ marginTop: '2rem' }}>
                <a 
                  href="#projects" 
                  className="btn btn-primary flex items-center gap-2"
                  onClick={(e) => handleNavClick(e, 'projects')}
                >
                  View Projects <ArrowRight size={16} />
                </a>
                <a 
                  href="#contact" 
                  className="btn btn-secondary"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Get in Touch
                </a>
              </div>

              {/* Quick Hero Stats */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-val">SDE-2</span>
                  <span className="stat-lbl">HighRadius Corp</span>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
                <div className="stat-item">
                  <span className="stat-val">30%</span>
                  <span className="stat-lbl">Faster delivery via RAG</span>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
                <div className="stat-item">
                  <span className="stat-val">9.38</span>
                  <span className="stat-lbl">CGPA · KIIT</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Code Window */}
            <div className="flex justify-center">
              <div className="code-window" onClick={focusCodeInput} style={{ cursor: 'text' }}>
                <div className="code-window-header">
                  <div className="window-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-grey" />
                  </div>
                  <span className="window-title">parthib.ts</span>
                </div>
                <pre className="code-window-content">
                  <code>
                    <span className="code-keyword">const</span> developer = &#123;{'\n'}
                    {'  '}name: <span className="code-string">&quot;Parthib Goswami&quot;</span>,{'\n'}
                    {'  '}role: <span className="code-string">&quot;Full Stack Developer&quot;</span>,{'\n'}
                    {'  '}focus: <span className="code-string">&quot;Fintech&quot;</span>,{'\n'}
                    {'  '}stack: [<span className="code-string">&apos;Spring Boot&apos;</span>, <span className="code-string">&apos;LangChain&apos;</span>, <span className="code-string">&apos;Flowable&apos;</span>, <span className="code-string">&apos;React&apos;</span>],{'\n'}
                    {'  '}cgpa: <span className="code-number">9.38</span>,{'\n'}
                    {'  '}impact: <span className="code-string">&quot;30% faster delivery&quot;</span>{'\n'}
                    &#125;;{'\n\n'}
                    <span className="code-comment">{"// Click below & type developer.hire() + Enter to run"}</span>{'\n'}
                    <span className="flex items-center" style={{ display: 'inline-flex', width: '100%' }}>
                      <input
                        ref={codeInputRef}
                        type="text"
                        className="code-input"
                        value={typedCommand}
                        onChange={handleCommandChange}
                        onKeyDown={handleCommandKeyDown}
                        placeholder="developer.hire()"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          color: '#fbbf24',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'inherit',
                          padding: 0,
                          margin: 0,
                          width: '100%',
                          caretColor: '#fbbf24'
                        }}
                      />
                    </span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: About & Tech Stack */}
        <section id="about" className="section">
          <div className="grid grid-2">
            {/* About Left Column */}
            <div>
              <span className="section-label">About</span>
              <h2 className="section-title">
                Precision-driven engineer in the fintech space.
              </h2>
              <div className="section-desc" style={{ color: 'var(--foreground)' }}>
                <p style={{ marginBottom: '1.25rem' }}>
                  I&apos;m a Full Stack Developer with a deep focus on financial consolidation and reporting systems. My work spans scalable backend architecture, multi-dimensional data modeling, and AI-assisted tooling — all within the fintech domain.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  At <strong>HighRadius Corporation</strong> (Hyderabad), I joined as a founding member of the Financial Consolidation & Reporting product — building it from the ground up, progressing from Intern to <strong>SDE-2</strong>. I graduated from <strong>KIIT University</strong> (2020–2024) with a CGPA of <strong>9.38</strong>.
                </p>
                <p style={{ color: 'var(--muted-foreground)' }}>
                  I care about systems that are not just functional, but maintainable, observable, and built to last.
                </p>
              </div>
            </div>

            {/* About Right Column: Tech Stack */}
            <div>
              <span className="section-label">Tech Stack</span>
              <div className="badge-grid" style={{ marginTop: '1.5rem' }}>
                <span className="badge">Spring Boot</span>
                <span className="badge">Java</span>
                <span className="badge">REST APIs</span>
                <span className="badge">MDX</span>
                <span className="badge">LangChain</span>
                <span className="badge">Python</span>
                <span className="badge">Flowable</span>
                <span className="badge">React</span>
                <span className="badge">TypeScript</span>
                <span className="badge">SQL</span>
                <span className="badge">Excel Add-In (VSTO)</span>
                <span className="badge">Multi-Dimensional Data</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section id="projects" className="section">
          <span className="section-label">Projects</span>
          <h2 className="section-title" style={{ marginBottom: '3.5rem' }}>Work that ships.</h2>

          <div className="project-grid">
            {/* Top Full Width Card */}
            <div className="project-card" style={{ minHeight: '320px' }}>
              <div>
                <div className="project-card-header">
                  <span className="project-tag-badge">30% faster delivery</span>
                  <Link href="/projects/as-is-document-generator" className="project-card-icon" aria-label="View Project Case Study">
                    <ExternalLink size={20} />
                  </Link>
                </div>
                <h3 className="project-card-title" style={{ fontSize: '1.5rem' }}>AS-IS Document Generator</h3>
                <p className="project-card-desc">
                  Multi-modal AI pipeline that processes customer screen recordings (via Gemini or frame-by-frame LLM with zero thinking budget) and Excel metadata to auto-generate as-is Word documents. Cut implementation time by 30%.
                </p>
              </div>
              <div className="project-card-footer">
                <div className="flex flex-wrap gap-2">
                  <span className="badge">Python</span>
                  <span className="badge">Gemini API</span>
                  <span className="badge">Multi-threading</span>
                  <span className="badge">LLM</span>
                  <span className="badge">Word Automation</span>
                </div>
                <Link href="/projects/as-is-document-generator" className="card-link">
                  Read case study <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bottom Two Cards */}
            <div className="grid project-grid-bottom gap-6" style={{ marginTop: '1.5rem' }}>
              {/* Card 2 */}
              <div className="project-card">
                <div>
                  <div className="project-card-header">
                    <div /> {/* Spacer */}
                    <Link href="/projects/excel-addin-migration" className="project-card-icon" aria-label="View Project Case Study">
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                  <h3 className="project-card-title">Excel Add-In Migration</h3>
                  <p className="project-card-desc">
                    Migrated a legacy VB.NET Excel add-in (ODBC → Spring Boot REST APIs), introduced HazelCast distributed caching with Strategy pattern for large payloads, and replaced a paid MSI generator with an automated WiX Toolset pipeline.
                  </p>
                </div>
                <div className="project-card-footer flex-wrap gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="badge">Spring Boot</span>
                    <span className="badge">HazelCast</span>
                    <span className="badge">WiX Toolset</span>
                    <span className="badge">VB.NET</span>
                    <span className="badge">Fintech</span>
                  </div>
                  <Link href="/projects/excel-addin-migration" className="card-link">
                    Read case study <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="project-card">
                <div>
                  <div className="project-card-header">
                    <div /> {/* Spacer */}
                    <Link href="/projects/manual-entry-hub" className="project-card-icon" aria-label="View Project Case Study">
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                  <h3 className="project-card-title">Manual Entry Hub</h3>
                  <p className="project-card-desc">
                    Developed approval workflow features for financial data entry using Flowable as the workflow engine. Enabled structured, auditable multi-step approval chains for sensitive financial data.
                  </p>
                </div>
                <div className="project-card-footer flex-wrap gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="badge">Flowable</span>
                    <span className="badge">Java</span>
                    <span className="badge">Workflow</span>
                    <span className="badge">Spring Boot</span>
                    <span className="badge">Fintech</span>
                  </div>
                  <Link href="/projects/manual-entry-hub" className="card-link">
                    Read case study <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Experience */}
        <section id="experience" className="section">
          <span className="section-label">Experience</span>
          <h2 className="section-title" style={{ marginBottom: '3.5rem' }}>Where I&apos;ve built.</h2>

          <div className="timeline-block">
            <div className="timeline-header">
              <div>
                <div className="timeline-title-row">
                  <h3 className="company-title">HighRadius Corporation</h3>
                  <span className="project-tag-badge">Fintech · US</span>
                </div>
                <p className="timeline-info" style={{ marginTop: '0.25rem' }}>
                  Hyderabad, India · Financial Consolidation & Reporting Product
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="badge" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                    Founding Member — built the product from scratch
                  </span>
                </div>
              </div>
              <span className="badge">2024 – Present</span>
            </div>

            <div className="timeline-body">
              {/* SDE II */}
              <div className="timeline-item">
                <span className="timeline-dot active" />
                <h4 className="timeline-role">
                  Software Development Engineer II <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 400 }}>· Current</span>
                </h4>
                <ul className="timeline-bullets">
                  <li className="timeline-bullet">
                    Built internal RAG application using LangChain to auto-generate as-is Word documents, reducing customer implementation time by <strong style={{ color: 'var(--primary)' }}>30%</strong>.
                  </li>
                  <li className="timeline-bullet">
                    Developed Manual Entry Hub features with multi-step approval workflows using Flowable as the engine.
                  </li>
                </ul>
              </div>

              {/* SDE I */}
              <div className="timeline-item">
                <span className="timeline-dot" />
                <h4 className="timeline-role">Software Development Engineer I</h4>
                <ul className="timeline-bullets">
                  <li className="timeline-bullet">
                    Migrated legacy Excel add-in codebase to scalable Spring Boot REST APIs with multi-dimensional data handling and MDX queries.
                  </li>
                  <li className="timeline-bullet">
                    Contributed to the Financial Consolidation & Reporting product — core platform for enterprise finance teams.
                  </li>
                </ul>
              </div>

              {/* Intern */}
              <div className="timeline-item">
                <span className="timeline-dot" />
                <h4 className="timeline-role">
                  Software Engineering Intern <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 400 }}>· 2024</span>
                </h4>
                <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-6)', lineHeight: 1.6 }}>
                  Joined HighRadius as an intern and transitioned to a full-time role — building on the same Financial Consolidation product from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Education */}
        <section className="section">
          <span className="section-label">Education</span>
          <h2 className="section-title" style={{ marginBottom: '3.5rem' }}>Academic foundation.</h2>

          <div className="education-grid">
            {/* Uni */}
            <div className="education-card">
              <div className="edu-left">
                <div className="edu-icon-container">
                  <GraduationCap size={24} />
                </div>
                <div className="edu-details">
                  <h3>KIIT University</h3>
                  <p>B.Tech — Computer Science & Engineering</p>
                </div>
              </div>
              <div className="edu-right">
                <span className="edu-grade">CGPA 9.38</span>
                <p className="edu-year">2020 – 2024</p>
              </div>
            </div>

            {/* School 12 */}
            <div className="education-card">
              <div className="edu-left">
                <div className="edu-icon-container">
                  <Building2 size={24} />
                </div>
                <div className="edu-details">
                  <h3>DAV Model School, Durgapur</h3>
                  <p>Class XII — Science</p>
                </div>
              </div>
              <div className="edu-right">
                <span className="edu-grade">90.2%</span>
                <p className="edu-year">2020</p>
              </div>
            </div>

            {/* School 10 */}
            <div className="education-card">
              <div className="edu-left">
                <div className="edu-icon-container">
                  <Building2 size={24} />
                </div>
                <div className="edu-details">
                  <h3>DAV Model School, Durgapur</h3>
                  <p>Class X — CBSE</p>
                </div>
              </div>
              <div className="edu-right">
                <span className="edu-grade">91%</span>
                <p className="edu-year">2018</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Contact */}
        <section id="contact" className="section" style={{ borderBottom: 'none' }}>
          <div className="grid grid-2 items-center">
            {/* Contact Left Column */}
            <div>
              <span className="section-label">Contact</span>
              <h2 className="section-title">
                Let&apos;s build<br />
                <span className="highlight">something.</span>
              </h2>
              <p className="section-desc">
                Open to full-time roles, contract work, and interesting fintech problems. If you&apos;re building something that needs precision engineering — let&apos;s talk.
              </p>
            </div>

            {/* Contact Right Column Cards */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <a href="mailto:parthibgoswami25@gmail.com" className="contact-card">
                <div className="contact-left">
                  <div className="contact-icon-container">
                    <Mail size={20} />
                  </div>
                  <div className="contact-details">
                    <span>Email</span>
                    <h3>parthibgoswami25@gmail.com</h3>
                  </div>
                </div>
                <ArrowUpRight size={20} className="contact-arrow" />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/parthib-goswami-696685208" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card"
              >
                <div className="contact-left">
                  <div className="contact-icon-container">
                    <LinkedinIcon size={20} />
                  </div>
                  <div className="contact-details">
                    <span>LinkedIn</span>
                    <h3>Parthib Goswami</h3>
                  </div>
                </div>
                <ArrowUpRight size={20} className="contact-arrow" />
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Parthib25" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card"
              >
                <div className="contact-left">
                  <div className="contact-icon-container">
                    <GithubIcon size={20} />
                  </div>
                  <div className="contact-details">
                    <span>GitHub</span>
                    <h3>github.com/Parthib25</h3>
                  </div>
                </div>
                <ArrowUpRight size={20} className="contact-arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
