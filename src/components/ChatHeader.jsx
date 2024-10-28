import React from 'react';

const ChatHeader = ({ onDownload, onStarChat, onViewContext, title = "New Chat" }) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-teal-950">
      <h1 className="text-md text-white truncate">
        {title}
      </h1>
      
      <div className="flex items-center gap-3">
        {/* Download Icon */}
        <button 
          onClick={onDownload}
          className="p-2 text-teal-100 hover:text-white hover:bg-teal-800 rounded-lg transition-colors"
          title="Download chat"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        
        {/* Star Icon */}
        <button 
          onClick={onStarChat}
          className="p-2 text-teal-100 hover:text-white hover:bg-teal-800 rounded-lg transition-colors"
          title="Star chat"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
        
        {/* Eye Icon */}
        <button 
          onClick={onViewContext}
          className="p-2 text-teal-100 hover:text-white hover:bg-teal-800 rounded-lg transition-colors"
          title="View context"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>

        </button>
      </div>
    </div>
  );
};

export default ChatHeader;