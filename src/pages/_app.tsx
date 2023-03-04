import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../styles/theme/theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../utilities/createEmotionCache'
import { WalletProvider } from '../services/web3/wallets/walletProvider'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
