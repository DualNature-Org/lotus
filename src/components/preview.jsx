// Preview.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import ReferenceList from './ReferenceList';
// import NoPreview from './NoPreview';

const NoPreview = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4">
        <svg
          className="w-full h-full text-teal-500/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-teal-100 mb-2">No Preview Available</h3>
      <p className="text-teal-200/70 max-w-sm">
        Select a tool from the sidebar to generate content or view existing tool responses.
      </p>
    </div>
  );
};

// export default NoPreview;

// Tool Response List Item
const ToolResponseItem = ({ toolName, response, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-teal-800 hover:bg-teal-800/30 transition-colors ${
        isActive ? 'bg-teal-800/50' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-teal-100 font-medium capitalize">
            {toolName}
          </h3>
          <p className="text-sm text-teal-300/70 mt-1">
            {Array.isArray(response) ? `${response.length} items` : 'View response'}
          </p>
        </div>
        <span className="text-teal-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      </div>
    </button>
  );
};

// Preview Component
const Preview = ({ 
  toolResponse,
  loading,
  onAddToConversation 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTool, setSelectedTool] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  
  // Handle initial and updated toolResponse
  useEffect(() => {
    if (toolResponse && Array.isArray(toolResponse) && toolResponse.length > 0) {
      const lastTool = toolResponse[toolResponse.length - 1];
      setSelectedTool(lastTool[0]);
      setPreviewContent(lastTool[1]);
      setIsExpanded(true);
    }
  }, [toolResponse]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToolSelect = (toolName, content) => {
    setSelectedTool(toolName);
    setPreviewContent(content);
    setIsExpanded(true);
  };

  const renderToolContent = () => {
    if (!selectedTool || !previewContent) return <NoPreview />;

    switch (selectedTool.toLowerCase()) {
      case 'references':
        return <ReferenceList toolResponse={previewContent} />;
      case 'outline':
        // Add your outline component here
        return <div className="p-4 text-teal-100">{JSON.stringify(previewContent, null, 2)}</div>;
      default:
        return (
          <div className="p-4 text-teal-100">
            {JSON.stringify(previewContent, null, 2)}
          </div>
        );
    }
  };

  const formatContentForConversation = (toolName, content) => {
    switch (toolName.toLowerCase()) {
      case 'references':
        return content.map(ref => (
          `Title: ${ref.title}
Authors: ${ref.authors.join(', ')}
Year: ${ref.year}
Publisher: ${ref.publisher}
`
        )).join('\n---\n');
      
      case 'outline':
        // Format outline content
        return JSON.stringify(content, null, 2);
      
      default:
        return JSON.stringify(content, null, 2);
    }
  };

  const handleAdd = () => {
    console.log('Handle Add clicked'); // Debug log
    console.log('Selected Tool:', selectedTool); // Debug log
    console.log('Preview Content:', previewContent); // Debug log
    
    if (!selectedTool || !previewContent) {
      console.log('Missing tool or content'); // Debug log
      return;
    }

    try {
      const formattedContent = formatContentForConversation(selectedTool, previewContent);
      console.log('Formatted Content:', formattedContent); // Debug log
      
      const message = {
        origin: 'lotus',
        content: `${selectedTool.toUpperCase()} Response:\n\n${formattedContent}`
      };
      
      console.log('Message to add:', message); // Debug log
      onAddToConversation(message);
    } catch (error) {
      console.error('Error formatting content:', error);
    }
  };

  return (
    <div className={`transition-all duration-300 ${
      isExpanded ? 'w-2/5' : 'w-auto'
    } h-[calc(93vh-10px)] bg-teal-900/20 overflow-hidden rounded-lg flex`}>
      
      {/* List of all tool responses */}
      <div className={`${
        isExpanded ? 'w-0 hidden' : 'w-64'
      } h-full border-r border-teal-800 overflow-y-auto`}>
        <div className="p-4 bg-teal-900/40 border-b border-teal-800">
          <h2 className="text-teal-100 font-medium">Tool Responses</h2>
        </div>
        <div className="divide-y divide-teal-800">
          {toolResponse && toolResponse.map(([toolName, content], index) => (
            <ToolResponseItem
              key={index}
              toolName={toolName}
              response={content}
              isActive={selectedTool === toolName}
              onClick={() => handleToolSelect(toolName, content)}
            />
          ))}
        </div>
      </div>

      {/* Main preview area */}
      <div className="flex-1 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-teal-900/40 border-b border-teal-800">
          <h2 className="text-teal-100 font-medium capitalize">
            {selectedTool || 'Preview'}
          </h2>
          <button
            onClick={toggleExpand}
            className="p-1.5 text-teal-300 hover:text-teal-100 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transform transition-transform ${isExpanded ? '' : 'rotate-180'}`}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <CircularProgress size={40} className="text-teal-500" />
            </div>
          ) : (
            renderToolContent()
          )}
        </div>

        {/* Footer */}
        {selectedTool && previewContent && (
          <div className="sticky bottom-0 w-full bg-teal-900/90 border-t border-teal-800 p-4 z-50">
            <div className="flex justify-end">
              <button
                onClick={() => handleAdd()}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors pointer"
              >
                Add to Conversation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Preview