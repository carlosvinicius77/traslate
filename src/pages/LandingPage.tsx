import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileDropzone } from '../components/FileDropzone';
import { ALL_TOOLS } from '../config/tools';
import { Header } from '../components/Header';
import { CheckCircle2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function LandingPage() {
  const navigate = useNavigate();

  const handleFileDrop = (file: File) => {
    (window as any).uploadedFile = file; 
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter',_sans-serif] flex flex-col overflow-x-hidden text-[#1E293B]">
      <Header />
      
      <main className="flex-1 p-4 md:p-8 flex flex-col gap-8 container mx-auto max-w-[1240px]">
        {/* Bento Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[320px]">
          <div className="lg:col-span-5 flex flex-col justify-center pr-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-4 text-[#0F172A]">
              A Forma Mais Fácil de <span className="text-[#FF4F00]">Gerenciar PDFs</span>.
            </h1>
            <p className="text-slate-500 text-lg mb-6 leading-relaxed">
              Edite, converta, assine e proteja seus arquivos PDF em segundos. Nenhuma instalação necessária. Seguro, rápido e grátis para testar.
            </p>
            <div className="flex flex-col gap-3">
               {['Funciona no Mac e Windows', 'Seguro (Criptografia 256-bit)', 'Sem perda de qualidade'].map(text => (
                 <div key={text} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                   <div className="w-5 h-5 bg-green-50 text-green-600 rounded flex items-center justify-center shrink-0">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                   </div>
                   {text}
                 </div>
               ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 h-[320px] lg:h-auto">
            <FileDropzone onFileDrop={handleFileDrop} />
          </div>
        </div>

        {/* Tools Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 pb-8">
          {ALL_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link 
                key={tool.id}
                to={tool.path}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[160px] group"
              >
                <div className="flex flex-col h-full">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110", tool.bgColor, tool.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-[#0F172A] group-hover:text-[#FF4F00] transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="h-12 border-t border-slate-200 px-4 md:px-8 flex items-center justify-between text-[11px] text-slate-400 flex-shrink-0 bg-white">
        <div className="flex items-center gap-4">
          <span>© 2024 PDFMaster Inc.</span>
          <Link to="#" className="hover:text-slate-600">Termos</Link>
          <Link to="#" className="hover:text-slate-600">Privacidade</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div> Servidores: Online
          </span>
          <span>v1.0.0-stable</span>
        </div>
      </footer>

    </div>
  );
}
