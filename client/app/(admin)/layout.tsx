import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <main className='admin'>{children}</main>
   )
}

export default Layout