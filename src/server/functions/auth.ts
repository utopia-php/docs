import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { redirect } from '@tanstack/react-router'
import { createAdminClient, createSessionClient } from '../lib/appwrite'
import { AppwriteException, ID } from 'node-appwrite'
import {
  deleteCookie,
  getCookie,
  setCookie,
  setResponseStatus,
} from '@tanstack/react-start/server'

export const getAppwriteSessionFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = getCookie(`appwrite-session-secret`)

    if (!session) {
      return null
    }

    return session
  },
)

export const setAppwriteSessionCookiesFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string(), secret: z.string() }))
  .handler(async ({ data }) => {
    const { id, secret } = data
    setCookie(`appwrite-session-secret`, secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    setCookie(`appwrite-session-id`, id, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
  })

const signUpInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  redirect: z.string().optional(),
})

export const signUpFn = createServerFn({ method: 'POST' })
  .inputValidator(signUpInSchema)
  .handler(async ({ data }) => {
    const { email, password, redirect: redirectUrl } = data
    const { account } = createAdminClient()

    try {
      await account.create({ userId: ID.unique(), email, password })
      const session = await account.createEmailPasswordSession({
        email,
        password,
      })
      setAppwriteSessionCookiesFn({
        data: { id: session.$id, secret: session.secret },
      })
    } catch (_error) {
      const error = _error as AppwriteException
      setResponseStatus(error.code)
      throw {
        message: error.message,
        status: error.code,
      }
    }

    if (redirectUrl) {
      throw redirect({ to: redirectUrl })
    } else {
      throw redirect({ to: '/' })
    }
  })

export const signInFn = createServerFn({ method: 'POST' })
  .inputValidator(signUpInSchema)
  .handler(async ({ data }) => {
    const { email, password, redirect: redirectUrl } = data

    try {
      const { account } = createAdminClient()
      const session = await account.createEmailPasswordSession({
        email,
        password,
      })
      setAppwriteSessionCookiesFn({
        data: { id: session.$id, secret: session.secret },
      })
    } catch (_error) {
      const error = _error as AppwriteException
      setResponseStatus(error.code)
      throw {
        message: error.message,
        status: error.code,
      }
    }

    if (redirectUrl) {
      throw redirect({ to: redirectUrl })
    } else {
      throw redirect({ to: '/' })
    }
  })

export const signOutFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    deleteCookie(`appwrite-session-secret`)
    throw redirect({ to: '/' })
  },
)

export const authMiddleware = createServerFn({ method: 'GET' }).handler(
  async () => {
    const currentUser = await getCurrentUser()

    return {
      currentUser,
    }
  },
)

export const getCurrentUser = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await getAppwriteSessionFn()

    if (!session) {
      return null
    } else {
      const client = await createSessionClient(session!)
      const currentUser = await client.account.get()
      return currentUser
    }
  },
)
