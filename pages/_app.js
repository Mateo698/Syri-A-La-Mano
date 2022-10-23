import { SessionProvider } from "next-auth/react"
import Layout from '../components/global/Layout'
import { ThemeProvider } from '@emotion/react'


export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}