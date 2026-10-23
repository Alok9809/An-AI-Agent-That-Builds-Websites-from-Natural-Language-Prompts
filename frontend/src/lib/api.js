import { getCookie } from './utils'

export class ApiError extends Error {
  constructor(status, message, detail) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.detail = detail
  }
}

async function request(endpoint, options = {}) {
  const headers = new Headers(options.headers || {})

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  // Include CSRF token on state-changing requests
  const csrfToken = getCookie('forma_csrf')
  if (csrfToken && options.method && !['GET', 'HEAD', 'OPTIONS'].includes(options.method.toUpperCase())) {
    headers.set('x-csrf-token', csrfToken)
  }

  // Include Bearer token from localStorage for cross-port session persistence
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('forma_auth_token') : null
  if (authToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${authToken}`)
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
    credentials: 'include', // Ensure HttpOnly cookies are attached
  })

  // Handle 204 No Content
  if (response.status === 204) {
    return {}
  }

  let data
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred. Please try again.'
    if (data?.detail) {
      if (typeof data.detail === 'string') {
        errorMessage = data.detail
      } else if (Array.isArray(data.detail) && data.detail.length > 0) {
        errorMessage = data.detail.map((d) => d.msg || JSON.stringify(d)).join(', ')
      }
    } else if (data?.message) {
      errorMessage = data.message
    }
    throw new ApiError(response.status, errorMessage, data?.detail)
  }

  return data
}

export const api = {
  get: (url, options) => request(url, { ...options, method: 'GET' }),
  post: (url, body, options) =>
    request(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: (url, body, options) =>
    request(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: (url, options) => request(url, { ...options, method: 'DELETE' }),
}
