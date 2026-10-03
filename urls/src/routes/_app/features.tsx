import { createFileRoute } from '@tanstack/react-router'
import { BarChart3, Check, Gauge, Link2, LockKeyhole, MousePointerClick, ShieldCheck, Zap } from 'lucide-react'

export const Route = createFileRoute('/_app/features')({ component: RouteComponent })

const features = [
  { icon: Link2, title: 'Instant URL Shortening', description: 'Turn long, difficult-to-share links into short URLs in a simple, focused workflow.' },
  { icon: Zap, title: 'Fast & Simple', description: 'A lightweight experience designed to get from a long URL to a shareable link with minimal steps.' },
  { icon: ShieldCheck, title: 'Secure by Design', description: 'Authentication and authorization help keep account-level features protected.' },
  { icon: BarChart3, title: 'Useful Analytics', description: 'Track link activity and understand how your shortened URLs are being used.' },
  { icon: MousePointerClick, title: 'Easy to Manage', description: 'Keep your shortened links organized and accessible from your account.' },
  { icon: Gauge, title: 'Built for Everyday Use', description: 'A clean interface with the essential tools you need without unnecessary complexity.' },
]

const workflow = [
  ['01', 'Create', 'Paste your long URL and create a short, shareable link.'],
  ['02', 'Share', 'Use the short URL anywhere you need a cleaner link.'],
  ['03', 'Track', 'Review your links and available activity insights from your account.'],
]

function RouteComponent() {
  return (
    <main className="min-h-dvh bg-background">
      <section className="border-b border-border"><div className="container mx-auto px-6 py-20 lg:py-28"><div className="mx-auto max-w-3xl text-center"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground"><LockKeyhole className="size-4" />Simple. Fast. Focused.</div><h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Everything you need to manage short links.</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">ShortLink keeps the process simple: create shorter URLs, manage them from one place, and get useful insights as your links are shared.</p></div></div></section>
      <section className="container mx-auto px-6 py-16 lg:py-20"><div className="mx-auto max-w-5xl"><div className="mb-10 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Features</p><h2 className="text-3xl font-semibold tracking-tight">A focused toolkit for your links.</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map((feature) => { const Icon = feature.icon; return <article key={feature.title} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"><div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-muted"><Icon className="size-5" /></div><h3 className="text-lg font-semibold">{feature.title}</h3><p className="mt-2 leading-6 text-muted-foreground">{feature.description}</p></article> })}</div></div></section>
      <section className="border-y border-border bg-muted/30"><div className="container mx-auto px-6 py-16 lg:py-20"><div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">How it works</p><h2 className="text-3xl font-semibold tracking-tight">From long URL to shareable link in three steps.</h2></div><div className="divide-y divide-border rounded-2xl border border-border bg-card">{workflow.map(([number, title, description]) => <div key={number} className="flex gap-5 p-6"><span className="shrink-0 text-sm font-semibold text-muted-foreground">{number}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div></div>)}</div></div></div></section>
      <section className="container mx-auto px-6 py-16 lg:py-20"><div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-7 shadow-sm md:p-10"><div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-semibold tracking-tight">Built with practical web technologies.</h2><p className="mt-2 max-w-2xl leading-7 text-muted-foreground">The application combines a modern React interface with an ASP.NET Core backend, authentication, data persistence, and a clean API-driven architecture.</p></div><div className="flex shrink-0 flex-wrap gap-2 md:max-w-xs md:justify-end">{['React', 'TypeScript', 'ASP.NET Core', 'PostgreSQL', 'Docker'].map((item) => <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm"><Check className="size-3.5" />{item}</span>)}</div></div></div></section>
    </main>
  )
}
