import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['ru', 'kz'],
  defaultLocale: 'ru',
})

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
