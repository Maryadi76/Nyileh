"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Katalog", href: "#katalog" },
    { name: "Cara Sewa", href: "#cara-sewa" },
    { name: "Keunggulan", href: "#kenapa-kami" },
    { name: "Area Layanan", href: "#area" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Nyileh.id - Beranda">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg shadow-sm">
            <Image
              src="/logo.jpg"
              alt="Nyileh.id Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#1a2744]">
            nyileh<span className="text-blue-600">.id</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20saya%20mau%20tanya%20sewa%20alat"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a2744] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-blue-600 focus:outline-none"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <ul className="flex flex-col space-y-2 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-base font-medium text-slate-700 hover:text-blue-600 border-b border-slate-100"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <a
              href="https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20saya%20mau%20tanya%20sewa%20alat"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#1a2744] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow transition"
            >
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
