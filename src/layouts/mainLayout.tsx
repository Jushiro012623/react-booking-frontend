import { Navbar } from '@/components/navbar'
import { Link } from '@heroui/link'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <React.Fragment>
        <Navbar />
        <Outlet />
        <Footer />
    </React.Fragment>
  )
}
const Footer = () => {
    return (
    <footer className="w-full flex items-center justify-center py-3">
        <Link
        className="flex items-center gap-1 text-current"
        href="#"
        title="ivan dev"
        >
            <span className="text-default-600">Develop by</span>
            <p className="text-primary">IvanDev</p>
        </Link>
    </footer>
  )
}

export default MainLayout