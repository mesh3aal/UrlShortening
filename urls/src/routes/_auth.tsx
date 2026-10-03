import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <>
      <Link
        to="/"
        className="absolute top-4 left-4 flex gap-x-2 px-4 py-2 rounded-xl hover:bg-slate-200 font-bold"
      >
        <ArrowLeft size={24} strokeWidth={2} /> Back Home
      </Link>
      <Outlet />
    </>
  )
}
