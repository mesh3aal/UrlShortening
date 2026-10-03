import { createFileRoute } from '@tanstack/react-router'
import { Braces, Database, Globe, Layers3, ShieldCheck, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/_app/about')({ component: RouteComponent })

const skills = ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'RESTful APIs', 'Entity Framework Core', 'PostgreSQL', 'Docker', 'Git', 'OAuth 2.0 / OpenID Connect', 'ASP.NET Core Identity', 'Clean Architecture']

const focusAreas = [
  { icon: Braces, title: 'Modern Web Development', description: 'Building responsive web applications with React, TypeScript, and modern frontend practices.' },
  { icon: Layers3, title: 'Full-Stack Thinking', description: 'Connecting polished user interfaces with reliable APIs, business logic, databases, and authentication.' },
  { icon: ShieldCheck, title: 'Secure Applications', description: 'Working with authentication and authorization using OAuth 2.0, OpenID Connect, and ASP.NET Core Identity.' },
  { icon: Database, title: 'Data & APIs', description: 'Designing RESTful APIs and working with Entity Framework Core, LINQ, PostgreSQL, and practical data access.' },
]

function RouteComponent() {
  return (
    <main className="min-h-dvh bg-background">
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground"><Sparkles className="size-4" />Full-Stack Web Developer</div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Hi, I&apos;m Meshaal Jamal.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">I&apos;m a Full-Stack Web Developer who enjoys turning ideas into practical, maintainable web applications. I work across the frontend and backend, with a strong focus on clean APIs, security, data, and a simple user experience.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">About me</p>
            <h2 className="text-3xl font-semibold tracking-tight">Building from the interface to the database.</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-7">
              <p>My development journey started with a strong interest in software engineering and problem solving. Today, I build web applications across the full stack, from React interfaces and client-side interactions to ASP.NET Core APIs, databases, and authentication.</p>
              <p>I care about understanding why a solution works rather than simply copying it. I prefer official documentation, established engineering practices, and hands-on projects that help me turn concepts into real development skills.</p>
              <p>I&apos;m continuously improving my knowledge of architecture, testing, security, and modern web development while building projects that are useful, maintainable, and easy to evolve.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-border pb-5"><div className="flex size-11 items-center justify-center rounded-xl bg-muted"><Globe className="size-5" /></div><div><p className="font-semibold">My development stack</p><p className="text-sm text-muted-foreground">Tools and technologies I work with</p></div></div>
            <div className="flex flex-wrap gap-2 pt-5">{skills.map((skill) => <span key={skill} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground">{skill}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">What I work on</p><h2 className="text-3xl font-semibold tracking-tight">A full-stack approach to web development.</h2><p className="mt-4 leading-7 text-muted-foreground">I like understanding the complete path of a feature: how a user interacts with it, how the frontend communicates with the API, how data is stored, and how the application stays secure.</p></div>
            <div className="grid gap-4 md:grid-cols-2">{focusAreas.map((area) => { const Icon = area.icon; return <div key={area.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-muted"><Icon className="size-5" /></div><h3 className="text-lg font-semibold">{area.title}</h3><p className="mt-2 leading-6 text-muted-foreground">{area.description}</p></div> })}</div>
          </div>
        </div>
      </section>
    </main>
  )
}
