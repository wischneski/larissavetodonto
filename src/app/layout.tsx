import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Larissa VetOdonto — Especialista em Odontologia Veterinária',
  description: 'Especialista em odontologia veterinária para cães, gatos e animais exóticos. Tratamentos odontológicos humanizados e de alta precisão.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.larissovetodonto.com.br'),
  openGraph: {
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Larissa VetOdonto',
  },
  other: {
    'x-dns-prefetch-control': 'on',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
