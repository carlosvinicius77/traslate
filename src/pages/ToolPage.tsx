import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { FileDropzone } from '../components/FileDropzone';
import { ALL_TOOLS } from '../config/tools';

export function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  const tool = ALL_TOOLS.find(t => t.path === `/tool/${toolId}`);
  
  const handleFileDrop = (file: File) => {
    (window as any).uploadedFile = file;
    // For prototype purposes, all tools just go to the editor where you would apply changes
    navigate('/editor');
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Ferramenta não encontrada</h1>
          <button onClick={() => navigate('/')} className="text-[#FF4F00] font-medium hover:underline">Voltar para o início</button>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 py-20 pb-32">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center justify-items-center mb-6">
            <Icon className={`w-8 h-8 ${tool.color}`} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{tool.title}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{tool.description}</p>
        </div>

        <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 max-w-3xl mx-auto">
          <FileDropzone 
            onFileDrop={handleFileDrop} 
            title="Selecione um Arquivo"
            subtitle={`Carregue um arquivo para usar a ferramenta: ${tool.title}`}
          />
        </div>
      </main>
    </div>
  );
}
