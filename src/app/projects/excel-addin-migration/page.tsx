import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Server, 
  Zap, 
  Package, 
  Database, 
  Layers, 
  HardDrive, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Excel Add-In Migration | Parthib Goswami Portfolio',
  description: 'Case study: Migrating a legacy VB.NET ODBC consolidation Excel add-in to microservice Spring Boot REST APIs with HazelCast distributed caching.',
};

export default function ExcelAddinMigration() {

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
          <span style={{ color: 'var(--foreground)' }}>Excel Add-In Migration</span>
        </nav>

        {/* Case Study Hero Section */}
        <section style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <span className="section-label">Case Study · HighRadius Corporation</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, margin: '0.5rem 0 1.5rem' }}>
            Excel Add-In<br />
            <span className="highlight">Migration</span>
          </h1>
          <p className="section-desc" style={{ fontSize: '1.25rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Inherited a legacy VB.NET Excel add-in firing raw ODBC queries. Migrated it to scalable Spring Boot APIs, introduced HazelCast distributed caching, replaced a paid MSI generator with an open-source WiX pipeline, and rebranded the add-in — all without touching the core financial logic.
          </p>

          {/* Badges Grid with Icons */}
          <div className="case-badge-grid">
            <div className="case-badge">
              <Server size={18} />
              <span>Spring Boot APIs</span>
            </div>
            <div className="case-badge">
              <Zap size={18} />
              <span>HazelCast Caching</span>
            </div>
            <div className="case-badge">
              <Package size={18} />
              <span>WiX MSI Pipeline</span>
            </div>
            <div className="case-badge">
              <Database size={18} />
              <span>ODBC → REST</span>
            </div>
            <div className="case-badge">
              <Layers size={18} />
              <span>Strategy Pattern</span>
            </div>
            <div className="case-badge">
              <HardDrive size={18} />
              <span>Object Storage</span>
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
                HighRadius had a mission-critical Excel add-in used by enterprise finance teams to upload and fetch consolidation reports. The add-in was written in legacy VB.NET and communicated with database servers using raw ODBC queries. This direct connection created huge security risks, high latency, and database locks during peak financial periods.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7 }}>
                Additionally, generating the installer (.MSI file) for client machines relied on a commercial, closed-source generator with expensive annual license seats. The system was fragile, slow to update, and couldn&apos;t easily be integrated into a modern CI/CD pipeline.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem' }}>The Solution</h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                I migrated the data retrieval architecture from raw database connections to a secured, microservice-based layer built on Spring Boot. Direct queries were replaced with highly optimized REST APIs that use the Strategy pattern to handle varying payloads dynamically based on report structures.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                To handle heavy multi-dimensional financial queries without overloading the core database, I integrated HazelCast distributed caching. This cached complex reporting trees, reducing database load and speeding up fetching actions.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7 }}>
                To solve the installer problem, I completely replaced the paid packaging software with an automated build script using the open-source WiX Toolset. This pipeline compiles and packages the add-in during the build, producing a signed MSI installer automatically. I also restructured the UI to support the company&apos;s new branding, giving the add-in a modern look.
              </p>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="flex flex-col gap-6">
            {/* Tech Stack Card */}
            <div className="project-card" style={{ padding: '1.75rem' }}>
              <h3 className="footer-title" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Tech Stack</h3>
              <div className="badge-grid">
                <span className="badge">Spring Boot</span>
                <span className="badge">HazelCast</span>
                <span className="badge">WiX Toolset</span>
                <span className="badge">VB.NET</span>
                <span className="badge">Fintech</span>
                <span className="badge">Java</span>
                <span className="badge">REST APIs</span>
                <span className="badge">Strategy Pattern</span>
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
                    <td>Legacy Migration</td>
                  </tr>
                  <tr>
                    <td>Domain</td>
                    <td>Fintech · Architecture</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Outcome Card */}
            <div className="outcome-box">
              <h4>Key Outcome</h4>
              <p>
                Eliminated recurring installer licensing costs by migrating to an automated WiX pipeline. Achieved up to 5x faster data fetching for end-users using HazelCast caching and stabilized the database under heavy concurrent loads.
              </p>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '4rem 0 2rem' }} />

        {/* Case Study Navigation Links */}
        <div className="flex justify-between items-center" style={{ fontSize: 'var(--text-7)' }}>
          <Link href="/projects/as-is-document-generator" className="card-link">
            <ArrowLeft size={14} /> Previous: AS-IS Document Generator
          </Link>
          <Link href="/projects/manual-entry-hub" className="card-link">
            Next: Manual Entry Hub <ArrowRight size={14} />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
