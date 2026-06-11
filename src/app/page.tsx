'use client'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { Testimonials } from '@/components/Testimonials'
import { PeriodontalTest } from '@/components/PeriodontalTest'
import { Contact } from '@/components/Contact'
import { FloatingParticles } from '@/components/FloatingParticles'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-50 text-brand-900 font-sans selection:bg-brand-500 selection:text-white relative">
      <FloatingParticles />
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <PeriodontalTest />
        <Contact />
      </main>
      <footer className="bg-brand-100 py-8 border-t border-brand-200 text-center relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-brand-600 font-serif italic text-lg mb-2">Larissa VetOdonto</p>
          <p className="text-brand-400 text-sm">© 2026 Todos os direitos reservados - VCS Veterinary Care Support</p>
          <p className="text-brand-400 text-sm mt-1">Created by SOLIDUS Systems</p>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  )
}
