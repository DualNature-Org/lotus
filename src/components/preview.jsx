// Preview.jsx
import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import PreviewItem from './PreviewItem';
import NoPreview from './NoPreview';
import ReferenceList from './ReferenceList';


const ToolsHeader = ({ title }) => (
  <div className="flex items-center justify-between p-2 bg-zinc-900 border-b border-zinc-800">
    <h1 className="text-sm text-white font-medium">{'this is title'}</h1>
    
  </div>
);


const ToolsFooter = () => (
  <div className="flex items-center justify-between p-4 bg-teal-900 border-t border-zinc-800">
    <span className="text-sm text-zinc-400">Last edited 4 minutes ago</span>
    <div className="flex gap-2">
      <button className="p-2 text-zinc-400 hover:text-white">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        </svg>
      </button>
      {/* <button className="p-2 text-zinc-400 hover:text-white">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button> */}
      <button className="p-1.5 text-zinc-400 hover:text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
);

const Preview = ({ 
  previewConversations, 
  loading, 
  onDeletePreview, 
  onAddToConversation 
}) => {
  return (
    <div className="w-2/5 h-[calc(93vh-80px)] bg-teal-900/20 overflow-y-auto rounded-lg">
      {/* <ToolsHeader/> */}
      <ReferenceList />
      
      {previewConversations.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          {loading ? (
            <CircularProgress />
          ) : (
            <NoPreview />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {previewConversations.map((preview, index) => (
            <PreviewItem
              key={index}
              value={preview}
              index={index}
              onDelete={onDeletePreview}
            />
          ))}
          <div className="fixed bottom-20 right-8">
            <Button
              variant="contained"
              onClick={onAddToConversation}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add All to Conversation
            </Button>
          </div>
        </div>
      )}
    <ToolsFooter/>
    </div>
  );
};


export default Preview