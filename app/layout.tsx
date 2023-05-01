import './globals.css'
import { Navbar, ClientOnly, Register, Login, Rent } from '../app/components'
import { Nunito } from 'next/font/google'
import { Toast } from './providers'
import { getCurrentUser } from './actions'
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
          <Rent />
          <Login />
          <Register />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  )
}
