'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Copy, Trash2, ArrowRightLeft, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function StringSnip() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const copyToClipboard = useCallback(() => {
        if (!output) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        toast.success('Copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }, [output])

    const clearAll = useCallback(() => {
        setInput('')
        setOutput('')
        inputRef.current?.focus()
    }, [])

    const handleAction = useCallback((action: string) => {
        if (!input) return
        try {
            let res = ''
            switch (action) {
                case 'base64-encode':
                    res = btoa(input)
                    break
                case 'base64-decode':
                    res = atob(input)
                    break
                case 'url-encode':
                    res = encodeURIComponent(input)
                    break
                case 'url-decode':
                    res = decodeURIComponent(input)
                    break
                case 'html-encode': {
                    const div = document.createElement('div')
                    div.innerText = input
                    res = div.innerHTML
                    break
                }
                case 'html-decode': {
                    const div = document.createElement('div')
                    div.innerHTML = input
                    res = div.innerText
                    break
                }
            }
            setOutput(res)
            toast.success(`Action successful`)
        } catch (err) {
            toast.error('Invalid input for this action')
        }
    }, [input])

    return (
        <div className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-12">
            <div className="relative container mx-auto px-4 max-w-6xl">
                {/* header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-emerald-400">
                        String Snip
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
                        Encode and decode strings quickly. Base64, URL Encoding, and HTML Entities.
                        Everything runs securely in your browser.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mb-10">
                    {/* Input */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs uppercase tracking-wide text-slate-300">
                                Input Text
                            </Label>
                        </div>

                        <Textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="h-80 md:h-96 font-mono text-xs md:text-sm resize-none bg-slate-950/80 border-slate-800 focus-visible:ring-emerald-500"
                            placeholder="Paste your string here..."
                        />
                        <Button
                            variant="outline"
                            onClick={clearAll}
                            className="w-full border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-400"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Input
                        </Button>
                    </div>

                    {/* Output */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs uppercase tracking-wide text-slate-300">
                                Output Text
                            </Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyToClipboard}
                                disabled={!output}
                                className="h-7 px-2 text-[11px] text-slate-400 hover:text-emerald-300"
                            >
                                <Copy className="w-3 h-3 mr-1" />
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        </div>

                        <Textarea
                            value={output}
                            readOnly
                            className="h-80 md:h-96 font-mono text-xs md:text-sm bg-slate-950/70 border-slate-800 resize-none"
                            placeholder="Transformed string will appear here…"
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 md:p-6">
                    <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center">
                        <ArrowRightLeft className="w-4 h-4 mr-2 text-emerald-400" />
                        Transform Actions
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-slate-400 uppercase tracking-wide">Base64</Label>
                            <div className="flex gap-2">
                                <Button onClick={() => handleAction('base64-encode')} className="flex-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20">
                                    Encode
                                </Button>
                                <Button onClick={() => handleAction('base64-decode')} className="flex-1 bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700">
                                    Decode
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs text-slate-400 uppercase tracking-wide">URL</Label>
                            <div className="flex gap-2">
                                <Button onClick={() => handleAction('url-encode')} className="flex-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20">
                                    Encode
                                </Button>
                                <Button onClick={() => handleAction('url-decode')} className="flex-1 bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700">
                                    Decode
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs text-slate-400 uppercase tracking-wide">HTML Entities</Label>
                            <div className="flex gap-2">
                                <Button onClick={() => handleAction('html-encode')} className="flex-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20">
                                    Encode
                                </Button>
                                <Button onClick={() => handleAction('html-decode')} className="flex-1 bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700">
                                    Decode
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
