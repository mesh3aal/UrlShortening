import { Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useContext, useState } from 'react'
import { AuthContext } from '#/contexts/authContext'
import api from '#/lib/api'


export default function HeroSection() {

  interface urlshortenRequest {
    Url: string,
    Alias?: string | undefined,
  }

  const [inputUrl, setInputUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('pending_url') || ''
    }
    return ''
  })
  const [alias, setAlias] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('pending_alias') || ''
    }
    return ''
  })
  const [url, setUrl] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const { signIn, isLoggedIn } = useContext(AuthContext)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    // If user is not logged in, redirect to Keycloak login page
    if (!isLoggedIn) {
      const trimmed = inputUrl.trim()
      if (trimmed && typeof window !== 'undefined') {
        sessionStorage.setItem('pending_url', trimmed)
      }
      if (alias.trim() && typeof window !== 'undefined') {
        sessionStorage.setItem('pending_alias', alias.trim())
      }
      signIn()
      return
    }

    const value = inputUrl.trim()

    if (!value) {
      setError(
        'Invalid URL. Please enter a valid URL with a protocol (e.g., http:// or https://).',
      )
      setUrl(undefined)
      return
    }

    // Check protocol: must be http or https
    if (!/^https?:\/\//i.test(value)) {
      setError(
        'Invalid URL. Please enter a valid URL with a protocol (e.g., http:// or https://).',
      )
      setUrl(undefined)
      return
    }

    let parsed: URL
    try {
      parsed = new URL(value)
    } catch {
      setError(
        'Invalid URL. Please enter a valid URL with a host (e.g., www.example.com).',
      )
      setUrl(undefined)
      return
    }

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      setError(
        'Invalid URL. Please enter a valid URL with a protocol (e.g., http:// or https://).',
      )
      setUrl(undefined)
      return
    }

    // Hostname validation: must include 'www.' and a valid domain
    const hostname = parsed.hostname.toLowerCase().trim()
    const startsWithWww = hostname.startsWith('www.')
    const isDomainWithWww =
      /^www\.([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(
        hostname,
      )

    if (!startsWithWww || !isDomainWithWww) {
      setError(
        'Invalid URL. Please enter a valid URL with a host containing "www" (e.g., www.example.com).',
      )
      setUrl(undefined)
      return
    }

    setError(undefined)

    try {
      setIsLoading(true)
      const urlData: urlshortenRequest = {
        Url: value,
        Alias: alias.trim() || undefined,
      }

      const response = await api.post('/shorturl', urlData)
      console.log(response);

      JSON.stringify(response.data["shortenUrl"])

      setUrl(response.data["shortenUrl"])

      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pending_url')
        sessionStorage.removeItem('pending_alias')
      }
    } catch (err: any) {
      console.error('Failed to shorten URL:', err)
      setError(
        err.response?.data?.message ||
          err.response?.data?.title ||
          err.message ||
          'Failed to shorten URL. Please try again.',
      )
      setUrl(undefined)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center max-w-4xl m-auto mx-auto px-2 md:px-4 lg:px-8 text-center">
      <div className="flex flex-col items-center gap-2 my-16">
        <div className="p-2 md:p-4 w-fit bg-gray-200 rounded-full flex items-center">
          <Zap size={35} className="w-9 h-9" />
        </div>
        <h1 className="text-2xl md:text-6xl text-gray-950 m-6">
          Shorten Your URLs
          <span className="block text-center">Instantly</span>
        </h1>
        <h2 className="text-sm md:text-xl text-gray-600 max-w-2xl text-center">
          Transform long, complex URLs into short, shareable links that are
          perfect for social media, emails, and more.
        </h2>
      </div>

      <div className="bg-white shadow-2xl rounded-lg md:min-w-2xl p-6 w-full max-w-2xl">
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
            <Input
              type="url"
              placeholder="Enter your long url here (e.g., https://www.example.com/very/long/path)"
              className="inline-block p-6 text-base"
              value={inputUrl}
              aria-invalid={Boolean(error)}
              onChange={(e) => {
                setInputUrl(e.target.value)
                if (error) {
                  setError(undefined)
                }
              }}
            />
            <Button
              type="submit"
              size="lg"
              variant="default"
              disabled={isLoading}
              className="p-6 w-full md:w-fit cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? 'Shortening...' : 'Short Url'}
            </Button>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-left mt-2">{error}</p>
          )}

          <div className="mt-3">
            <Input
              type="text"
              placeholder="Custom alias (optional, e.g. my-link)"
              className="p-4 text-sm"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="m-4 max-w-md flex flex-wrap justify-between w-full md:max-w-2xl px-4">
        <div className="flex items items-center gap-x-3">
          <div className="rounded-full w-2 h-2 bg-green-600" />
          <p className="text-sm">Free to use</p>
        </div>
        <div className="flex items items-center gap-x-3">
          <div className="rounded-full w-2 h-2 bg-blue-600" />
          <p className="text-sm">Technical Support</p>
        </div>
        <div className="flex items items-center gap-x-3">
          <div className="rounded-full w-2 h-2 bg-purple-600" />
          <p className="text-sm">Instant results</p>
        </div>
      </div>
      {url && (
        <div className="mt-6 bg-green-50 border border-green-200 w-full rounded-lg p-4 animate-in fade-in max-w-2xl">
          <p className="text-center text-green-700 text-sm font-medium mb-2">
            Your shortened URL:
          </p>
          <div className="flex items-center justify-between gap-3 bg-white border border-green-200 rounded-md p-3">
            <a
              href={url.startsWith('http') ? url : `https://${url}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 mx-auto cursor-pointer font-mono text-sm sm:text-base hover:underline truncate"
            >
              {url}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
