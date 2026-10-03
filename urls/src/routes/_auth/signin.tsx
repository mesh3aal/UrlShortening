import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

export const Route = createFileRoute('/_auth/signin')({
  component: signin,
})

interface FormFields {
  email: string
  password: string
}

function signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mb-4">
        <svg
          className="h-8 w-8 text-black"
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
      </div>
      <h1 className="text-3xl mb-2">Join ShortLink</h1>
      <p className="text-gray-500 font-light mb-4">
        Create your account and start shortening URLs
      </p>
      <div className="bg-white p-5 w-fit lg:min-w-lg shadow-xl">
        <h1 className="text-center text-2xl mb-8">Log-in</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-4"
        >
          <div className="w-full">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register('email', {
                required: 'please enter your email',
                validate: (value) => {
                  if (!value.includes('@') || !value.includes('.')) {
                    return 'please enter a valid email address'
                  }
                  return true
                },
              })}
              type="email"
              id="email"
              className={
                errors.email?.message === undefined
                  ? 'block border-2 rounded-sm focus:outline-3 focus:outline-gray-400 bg-gray-100 py-1 ps-2 w-full text-base placeholder:text-sm relative'
                  : 'block border border-red-500 rounded-sm focus:outline focus:outline-red-500 bg-gray-100 py-1 ps-2 w-full text-base placeholder:text-sm relative'
              }
              placeholder="Enter your email"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="w-full">
            <label className="font-semibold" htmlFor="password">
              password
            </label>
            <input
              {...register('password', {
                required: 'please enter your password',
                minLength: {
                  value: 6,
                  message: 'password must be at least 6 characters long',
                },
              })}
              type="password"
              name="password"
              id="password"
              className={
                errors.password?.message === undefined
                  ? 'block border-2 rounded-sm focus:outline-3 focus:outline-gray-400 bg-gray-100 py-1 ps-2 w-full text-base placeholder:text-sm relative'
                  : 'block border border-red-500 rounded-sm focus:outline focus:outline-red-500 bg-gray-100 py-1 ps-2 w-full text-base placeholder:text-sm relative'
              }
              placeholder="Enter your password"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <button
            className="bg-black hover:bg-black/90 active:bg-gray-900 text-white px-8 py-2 rounded-xl block mx-auto mt-4"
            type="submit"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
