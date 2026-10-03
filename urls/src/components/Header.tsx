import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AuthContext } from '#/contexts/authContext'
import { ChevronDown, Link2, LogOut, Settings, User } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { signIn, logout, accountManagement, isLoggedIn, profile } =
    useContext(AuthContext)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProfileOpen(false)
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProfileOpen])

  const displayName = profile?.firstName
    ? `${profile.firstName} ${profile.lastName || ''}`.trim()
    : profile?.username || 'User'

  return (
    <header className="w-full bg-white/30 backdrop-blur-sm border-y border-gray-50 border-b-2  sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 shrink-0"
        >
          <svg
            className="h-6 w-6 text-black"
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
          <span>ShortLink</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        {!isLoggedIn ? (
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={signIn}
              className="rounded-lg border border-slate-950 px-5 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors shadow-sm"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-medium text-white hover:text-black hover:bg-white hover:border hover:border-slate-950 transition-colors shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="relative hidden md:flex items-center" ref={dropdownRef}>
            <button
              type="button"
              id="user-profile-button"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              aria-label="User profile menu"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/80 py-1 pl-1 pr-3 shadow-xs hover:border-gray-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 transition-all cursor-pointer select-none"
            >
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={displayName}
                  className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-medium text-xs">
                  {displayName.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                </div>
              )}
              <span className="max-w-30 truncate text-sm font-medium text-gray-800">
                {profile?.firstName || profile?.username || 'Account'}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180 text-gray-700' : ''
                }`}
              />
            </button>

            {isProfileOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-profile-button"
                className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
              >
                {/* User Info Header */}
                <div className="flex items-center gap-3 rounded-xl bg-gray-50/80 p-2.5 border border-gray-100 mb-1.5">
                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={displayName}
                      className="h-10 w-10 shrink-0 rounded-full border border-gray-200 object-cover shadow-2xs"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-semibold text-sm">
                      {displayName.charAt(0).toUpperCase() || <User className="h-5 w-5" />}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 leading-tight">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-gray-500 mt-0.5">
                      {profile?.email || (profile?.username ? `@${profile.username}` : 'Logged in')}
                    </p>
                  </div>
                </div>

                {/* Actions / Links */}
                <div className="flex flex-col gap-0.5">
                  <Link
                    to="/myurls"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <Link2 className="h-4 w-4 text-gray-500" />
                    <span>My URLs</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false)
                      accountManagement()
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span>Manage Account</span>
                  </button>
                </div>

                <div className="my-1.5 border-t border-gray-100" />

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false)
                    logout()
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((e) => !e)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-gray-100 bg-white/5 px-6 py-4 md:hidden shadow-lg">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="rounded-md py-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/features"
              onClick={() => setIsOpen(false)}
              className="rounded-md py-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className="rounded-md py-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="rounded-md py-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              About
            </Link>
            <hr className="my-2 border-gray-100" />

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    signIn()
                  }}
                  className="py-2 text-sm font-medium text-gray-700 hover:text-black text-left"
                >
                  Sign In
                </button>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-slate-950 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/myurls"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 py-2 text-sm font-medium text-gray-700 hover:text-black"
                >
                  <Link2 className="h-4 w-4 text-gray-500" />
                  <span>My URLs</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    accountManagement()
                  }}
                  className="flex items-center gap-2.5 py-2 text-sm font-medium text-gray-700 hover:text-black text-left"
                >
                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={displayName}
                      className="h-7 w-7 rounded-full border border-gray-300 object-cover"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white font-medium text-xs">
                      {displayName.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                  )}
                  <span>Manage Profile ({displayName})</span>
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    logout()
                  }}
                  className="rounded-lg border border-slate-950 px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors text-center"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
