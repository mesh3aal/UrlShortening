import { Pricing2 } from '#/components/pricing2'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/_app/pricing')({
  component: RouteComponent,
})

const included = [
  'Short links with a clean, shareable format',
  'Account-based link management',
  'Secure authentication',
  'Simple and focused dashboard experience',
]
const faqs = [
  {
    question: 'Can I start without paying?',
    answer:
      'Yes. The Free plan is designed for getting started and trying the core URL-shortening workflow.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'You can choose the plan that fits your usage as your needs change.',
  },
  {
    question: 'Is there a yearly billing option?',
    answer:
      'Yes. Use the Monthly / Yearly switch above to compare the available billing periods.',
  },
]

function RouteComponent() {
  return (
    <section className="min-h-dvh bg-background">
      <Pricing2 className='flex justify-center' />
      <section className="border-y border-border bg-muted/30 nx--mx-auto">
        <div className="container mx-auto px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ShieldCheck className="size-4" />I ncluded with every plan
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                The essentials are covered.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Start with the core experience and choose a higher plan when you
                need additional capacity and features.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <Check className="mt-0.5 size-4 shrink-0" />
                  <span className="text-sm leading-5">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <HelpCircle className="size-4" />
              Frequently asked questions
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Pricing, without the guesswork.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-slate-950 p-8 text-white md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Sparkles className="size-4" />
                Ready to get started?
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Start shortening your links today.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Create an account and try the core ShortLink experience with the
                Free plan.
              </p>
            </div>
            <Link
              to="/signup"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </section>
  )
}
