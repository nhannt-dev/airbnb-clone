import './globals.css'
import { Navbar, ClientOnly, Register, Login } from '../app/components'
import { Nunito } from 'next/font/google'
import { Toast } from './providers'
import getCurrentUser from './actions/getCurrentUser'

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone next app',
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Toast />
          <Login />
          <Register />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
