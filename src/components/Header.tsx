import React from 'react';
import { Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export function Header() {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between flex-shrink-0 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#FF4F00] rounded-md flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0F172A]">
            PDFMaster<span className="text-[#FF4F00]">.</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/editor" className="hover:text-[#0F172A] transition-colors">Editor</Link>
          <Link to="/tools" className="hover:text-[#0F172A] transition-colors">Ferramentas</Link>
          <Link to="/pricing" className="hover:text-[#0F172A] transition-colors">Preços</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="hidden sm:flex text-sm font-semibold px-4 py-2 hover:text-[#FF4F00]">Entrar</Button>
        <Button variant="accent" className="bg-[#FF4F00] text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-[0_4px_14px_0_rgba(255,79,0,0.39)] hover:bg-[#E64600]">Criar Conta</Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5 text-slate-600" />
        </Button>
      </div>
    </nav>
  );
}
