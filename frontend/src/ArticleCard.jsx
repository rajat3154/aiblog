import React from 'react';
import { Sparkles, FileText, Link as LinkIcon, ExternalLink, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ArticleCard({ article }) {
  const aiContent = article.updatedContent || article.updated_content;


  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #09090b; 
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #3f3f46; 
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #3b82f6; 
    }
  `;


  const markdownContainerClasses = "text-sm md:text-base leading-relaxed space-y-4";

  return (
    <div className="w-full">
      <style>{scrollbarStyles}</style>


      <div className="bg-black rounded-3xl shadow-2xl shadow-blue-900/20 p-6 md:p-8 border border-zinc-800 overflow-hidden relative group">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-blue-600 to-zinc-800 opacity-50"></div>


        <div className="mb-8 border-b border-zinc-800 pb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h2>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <div className="p-1.5 bg-zinc-800/50 rounded-md border border-zinc-700 shadow-sm">
                <FileText size={16} className="text-zinc-100" />
              </div>
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Original Content
              </h4>
            </div>
            
            <div className="bg-gradient-to-b from-zinc-900 to-black rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 flex-grow relative overflow-hidden h-[600px] shadow-inner group-hover:shadow-zinc-900/50">
              
              <FileText className="absolute -bottom-6 -left-6 text-zinc-800/30 w-32 h-32 rotate-12 pointer-events-none z-0" />

              <div className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar z-10">
                <div className={`${markdownContainerClasses} text-zinc-300`}>

                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{

                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 border-b border-zinc-700 pb-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold text-zinc-100 mb-3 mt-5" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-zinc-200 mb-2 mt-4" {...props} />,

                      p: ({node, ...props}) => <p className="mb-4 text-zinc-300 leading-relaxed" {...props} />,

                      ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 mb-4 space-y-1 marker:text-zinc-500" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-1 marker:text-zinc-500" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,

                      strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,

                      table: ({node, ...props}) => <div className="overflow-x-auto my-6 rounded-lg border border-zinc-800 bg-zinc-900/50"><table className="w-full text-left border-collapse" {...props} /></div>,
                      thead: ({node, ...props}) => <thead className="bg-zinc-800 text-zinc-200" {...props} />,
                      th: ({node, ...props}) => <th className="p-3 border-b border-zinc-700 font-semibold text-xs uppercase tracking-wider" {...props} />,
                      td: ({node, ...props}) => <td className="p-3 border-b border-zinc-800/50 text-zinc-400 text-sm" {...props} />,

                      a: ({node, ...props}) => <a className="text-zinc-100 hover:text-white hover:underline decoration-zinc-500" target="_blank" rel="noopener noreferrer" {...props} />,

                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-zinc-600 pl-4 italic text-zinc-400 my-4 bg-zinc-800/20 py-2 rounded-r" {...props} />,

                      hr: ({node, ...props}) => <hr className="border-zinc-800 my-6" {...props} />
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <div className="p-1.5 bg-blue-950/30 rounded-md border border-blue-900/50">
                <Sparkles size={16} className="text-blue-400" />
              </div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider shadow-blue-500/50">
                AI Enhanced
              </h4>
            </div>

            <div className={`relative rounded-xl border flex-grow h-[600px] overflow-hidden transition-all duration-300 ${
              aiContent 
                ? "bg-gradient-to-br from-blue-950/10 to-transparent border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.05)]" 
                : "bg-zinc-900/30 border-dashed border-zinc-800"
            }`}>
              

              {aiContent && (
                <Bot className="absolute -bottom-4 -right-4 text-blue-500/5 w-24 h-24 rotate-12 pointer-events-none z-0" />
              )}


              <div className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar z-10">
                {aiContent ? (
                  <div className={`${markdownContainerClasses} text-zinc-300`}>

                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{

                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 border-b border-zinc-800 pb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold text-blue-100 mb-3 mt-5" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-blue-200 mb-2 mt-4" {...props} />,

                        p: ({node, ...props}) => <p className="mb-4 text-zinc-300 leading-relaxed" {...props} />,

                        ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 mb-4 space-y-1 marker:text-blue-500" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-1 marker:text-blue-500" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,

                        strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,

                        table: ({node, ...props}) => <div className="overflow-x-auto my-6 rounded-lg border border-zinc-700"><table className="w-full text-left border-collapse" {...props} /></div>,
                        thead: ({node, ...props}) => <thead className="bg-zinc-900/80 text-blue-100" {...props} />,
                        th: ({node, ...props}) => <th className="p-3 border-b border-zinc-700 font-semibold text-xs uppercase tracking-wider" {...props} />,
                        td: ({node, ...props}) => <td className="p-3 border-b border-zinc-800/50 text-zinc-400 text-sm" {...props} />,

                        a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,

                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-zinc-400 my-4 bg-blue-900/10 py-2 rounded-r" {...props} />,

                        hr: ({node, ...props}) => <hr className="border-zinc-800 my-6" {...props} />
                      }}
                    >
                      {aiContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                     <Sparkles size={24} className="mb-2 opacity-20" />
                     <p className="text-sm italic">Enhancement in progress...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {article.references?.length > 0 && (
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <LinkIcon size={14} className="text-blue-500" />
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Source References
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {article.references.map((link, idx) => (
                <a key={idx} href={link} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-950/10 transition-all duration-200">
                  <span className="text-sm text-zinc-400 truncate group-hover:text-blue-400 transition-colors pr-4">{link}</span>
                  <ExternalLink size={14} className="text-zinc-600 group-hover:text-blue-400 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}