import { Footer2 } from '#/components/footer2'
import Header from '#/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer2 />
    </>
  )
}
