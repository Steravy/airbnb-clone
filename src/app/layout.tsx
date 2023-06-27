import { Nunito } from 'next/font/google'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import ToastProvider from './providers/ToastProvider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToastProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
