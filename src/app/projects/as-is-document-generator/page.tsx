import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Clock, 
  Video, 
  Cpu, 
  FileText, 
  Share2, 
  Zap, 
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AI AS-IS Document Generator | Parthib Goswami Portfolio',
  description: 'Case study: How I engineered an AI-assisted RAG document generator at HighRadius to automate the manual onboarding process, converting screen recordings to step-by-step Word manuals.',
};

export default function AsIsDocumentGenerator() {

  return (
    <>
      <Header activeSection="projects" />

      <main className="container" style={{ paddingBottom: '5rem' }}>
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <Link href="/#projects">Projects</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span style={{ color: 'var(--foreground)' }}>AS-IS Document Generator</span>
        </nav>

        {/* Case Study Hero Section */}
        <section style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <span className="section-label">Case Study · HighRadius Corporation</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, margin: '0.5rem 0 1.5rem' }}>
            AS-IS Document<br />
            <span className="highlight">Generator</span>
          </h1>
          <p className="section-desc" style={{ fontSize: '1.25rem', maxWidth: '800px', lineHeight: 1.6 }}>
            A multi-modal AI pipeline that watches what customers do in Excel — processing screen recordings and workbook metadata — then synthesises everything into a ready-to-review as-is Word document. Cut implementation time by 30%.
          </p>

          {/* Badges Grid with Icons */}
          <div className="case-badge-grid">
            <div className="case-badge">
              <Clock size={18} />
              <span>30% faster delivery</span>
            </div>
            <div className="case-badge">
              <Video size={18} />
              <span>Video understanding</span>
            </div>
            <div className="case-badge">
              <Cpu size={18} />
              <span>Multi-threaded Python</span>
            </div>
            <div className="case-badge">
              <FileText size={18} />
              <span>Word doc output</span>
            </div>
            <div className="case-badge">
              <Share2 size={18} />
              <span>Multi-modal fusion</span>
            </div>
            <div className="case-badge">
              <Zap size={18} />
              <span>HighRadius · SDE-2</span>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '3rem 0' }} />

        {/* Core Case Study Content */}
        <section className="grid grid-2 grid-2-large-left gap-12">
          {/* Left Column: Problem & Solution */}
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem' }}>The Problem</h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                When onboarding new enterprise clients, HighRadius&apos;s implementation engineers had to manually document the client&apos;s existing (&quot;as-is&quot;) financial processes and Excel workbook usage. This involved sitting through hour-long screen recordings, capturing step-by-step clicks, mapping out data dependencies, and drafting massive Word manuals.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7 }}>
                This manual process was incredibly tedious, took several days per client, and delayed overall implementation schedules. It was also prone to omissions, causing configuration errors down the line.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem' }}>The Solution</h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                I architected and built an automated, multi-modal AI documentation pipeline. Written in Python, the pipeline ingests raw MP4 screen recordings alongside raw Excel workbook metadata. It runs a multi-threaded processing flow to extract frames and sync them with file operations.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Using the Gemini API, the pipeline feeds video frames and workbook metadata to a frame-by-frame LLM sequence. The model acts as an expert analyst: identifying what cells are clicked, which formulas are written, and what financial tasks are being performed.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7 }}>
                Finally, a custom Word automation module gathers this structured JSON sequence and compiles it into a professionally formatted Word document containing step-by-step screenshots, cell formulas, and prose explanations, fully formatted in the company style.
              </p>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="flex flex-col gap-6">
            {/* Tech Stack Card */}
            <div className="project-card" style={{ padding: '1.75rem' }}>
              <h3 className="footer-title" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Tech Stack</h3>
              <div className="badge-grid">
                <span className="badge">Python</span>
                <span className="badge">Gemini API</span>
                <span className="badge">Multi-threading</span>
                <span className="badge">LLM</span>
                <span className="badge">Word Automation</span>
                <span className="badge">OpenXML</span>
                <span className="badge">JSON Parsing</span>
              </div>
            </div>

            {/* Details Card */}
            <div className="project-card" style={{ padding: '1.75rem' }}>
              <h3 className="footer-title" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Details</h3>
              <table className="detail-table">
                <tbody>
                  <tr>
                    <td>Company</td>
                    <td>HighRadius</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>SDE-2</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>AI Integration</td>
                  </tr>
                  <tr>
                    <td>Domain</td>
                    <td>Fintech · AI Automation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Outcome Card */}
            <div className="outcome-box">
              <h4>Key Outcome</h4>
              <p>
                Reduced manual documentation time by 30%. Accelerates client onboarding loops from several days to just a few hours and eliminates process configuration errors.
              </p>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '4rem 0 2rem' }} />

        {/* Case Study Navigation Links */}
        <div className="flex justify-between items-center" style={{ fontSize: 'var(--text-7)' }}>
          <span style={{ color: 'var(--faint-foreground)' }}>First Project</span>
          <Link href="/projects/excel-addin-migration" className="card-link">
            Next: Excel Add-In Migration <ArrowRight size={14} />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
