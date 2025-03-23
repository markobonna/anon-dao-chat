import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Navigation } from '@/components/Navigation'
import '@/styles/tailwind.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => (
    <div className="min-h-full">
      <Navigation />
      <main>{page}</main>
    </div>
  ))

  return getLayout(<Component {...pageProps} />)
}
