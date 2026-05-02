import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Type, 
  Image as ImageIcon, 
  PenTool, 
  Highlighter, 
  MousePointer2, 
  Download, 
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Save
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export function EditorPage() {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState('select');

  useEffect(() => {
    // Check if we have a file from the landing page
    const file = (window as any).uploadedFile;
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  }, []);

  const handleDownload = () => {
    if (!fileUrl) return;
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'edited-document.pdf';
    a.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Editor Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ChevronLeft size={20} />
          </Button>
          <div className="h-6 w-[1px] bg-gray-200" />
          <h1 className="text-sm font-semibold text-gray-800">
            {(window as any).uploadedFile?.name || 'Novo Documento.pdf'}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Save className="w-4 h-4 mr-2" /> Salvar Rascunho
          </Button>
          <Button variant="accent" size="sm" onClick={handleDownload} disabled={!fileUrl}>
            <Download className="w-4 h-4 mr-2" /> Baixar PDF
          </Button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Toolbar */}
        <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2 shrink-0 z-10">
          <ToolButton 
            icon={<MousePointer2 size={20} />} 
            label="Selecionar" 
            isActive={activeTool === 'select'} 
            onClick={() => setActiveTool('select')} 
          />
          <ToolButton 
            icon={<Type size={20} />} 
            label="Texto" 
            isActive={activeTool === 'text'} 
            onClick={() => setActiveTool('text')} 
          />
          <ToolButton 
            icon={<ImageIcon size={20} />} 
            label="Imagem" 
            isActive={activeTool === 'image'} 
            onClick={() => setActiveTool('image')} 
          />
          <ToolButton 
            icon={<PenTool size={20} />} 
            label="Desenhar" 
            isActive={activeTool === 'draw'} 
            onClick={() => setActiveTool('draw')} 
          />
          <ToolButton 
            icon={<Highlighter size={20} />} 
            label="Destacar" 
            isActive={activeTool === 'highlight'} 
            onClick={() => setActiveTool('highlight')} 
          />
        </aside>

        {/* Canvas / PDF Viewer Area */}
        <main className="flex-1 relative flex flex-col">
          {/* Top floating controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200 z-10">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
              <ZoomOut size={16} />
            </Button>
            <span className="text-xs font-mono font-medium px-2 text-gray-600">100%</span>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
              <ZoomIn size={16} />
            </Button>
          </div>

          <div className="flex-1 overflow-auto bg-gray-100 p-8 flex justify-center custom-scrollbar">
            {fileUrl ? (
              <div className="relative w-full max-w-4xl min-h-[1056px] bg-white shadow-md border border-gray-200" style={{aspectRatio: '8.5/11'}}>
                 {/* 
                   We use an object/embed for visual representation.
                   In a full solution with pdf-lib, we would render pages with canvas,
                   allowing overlay manipulations. For this Prototype, we display the PDF natively.
                 */}
                 <object 
                   data={fileUrl + "#toolbar=0&navpanes=0&scrollbar=0"} 
                   type="application/pdf" 
                   width="100%" 
                   height="100%"
                   className="absolute inset-0 pointer-events-none" // pointer-events-none allows overlays to catch clicks if we add them
                 >
                   <p>Seu navegador não suporta visualização de PDFs.</p>
                 </object>

                 {/* Simulated active tool overlay */}
                 {activeTool !== 'select' && (
                    <div className="absolute inset-0 z-20 cursor-crosshair">
                      {/* Fake overlay for demonstration of dragging/editing zone */}
                      <div className="absolute inset-0 hover:bg-indigo-500/5 transition-colors"/>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur text-indigo-700 px-4 py-2 rounded shadow-2xl text-sm font-semibold pointer-events-none border border-indigo-100">
                        Clique no documento para adicionar {activeTool}
                      </div>
                    </div>
                 )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p>Nenhum documento carregado.</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>Voltar para o Início</Button>
              </div>
            )}
          </div>
        </main>
        
        {/* Right context panel (Properties) */}
        {activeTool !== 'select' && activeTool !== 'highlight' && (
          <aside className="w-64 bg-white border-l border-gray-200 p-4 shrink-0 hidden lg:block overflow-y-auto">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Propriedades</h3>
            
            {activeTool === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Fonte</label>
                  <select className="w-full text-sm border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Helvetica</option>
                    <option>Times Roman</option>
                    <option>Courier</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Tamanho da Fonte</label>
                  <input type="number" defaultValue={12} className="w-full text-sm border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Cor</label>
                  <div className="flex gap-2">
                    {['#000000', '#EF4444', '#3B82F6', '#10B981'].map(color => (
                        <button key={color} className="w-6 h-6 rounded border border-gray-300 ring-offset-2 focus:ring-2 focus:ring-indigo-500" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTool === 'draw' && (
              <div className="space-y-4">
                 <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Espessura do Traço</label>
                  <input type="range" min="1" max="10" defaultValue="2" className="w-full accent-indigo-600" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Cor da Caneta</label>
                  <div className="flex flex-wrap gap-2">
                    {['#000000', '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                        <button key={color} className="w-6 h-6 rounded-full border border-gray-300 ring-offset-2 focus:ring-2 focus:ring-indigo-500" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

function ToolButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-12 h-12 flex flex-col items-center justify-center rounded-xl transition-all group ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }`}
      title={label}
    >
      {icon}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-md block" />
      )}
    </button>
  );
}
