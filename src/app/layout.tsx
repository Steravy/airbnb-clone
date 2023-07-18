import { Nunito } from 'next/font/google'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import ToastProvider from './components/providers/ToastProvider'
import getCurrentUser from './utils/getCurrentUser'
import ClientWrapper from './components/ClientWrapper'
import SearchModal from './components/modals/SearchModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientWrapper>
          <ToastProvider />
          <RentModal />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientWrapper>
        <section className="pb-20 pt-28">
          {children}
        </section>
      </body>
    </html>
  )
}
