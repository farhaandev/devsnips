import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tool } from '@/types/tools'

export function ToolCard({ href, title, description, icon }: Tool) {
    return (
        <Card
            className="group h-full border border-slate-800/70 bg-slate-900/60 
                 hover:border-emerald-400/60 hover:bg-slate-900/90 
                 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(16,185,129,0.20)]"
        >
            <CardHeader className="pb-0 flex flex-row items-center gap-4 w-full">
                {/* gradient icon chip */}
                <div
                    className="w-12 h-10 rounded-lg mb-0 flex items-center justify-center font-mono text-xs
                     bg-linear-to-br from-emerald-400/30 via-sky-400/20 to-purple-500/30
                     text-emerald-100 group-hover:scale-110 group-hover:from-emerald-400/50
                     transition-transform duration-200"
                >
                    {icon}
                </div>
                <CardTitle className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
                <CardDescription className="text-sm text-slate-400">
                    {description}
                </CardDescription>

                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="mt-0 -ml-1.5 px-0 text-xs text-emerald-300 hover:text-emerald-200 hover:bg-transparent"
                >
                    <Link href={href} className="inline-flex items-center gap-1">
                        Open snip
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
