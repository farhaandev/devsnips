'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Copy, Download, Play, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { formatJson, generateTsInterface } from '@/lib/json'
import { JsonState } from '@/types/tools'

export default function JsonFormatter() {
    const [state, setState] = useState<JsonState>({
        input: `{
  "user": {
    "id": 1,
    "name": "Farhaan",
    "active": true
  }
}`,
        output: '',
        loading: false,
    })
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleFormat = useCallback(() => {
        setState((prev) => ({ ...prev, loading: true }))
        const output = formatJson(state.input)
        setState((prev) => ({ ...prev, output, loading: false }))
        if (output) {
            toast.success('JSON formatted')
        } else {
            toast.error('Invalid JSON')
        }
    }, [state.input])

    const copyToClipboard = useCallback((text: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard')
    }, [])

    const downloadJson = useCallback(() => {
        if (!state.output) return
        const blob = new Blob([state.output], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'formatted.json'
        a.click()
        URL.revokeObjectURL(url)
    }, [state.output])

    const clearAll = useCallback(() => {
        setState({ input: '', output: '', loading: false })
        inputRef.current?.focus()
    }, [])

    const tsCode = generateTsInterface(state.output)

    return (
        <div className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-12">
            {/* background glows */}
            <div className="pointer-events-none absolute inset-0">
                <div className="mx-auto h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl opacity-70 mt-10" />
                <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4 max-w-6xl">
                {/* header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-1.5 rounded-full mb-5 backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-medium text-slate-300">
                            DevSnips · JSON Snip
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-semibold mb-3 bg-linear-to-r from-emerald-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                        JSON Formatter & TS Types
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
                        Paste any JSON, cleanly format it, and instantly generate a TypeScript interface.
                        Everything runs in your browser.
                    </p>
                </div>

                {/* editor grid */}
                <div className="grid lg:grid-cols-2 gap-6 mb-10">
                    {/* Input */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs uppercase tracking-wide text-slate-300">
                                Raw JSON
                            </Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-[11px] text-slate-400 hover:text-emerald-300"
                                onClick={() =>
                                    setState((prev) => ({
                                        ...prev,
                                        input: `{
  "user": {
    "id": 1,
    "name": "Farhaan",
    "active": true
  }
}`,
                                    }))
                                }
                            >
                                Load example
                            </Button>
                        </div>

                        <Textarea
                            ref={inputRef}
                            value={state.input}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setState((prev) => ({ ...prev, input: e.target.value }))
                            }
                            className="h-80 md:h-96 font-mono text-xs md:text-sm resize-none bg-slate-950/80 border-slate-800 focus-visible:ring-emerald-500"
                            placeholder="Paste your JSON here..."
                        />

                        <div className="flex gap-2">
                            <Button
                                onClick={handleFormat}
                                disabled={state.loading}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                            >
                                <Play className="w-4 h-4 mr-2" />
                                {state.loading ? 'Formatting…' : 'Format JSON'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={clearAll}
                                className="border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-400"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Label className="text-xs uppercase tracking-wide text-slate-300">
                                    Formatted JSON
                                </Label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(state.output)}
                                    disabled={!state.output}
                                    className="h-7 px-2 text-[11px] text-slate-400 hover:text-emerald-300"
                                >
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                </Button>
                            </div>

                            {state.output && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={downloadJson}
                                    className="h-7 px-2 text-[11px] text-slate-400 hover:text-emerald-300"
                                >
                                    <Download className="w-3 h-3 mr-1" />
                                    Download
                                </Button>
                            )}
                        </div>

                        <Textarea
                            value={state.output}
                            readOnly
                            className="h-80 md:h-96 font-mono text-xs md:text-sm bg-slate-950/70 border-slate-800 resize-none"
                            placeholder="Formatted JSON will appear here…"
                        />
                    </div>
                </div>

                {/* TS interface block */}
                {tsCode && (
                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 md:p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-slate-100">
                                Generated TypeScript interface
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(tsCode)}
                                className="h-7 px-2 text-[11px] text-slate-400 hover:text-emerald-300"
                            >
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                            </Button>
                        </div>
                        <pre className="max-h-80 overflow-auto rounded-lg bg-slate-900/90 p-4 font-mono text-xs md:text-sm text-emerald-100">
                            {tsCode}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}
