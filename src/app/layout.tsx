import type { Metadata } from 'next';
import '@knadh/oat/oat.min.css';
import './globals.css';
import ThreeBackground from '@/components/ThreeBackground';
import SecurityGuard from '@/components/SecurityGuard';

export const metadata: Metadata = {
  title: 'Permaloop | Parthib Goswami | SDE-2 & Full Stack Developer',
  description:
    'Portfolio of Parthib Goswami, SDE-2 at HighRadius Corporation. Building financial systems that scale, specializing in consolidation platforms, AI-assisted tooling (RAG), and workflow automation.',
  keywords: [
    'Parthib Goswami',
    'Permaloop',
    'Full Stack Developer',
    'Fintech',
    'SDE-2',
    'HighRadius Corporation',
    'Spring Boot',
    'React',
    'Three.js',
    'Oat UI',
    'Software Engineer',
  ],
  authors: [{ name: 'Parthib Goswami' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Security Guard Blocker */}
        <SecurityGuard />

        {/* Dynamic 3D Canvas Background */}
        <ThreeBackground />
        
        {/* Subtle Grid Overlay */}
        <div className="grid-overlay" />
        
        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
