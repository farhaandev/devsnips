'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Play, Trash2 } from 'lucide-react'
import { toast } from 'sonner'


export default function RegexSnip() {
  const [pattern, setPattern] = useState<string>('^dev(snips)?$')
  const [flags, setFlags] = useState<string>('i')
  const [text, setText] = useState<string>('DevSnips\nDevtools\ndevsnips\nsnippet')
  const [matches, setMatches] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const runRegex = () => {
    try {
      const regex = new RegExp(pattern, flags)
      const lines = text.split('\n')
      const result: string[] = []

      lines.forEach((line) => {
        if (regex.test(line)) {
          result.push(line)
        }
      })

      setMatches(result)
      toast.success('Regex applied')
    } catch (err) {
      toast.error('Invalid regex or flags')
    }
  }

  const clearAll = () => {
    setPattern('')
    setFlags('')
    setText('')
    setMatches([])
  }

  const copyMatches = () => {
    if (!matches.length) return
    navigator.clipboard.writeText(matches.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto h-72 w-72 rounded-full bg-sky-500/15 blur-3xl opacity-70 mt-10" />
      </div>

      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-1.5 rounded-full mb-5 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              DevSnips · Regex Snip
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-3 bg-linear-to-r from-sky-300 via-emerald-300 to-purple-400 bg-clip-text text-transparent">
            Regex Tester
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
            Test regular expressions against multiple lines of text with instant feedback.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Left side: pattern + text */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label className="text-xs uppercase tracking-wide text-slate-300">
                  Pattern
                </Label>
                <input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="mt-1 w-full rounded-md bg-slate-950/80 border border-slate-800 px-3 py-2 text-xs md:text-sm font-mono text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500"
                  placeholder="e.g. ^dev(snips)?$"
                />
              </div>
              <div className="w-20">
                <Label className="text-xs uppercase tracking-wide text-slate-300">
                  Flags
                </Label>
                <input
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="mt-1 w-full rounded-md bg-slate-950/80 border border-slate-800 px-2 py-2 text-xs font-mono text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500"
                  placeholder="gmi"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wide text-slate-300">
                Test text (one string per line)
              </Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1 h-72 md:h-80 font-mono text-xs md:text-sm resize-none bg-slate-950/80 border-slate-800 focus-visible:ring-sky-500"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={runRegex}
                className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950"
              >
                <Play className="w-4 h-4 mr-2" />
                Test regex
              </Button>
              <Button
                variant="outline"
                onClick={clearAll}
                className="border-slate-700 text-slate-300 hover:text-sky-300 hover:border-sky-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right side: matches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs uppercase tracking-wide text-slate-300">
                Matching lines
              </Label>
              <Button
                variant="ghost"
                size="sm"
                disabled={!matches.length}
                onClick={copyMatches}
                className="h-7 px-2 text-[11px] text-slate-400 hover:text-sky-300"
              >
                <Copy className="w-3 h-3 mr-1" />
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>

            <div className="h-72 md:h-80 rounded-lg border border-slate-800 bg-slate-950/80 p-3 overflow-auto font-mono text-xs md:text-sm">
              {matches.length === 0 ? (
                <p className="text-slate-500 text-[11px]">
                  No matches yet. Run a regex or adjust your pattern.
                </p>
              ) : (
                <ul className="space-y-1">
                  {matches.map((line, idx) => (
                    <li
                      key={`${line}-${idx}`}
                      className="rounded bg-sky-500/10 border border-sky-500/30 px-2 py-1 text-sky-100"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
