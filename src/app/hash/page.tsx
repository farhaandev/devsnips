'use client'

import React, { useState, useEffect } from 'react'
import { Copy, RefreshCw, KeyRound, Fingerprint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import CryptoJS from 'crypto-js'

export default function HashSnip() {
    const [input, setInput] = useState('')
    const [hashes, setHashes] = useState({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: ''
    })
    const [uuid, setUuid] = useState('')

    useEffect(() => {
        if (!input) {
            setHashes({ md5: '', sha1: '', sha256: '', sha512: '' })
            return
        }
        setHashes({
            md5: CryptoJS.MD5(input).toString(),
            sha1: CryptoJS.SHA1(input).toString(),
            sha256: CryptoJS.SHA256(input).toString(),
            sha512: CryptoJS.SHA512(input).toString(),
        })
    }, [input])

    useEffect(() => {
        generateUuid()
    }, [])

    const generateUuid = () => {
        try {
            setUuid(crypto.randomUUID())
        } catch (e) {
            // fallback for older browsers if needed, though modern standard supports it
            toast.error("UUID generation not supported in this browser.")
        }
    }

    const copyToClipboard = (text: string, name: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        toast.success(`${name} copied to clipboard`)
    }

    return (
        <div className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-12">
            <div className="relative container mx-auto px-4 max-w-6xl">
                {/* header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-emerald-400">
                        Hash & Crypto Snip
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
                        Generate MD5, SHA hashes, and UUIDs instantly. 
                        Everything runs securely in your browser—no data is sent to a server.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    
                    {/* Hashing Section */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <Fingerprint className="w-5 h-5 mr-2 text-emerald-400" />
                            <h2 className="text-xl font-semibold">String Hashing</h2>
                        </div>
                        
                        <div className="space-y-3">
                            <Label className="text-xs uppercase tracking-wide text-slate-300">
                                Input Text
                            </Label>
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="h-32 font-mono text-sm bg-slate-950/80 border-slate-800 focus-visible:ring-emerald-500 resize-none"
                                placeholder="Type or paste text to hash..."
                            />
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'MD5', value: hashes.md5 },
                                { name: 'SHA-1', value: hashes.sha1 },
                                { name: 'SHA-256', value: hashes.sha256 },
                                { name: 'SHA-512', value: hashes.sha512 },
                            ].map((hash) => (
                                <div key={hash.name} className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs text-slate-400">{hash.name}</Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(hash.value, hash.name)}
                                            disabled={!hash.value}
                                            className="h-6 px-2 text-[10px] text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-400/10"
                                        >
                                            <Copy className="w-3 h-3 mr-1" />
                                            Copy
                                        </Button>
                                    </div>
                                    <Input
                                        readOnly
                                        value={hash.value}
                                        className="font-mono text-xs bg-slate-900 border-slate-800 text-slate-300 h-9"
                                        placeholder={`Waiting for input...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generators Section */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <KeyRound className="w-5 h-5 mr-2 text-emerald-400" />
                            <h2 className="text-xl font-semibold">Generators</h2>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6">
                            <div className="flex flex-col space-y-4">
                                <Label className="text-xs uppercase tracking-wide text-slate-300">
                                    UUID v4
                                </Label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        readOnly
                                        value={uuid}
                                        className="font-mono text-sm bg-slate-900 border-slate-800 text-emerald-300 flex-1 h-12 text-center"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        onClick={generateUuid}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Generate New
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        onClick={() => copyToClipboard(uuid, 'UUID')}
                                        className="border-slate-700 hover:bg-slate-800"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
