'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DecodedPart {
  header: string
  payload: string
  signature: string
}

export default function JwtSnip() {
  const [token, setToken] = useState<string>('')
  const [decoded, setDecoded] = useState<DecodedPart | null>(null)
  const [copied, setCopied] = useState<'header' | 'payload' | null>(null)

  const decodeJwt = () => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) throw new Error('Invalid JWT format')

      const [headerB64, payloadB64, signature] = parts

      const decodeBase64Url = (str: string) =>
        decodeURIComponent(
          atob(str.replace(/-/g, '+').replace(/_/g, '/'))
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )

      const header = JSON.stringify(JSON.parse(decodeBase64Url(headerB64)), null, 2)
      const payload = JSON.stringify(JSON.parse(decodeBase64Url(payloadB64)), null, 2)

      setDecoded({ header, payload, signature })
      toast.success('JWT decoded (not verified)')
    } catch (err) {
      setDecoded(null)
      toast.error('Could not decode JWT. Check the token.')
    }
  }

  const clearAll = () => {
    setToken('')
    setDecoded(null)
  }

  const copy = (text: string, type: 'header' | 'payload') => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto h-72 w-72 rounded-full bg-purple-500/18 blur-3xl opacity-70 mt-10" />
      </div>

      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-1.5 rounded-full mb-5 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              DevSnips · JWT Snip
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-3 bg-linear-to-r from-purple-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
            JWT Decoder
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
            Inspect JWT headers and payloads safely in your browser. This tool <span className="font-semibold text-slate-100">does not verify signatures</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Input */}
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-wide text-slate-300">
              JSON Web Token
            </Label>
            <Textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-1 h-64 md:h-72 font-mono text-xs md:text-sm resize-none bg-slate-950/80 border-slate-800 focus-visible:ring-purple-500"
              placeholder="Paste your JWT here (three parts separated by dots)…"
            />

            <div className="flex gap-2">
              <Button
                onClick={decodeJwt}
                className="flex-1 bg-purple-500 hover:bg-purple-400 text-slate-950"
              >
                Decode JWT
              </Button>
              <Button
                variant="outline"
                onClick={clearAll}
                className="border-slate-700 text-slate-300 hover:text-purple-300 hover:border-purple-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-[11px] text-slate-500">
              Tip: Use JWTs from your dev/staging environment only. Do not paste secrets or production tokens.
            </p>
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-slate-300">
                    Header
                  </Label>
                  {decoded?.header && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copy(decoded.header, 'header')}
                      className="h-7 px-2 text-[11px] text-slate-400 hover:text-purple-300"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      {copied === 'header' ? 'Copied' : 'Copy'}
                    </Button>
                  )}
                </div>
                <Textarea
                  value={decoded?.header ?? ''}
                  readOnly
                  className="h-40 font-mono text-xs md:text-sm bg-slate-950/70 border-slate-800 resize-none"
                  placeholder="Decoded header will appear here…"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-slate-300">
                    Payload
                  </Label>
                  {decoded?.payload && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copy(decoded.payload, 'payload')}
                      className="h-7 px-2 text-[11px] text-slate-400 hover:text-purple-300"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      {copied === 'payload' ? 'Copied' : 'Copy'}
                    </Button>
                  )}
                </div>
                <Textarea
                  value={decoded?.payload ?? ''}
                  readOnly
                  className="h-40 font-mono text-xs md:text-sm bg-slate-950/70 border-slate-800 resize-none"
                  placeholder="Decoded payload will appear here…"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-slate-300">
                Signature (raw, not verified)
              </Label>
              <div className="h-12 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 font-mono text-[11px] text-slate-400 overflow-x-auto">
                {decoded?.signature ?? '—'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
