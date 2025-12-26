'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Braces, Regex, Shield } from 'lucide-react'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/json', label: 'JSON', icon: Braces },
  { href: '/regex', label: 'Regex', icon: Regex },
  { href: '/jwt', label: 'JWT', icon: Shield },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <>
      {/* TOP NAV – md+ screens */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <nav className="max-w-7xl mx-auto flex items-center md:justify-between justify-center px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-linear-to-br from-emerald-400/70 via-sky-400/70 to-purple-500/70" />
            <span className="ms:text-sm text-lg font-semibold tracking-tight text-slate-100">
              DevSnips
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-3 text-xs">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3 py-1.5 rounded-full transition-colors',
                    active
                      ? 'text-emerald-500 font-medium'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-slate-900/80'
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      {/* BOTTOM TAB BAR – mobile only */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-md flex items-center justify-around px-2 py-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-2xl text-[10px] transition-colors',
                  active
                    ? 'text-emerald-300 bg-slate-900'
                    : 'text-slate-400 hover:text-emerald-300'
                )}
              >
                <Icon className={cn(
                  'w-4 h-4 mb-0.5',
                  active && 'text-emerald-300'
                )} />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
