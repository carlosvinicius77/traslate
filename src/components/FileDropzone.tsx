import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

interface DropzoneProps {
  onFileDrop: (file: File) => void;
  accept?: Record<string, string[]>;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FileDropzone({
  onFileDrop,
  accept = { 'application/pdf': ['.pdf'] },
  title = "Upload Your Document",
  subtitle = "Click to browse or drag & drop (PDF, DOCX, JPG)",
  className
}: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileDrop(acceptedFiles[0]);
    }
  }, [onFileDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  } as any);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "h-full w-full bg-white rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 transition-all cursor-pointer group",
        isDragActive ? "border-[#FF4F00] bg-orange-50/30" : "border-slate-200 hover:border-[#FF4F00] hover:bg-orange-50/30",
        className
      )}
    >
      <input {...getInputProps()} />
      
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300",
        isDragActive ? "scale-110 bg-orange-200" : "bg-orange-100 group-hover:scale-110"
      )}>
        <svg className="w-10 h-10 text-[#FF4F00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
      </div>

      <h3 className="text-xl font-bold text-[#0F172A] mb-1">
        {title}
      </h3>
      <p className="text-slate-400 mb-6 max-w-sm text-sm">
        {subtitle}
      </p>

      <Button variant="outline" className="rounded-xl font-semibold shadow-sm flex items-center gap-2 pointer-events-none bg-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
        Selecionar Arquivos
      </Button>
    </div>
  );
}
