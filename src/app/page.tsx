import { Button } from '@/components/ui/button'
import { ToolCard } from './components/ToolCard'
import { Toaster } from 'sonner'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

const tools = [
  {
    href: '/json',
    title: 'JSON Snip',
    description: 'Format, validate & generate TypeScript types from JSON.',
    icon: '{}',
  },
  {
    href: '/regex',
    title: 'Regex Snip',
    description: 'Test and debug regular expressions with live matches.',
    icon: '/* */',
  },
  {
    href: '/jwt',
    title: 'JWT Snip',
    description: 'Decode JWT tokens safely in your browser.',
    icon: 'eyJ',
  },
]

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen flex flex-col overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl opacity-70 mt-24" />
          <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -right-24 top-40 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        {/* HERO */}
        <section className="relative container mx-auto px-4 md:pt-20 pt-12 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-1.5 rounded-full mb-8 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              DevSnips · Tiny tools for everyday dev work
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold mb-4 bg-linear-to-r from-emerald-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">
            Developer Snippets, Super Fast.
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            DevSnips is a collection of focused browser tools for developers -
            format JSON, test regex, decode JWTs and more, without signups or ads.
          </p>

          <div className="flex flex-col items-center gap-5">
            <Button
              size="lg"
              asChild
              className="px-7 py-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold"
            >
              <Link href="/json">
                <span className="inline-flex items-center gap-2">
                  Open JSON Snip
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </Button>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              No signup · No tracking · 100% client-side
            </p>
          </div>
        </section>

        {/* TOOLS GRID */}
        <section className="relative max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium pl-2 text-slate-300 tracking-wide uppercase">
              Snips available now
            </h2>
            {/* <span className="text-xs text-slate-500">
              More utilities coming soon.
            </span> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 text-center text-xs text-slate-500">
            Made with ❤️ by{' '}
            <a
              href="https://farhaanmalik.vercel.app"
              className="font-medium text-slate-300 hover:text-emerald-400"
            >
              Farhaan
            </a>
            {' · '}
            <a
              href="https://github.com/farhaandev/devsnips"
              className="hover:text-emerald-400"
            >
              GitHub
            </a>
            {' · '}
            <a
              href="https://x.com/farhaanmalik"
              className="hover:text-emerald-400"
            >
              X
            </a>
          </div>
        </footer>
      </main>

      <Toaster richColors position="top-center" />
    </>
  )
}
