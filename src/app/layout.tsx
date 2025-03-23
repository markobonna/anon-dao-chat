import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import type React from 'react'
import { ClientNavigation } from '@/components/ClientNavigation'

export const metadata: Metadata = {
  title: {
    template: '%s - AnonChat',
    default: 'AnonChat',
  },
  description: 'Secure anonymous chat application with TEE protection',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <div className="min-h-full">
          <ClientNavigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
