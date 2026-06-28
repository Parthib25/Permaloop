import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Workflow, 
  ShieldCheck, 
  Users, 
  FileSpreadsheet, 
  ArrowLeft
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Manual Entry Hub Workflow | Parthib Goswami Portfolio',
  description: 'Case study: Designing structured multi-level approval chains for manual financial data adjustments using Flowable BPMN workflow engine.',
};

export default function ManualEntryHub() {

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
          <span style={{ color: 'var(--foreground)' }}>Manual Entry Hub</span>
        </nav>

        {/* Case Study Hero Section */}
        <section style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <span className="section-label">Case Study · HighRadius Corporation</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, margin: '0.5rem 0 1.5rem' }}>
            Manual Entry<br />
            <span className="highlight">Hub</span>
          </h1>
          <p className="section-desc" style={{ fontSize: '1.25rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Approval workflow features for financial data entry — built with Flowable as the workflow engine to enable structured, auditable multi-step approval chains for sensitive financial data in HighRadius&apos;s Consolidation product.
          </p>

          {/* Badges Grid with Icons */}
          <div className="case-badge-grid">
            <div className="case-badge">
              <Workflow size={18} />
              <span>Flowable Workflows</span>
            </div>
            <div className="case-badge">
              <ShieldCheck size={18} />
              <span>Audit Trail</span>
            </div>
            <div className="case-badge">
              <Users size={18} />
              <span>Multi-step Approvals</span>
            </div>
            <div className="case-badge">
              <FileSpreadsheet size={18} />
              <span>Financial Data Entry</span>
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
                In financial consolidation, manual journal entries and adjustments are a necessary but high-risk operation. Without a structured approval process, a single erroneous entry can cascade through consolidated financial statements — impacting regulatory reporting and audit outcomes.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7 }}>
                HighRadius&apos;s Manual Entry Hub needed a robust approval workflow that could enforce multi-level sign-off, maintain a complete audit trail, and integrate cleanly with the existing Spring Boot backend.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem' }}>The Solution</h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                I implemented the approval workflow system using <strong>Flowable</strong> — an open-source BPMN workflow engine that integrates with Spring Boot. Each manual entry submission triggers a Flowable process instance that routes through configurable approval stages.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7 }}>
                Approvers at each stage can review, approve, reject, or escalate entries. Every state transition is persisted by Flowable&apos;s process engine, giving finance teams a complete, tamper-proof audit trail for every entry.
              </p>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="flex flex-col gap-6">
            {/* Tech Stack Card */}
            <div className="project-card" style={{ padding: '1.75rem' }}>
              <h3 className="footer-title" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Tech Stack</h3>
              <div className="badge-grid">
                <span className="badge">Flowable</span>
                <span className="badge">Spring Boot</span>
                <span className="badge">Java</span>
                <span className="badge">BPMN 2.0</span>
                <span className="badge">REST APIs</span>
                <span className="badge">Fintech</span>
                <span className="badge">Workflow Engine</span>
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
                    <td>Feature Build</td>
                  </tr>
                  <tr>
                    <td>Domain</td>
                    <td>Fintech · Workflow</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Outcome Card */}
            <div className="outcome-box">
              <h4>Key Outcome</h4>
              <p>
                Structured, auditable approval chains for every manual financial entry — reducing risk and meeting enterprise compliance requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '4rem 0' }} />

        {/* Section: Approval Workflow Timeline */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem' }}>Approval Workflow</h2>
          
          <div className="vertical-timeline">
            {/* Step 1 */}
            <div className="vertical-timeline-item">
              <span className="vertical-timeline-dot" />
              <div className="vertical-timeline-card">
                <h3>Submit</h3>
                <p>Finance user submits a manual entry with amount, account, period, and supporting notes.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="vertical-timeline-item">
              <span className="vertical-timeline-dot active" />
              <div className="vertical-timeline-card">
                <h3>L1 Review</h3>
                <p>Team lead reviews the entry for accuracy and business justification. Can approve, reject, or request changes.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="vertical-timeline-item">
              <span className="vertical-timeline-dot active" />
              <div className="vertical-timeline-card">
                <h3>L2 Approval</h3>
                <p>Finance manager provides final approval for entries above threshold. Escalation path for high-value adjustments.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="vertical-timeline-item">
              <span className="vertical-timeline-dot active" />
              <div className="vertical-timeline-card">
                <h3>Posted</h3>
                <p>Approved entry is posted to the consolidation ledger. Flowable marks the process instance complete.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '4rem 0' }} />

        {/* Section: Why Flowable? Grid */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem' }}>Why Flowable?</h2>
          
          <div className="grid grid-2 gap-6">
            <div className="project-card">
              <h3 className="project-card-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>BPMN Standard</h3>
              <p className="project-card-desc" style={{ marginBottom: 0 }}>
                Workflows defined in industry-standard BPMN 2.0 — readable by both engineers and business analysts.
              </p>
            </div>

            <div className="project-card">
              <h3 className="project-card-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Spring Boot Native</h3>
              <p className="project-card-desc" style={{ marginBottom: 0 }}>
                First-class Spring Boot integration — process engine wires directly into the existing service layer.
              </p>
            </div>

            <div className="project-card">
              <h3 className="project-card-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Persistent State</h3>
              <p className="project-card-desc" style={{ marginBottom: 0 }}>
                Every process instance and task state is persisted — survives restarts, provides full audit history.
              </p>
            </div>

            <div className="project-card">
              <h3 className="project-card-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Dynamic Routing</h3>
              <p className="project-card-desc" style={{ marginBottom: 0 }}>
                Approval paths configurable per entry type, amount threshold, and organizational hierarchy.
              </p>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '4rem 0 2rem' }} />

        {/* Case Study Navigation Links */}
        <div className="flex justify-between items-center" style={{ fontSize: 'var(--text-7)' }}>
          <Link href="/projects/excel-addin-migration" className="card-link">
            <ArrowLeft size={14} /> Prev: Excel Add-In Migration
          </Link>
          <Link href="/" className="card-link">
            Back to all projects
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
