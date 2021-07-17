import React, { ReactNode } from "react"
import { Head } from "blitz"
import NavBar from "../components/NavBar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "1st Blitz App"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
