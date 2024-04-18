import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
import ToastifyProvider from '@/providers/react-toastify'
import { ThemeProvider } from '@/providers/theme-provider'


const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'iPaha Store Admin Dashboard',
  description: 'iPaha Store Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastifyProvider />
            {/* <ToasterProvider /> */}
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
