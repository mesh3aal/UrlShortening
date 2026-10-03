import { Link } from '@tanstack/react-router'

interface FooterLink {
  name: string
  href: string
}
interface FooterSection {
  title: string
  links: FooterLink[]
}
interface FooterLogo {
  url: string
  src: string
  alt: string
  title: string
}

interface FooterBasicProps {
  logo?: FooterLogo
  description?: string
  sections?: FooterSection[]
  copyright?: string
  legalLinks?: FooterLink[]
  className?: string
}

interface Footer2Props extends FooterBasicProps {
  logoClassName?: string
}
type Props = Partial<Footer2Props>

const defaultProps: Footer2Props = {
  sections: [
    {
      title: 'Product',
      links: [
        { name: 'Overview', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Marketplace', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Integrations', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Team', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help center', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Status', href: '#' },
        { name: 'Community', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Guides', href: '#' },
        { name: 'Templates', href: '#' },
        { name: 'Sales', href: '#' },
        { name: 'Advertise', href: '#' },
      ],
    },
  ],
  copyright: '© 2026 ShortLink. All rights reserved.',
  legalLinks: [
    { name: 'Terms and Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
}

const MAX_SECTIONS = 4

const Footer2 = (props: Props) => {
  const { description, sections, copyright, legalLinks } = {
    ...defaultProps,
    ...props,
  }

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS)

  return (
    <section className="py-8 bg-slate-900 text-white relative bottom-0 left-0 right-0">
      <div className="container mx-auto">
        <footer>
          <div className="text-center grid grid-cols-1 content-center justify-center sm:grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-6">
            <div className="col-span-full md:col-span-4 lg:col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center lg:justify-start">
                <Link
                  to="/"
                  className="flex items-center mx-auto gap-2 text-xl font-bold text-gray-900 shrink-0"
                >
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span className="text-white">ShortLink</span>
                </Link>
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {description}
              </p>
            </div>
            {visibleSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-sm font-semibold tracking-tight">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {legalLinks?.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export { Footer2 }
