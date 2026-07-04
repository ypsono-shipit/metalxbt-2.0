import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import TopNav from '@/components/layout/TopNav'

export const metadata: Metadata = {
  title: 'metalxbt — Bloomberg Terminal for Commodity Investors',
  description: 'Professional commodities trading terminal, interactive global mines explorer, and education platform.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen overflow-hidden bg-surface">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-surface">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
