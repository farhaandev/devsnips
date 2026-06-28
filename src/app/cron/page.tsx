'use client'

import React, { useState, useEffect } from 'react'
import { Clock, CalendarDays, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import cronstrue from 'cronstrue'
import { CronExpressionParser } from 'cron-parser'

const PRESETS = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Every day at midnight', value: '0 0 * * *' },
    { label: 'Every Monday at 9AM', value: '0 9 * * 1' },
    { label: 'Every weekday at 10PM', value: '0 22 * * 1-5' },
]

export default function CronSnip() {
    const [expression, setExpression] = useState('0 22 * * 1-5')
    const [humanReadable, setHumanReadable] = useState('')
    const [nextRuns, setNextRuns] = useState<string[]>([])
    const [error, setError] = useState('')

    useEffect(() => {
        try {
            if (!expression.trim()) {
                setHumanReadable('')
                setNextRuns([])
                setError('')
                return
            }
            
            // Generate human readable description
            const desc = cronstrue.toString(expression, { use24HourTimeFormat: true })
            setHumanReadable(desc)

            // Generate next runs
            const interval = CronExpressionParser.parse(expression)
            const runs = []
            for (let i = 0; i < 5; i++) {
                runs.push(interval.next().toString())
            }
            setNextRuns(runs)
            setError('')
        } catch (err: any) {
            setHumanReadable('')
            setNextRuns([])
            setError(err.message || 'Invalid cron expression')
        }
    }, [expression])

    return (
        <div className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-12">
            <div className="relative container mx-auto px-4 max-w-4xl">
                {/* header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-emerald-400">
                        Cron Snip
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
                        Explain and build cron expressions easily. See the next execution dates in your local timezone.
                    </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 md:p-8 mb-8 space-y-8">
                    
                    {/* Input Section */}
                    <div className="space-y-4">
                        <Label className="text-xs uppercase tracking-wide text-slate-300">
                            Cron Expression
                        </Label>
                        <Input 
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            className="font-mono text-lg md:text-2xl h-14 bg-slate-900 border-slate-700 text-emerald-400 text-center"
                            placeholder="* * * * *"
                        />
                        {error && (
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        )}
                        {!error && humanReadable && (
                            <p className="text-slate-200 text-lg md:text-xl text-center font-medium">
                                "{humanReadable}"
                            </p>
                        )}
                    </div>

                    {/* Presets */}
                    <div className="pt-4 border-t border-slate-800">
                        <Label className="text-xs uppercase tracking-wide text-slate-400 mb-3 block">
                            Quick Presets
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            {PRESETS.map(preset => (
                                <Button 
                                    key={preset.value}
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setExpression(preset.value)}
                                    className="bg-slate-900 border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50"
                                >
                                    {preset.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Next Executions */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 md:p-8">
                    <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2 text-emerald-400" />
                        Next 5 Executions
                    </h3>
                    
                    {nextRuns.length > 0 ? (
                        <div className="space-y-2">
                            {nextRuns.map((run, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/50">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span className="font-mono text-slate-200 text-sm md:text-base">
                                        {new Date(run).toLocaleString(undefined, { 
                                            weekday: 'short', 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric', 
                                            hour: '2-digit', 
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500">
                            <RefreshCw className="w-8 h-8 mx-auto mb-3 opacity-20" />
                            <p>Enter a valid expression to see upcoming runs</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
