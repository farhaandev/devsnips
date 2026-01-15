import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from './components/Navbar'

export const metadata: Metadata = {
  title: 'DevSnips - Free Developer Tools (JSON, Regex, JWT)',
  description:
    'DevSnips is a free collection of developer utilities: JSON formatter with TypeScript types, regex tester, and JWT decoder. No signup, no ads, 100% client-side.',
  metadataBase: new URL('https://devsnips-x.vercel.app'),
  openGraph: {
    title: 'DevSnips - Free Developer Tools',
    description:
      'Format JSON, test regex and decode JWTs in your browser. Fast, privacy-friendly utilities for developers.',
    url: 'https://devsnips-x.vercel.app',
    siteName: 'DevSnips',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevSnips - Free Dev Tools',
    description:
      'JSON formatter, regex tester and JWT decoder. No signup, no ads, 100% client-side.',
    creator: '@farhaanmalik',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 min-h-screen pb-14 md:pb-0">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
