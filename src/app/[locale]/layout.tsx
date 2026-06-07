import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import '../globals.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isKz = locale === 'kz'
  return {
    title: {
      default: isKz ? 'Mebio — Жиhаз дүкені | mebio.kz' : 'Mebio — Интернет-магазин мебели | mebio.kz',
      template: '%s | Mebio mebio.kz',
    },
    description: isKz
      ? 'Бүкіл Қазақстан бойынша жеткізумен сапалы жиhаз. Kaspi бөліп төлеу 0-0-24.'
      : 'Качественная мебель с доставкой по всему Казахстану. Рассрочка Kaspi 0-0-24.',
    metadataBase: new URL('https://mebio.kz'),
    openGraph: {
      siteName: 'Mebio',
      locale: isKz ? 'kk_KZ' : 'ru_RU',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
