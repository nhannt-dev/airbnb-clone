import './globals.css'
import { Navbar, ClientOnly, Register } from '../app/components'
import { Nunito } from 'next/font/google'
import { Toast } from './providers'

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone next app',
}

const font = Nunito({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Toast />
          <Register />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
