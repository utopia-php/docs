import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CheckCircle, Loader2 } from 'lucide-react'
import { databases } from '@/lib/appwrite-client'
import { ID } from 'appwrite'

interface EmailSubscriptionPopoverProps {
  children: React.ReactNode
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error'

export function EmailSubscriptionPopover({
  children,
}: EmailSubscriptionPopoverProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setErrorMessage('Please enter your email address')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    setState('loading')
    setErrorMessage('')

    try {
      await databases.createDocument(
        '68f362b1002b05a5a123',
        'updates',
        ID.unique(),
        {
          email: email.trim(),
        },
        [],
      )

      setState('success')
      setEmail('')

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setState('idle')
      }, 3000)
    } catch (error) {
      console.error('Error submitting email:', error)
      setState('error')
      setErrorMessage('Failed to subscribe. Please try again.')
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when popover closes
      setState('idle')
      setErrorMessage('')
      setEmail('')
    }
  }

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-6" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Get Updates</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest Utopia.php news and releases.
            </p>
          </div>

          {state === 'success' ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">
                Successfully subscribed! Thank you for your interest.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === 'loading'}
                  className="w-full"
                />
                {errorMessage && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={state === 'loading' || !email.trim()}
              >
                {state === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
