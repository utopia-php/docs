/**
 * @imagine-readonly
 */

import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { z } from 'zod'
import { AuthCard } from '@/components/auth/auth-card'
import { AuthForm } from '@/components/auth/auth-form'
import { AuthField } from '@/components/auth/auth-field'
import { signInFn } from '@/server/functions/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
  validateSearch: searchSchema,
})

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

function SignInPage() {
  const search = useSearch({ from: '/_auth/sign-in' })
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signInMutation = useMutation({
    mutationFn: async (data: z.infer<typeof signInSchema>) => {
      await signInFn({ data })
    },
    onError: (error: Error) => {
      console.error('Sign in error:', error)
      form.setError('root', { message: error.message })
    },
  })

  return (
    <AuthCard
      title="Sign in"
      description="Enter your email and password to access your account"
    >
      <AuthForm
        schema={signInSchema}
        defaultValues={{
          email: '',
          password: '',
        }}
        onSubmit={(data) => signInMutation.mutate(data)}
        submitText="Sign in"
        loadingText="Signing in..."
        isLoading={signInMutation.isPending}
        form={form}
      >
        {(form) => (
          <>
            <AuthField
              control={form.control}
              name="email"
              label="Email"
              placeholder="john@doe.com"
              type="email"
            />

            <AuthField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </>
        )}
      </AuthForm>

      <div className="text-center text-sm text-muted-foreground mt-4 space-x-1">
        <div className="inline-block">Don't have an account? </div>
        <div className="inline-block">
          <Link
            to="/sign-up"
            search={search.redirect ? { redirect: search.redirect } : undefined}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}
