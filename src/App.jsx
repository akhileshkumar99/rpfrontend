import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Faculty from './pages/Faculty'
import Gallery from './pages/Gallery'
import Notices from './pages/Notices'
import Admissions from './pages/Admissions'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppChat from './components/WhatsAppChat'
import AdminApp from './AdminApp'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (currentPage === 'admin') return <AdminApp setCurrentPage={setCurrentPage} />
  if (currentPage === 'admin-login') return <AdminLogin setCurrentPage={setCurrentPage} />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} isScrolled={isScrolled} />
      
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'about' && <About />}
      {currentPage === 'courses' && <Courses />}
      {currentPage === 'faculty' && <Faculty />}
      {currentPage === 'gallery' && <Gallery />}
      {currentPage === 'notices' && <Notices />}
      {currentPage === 'admissions' && <Admissions />}
      {currentPage === 'contact' && <Contact />}
      
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppChat />
    </div>
  )
}
