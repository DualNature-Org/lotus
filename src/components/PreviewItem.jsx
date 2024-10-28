// PreviewItem.jsx
import React from 'react';
import { Paper, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PreviewItem = ({ value, index, onDelete }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Paper 
      elevation={3} 
      className="bg-gray-700 text-gray-100 p-4 rounded-lg relative group"
    >
      {/* Preview Content */}
      <div className="min-h-[50px] whitespace-pre-wrap">
        {value}
      </div>

      {/* Action Buttons - Only visible on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip title="Copy">
          <IconButton 
            size="small" 
            onClick={handleCopy}
            className="text-gray-300 hover:text-white mr-1"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton 
            size="small" 
            onClick={() => onDelete(index)}
            className="text-gray-300 hover:text-red-400"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>

      {/* Preview Number */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        Preview {index + 1}
      </div>
    </Paper>
  );
};

export default PreviewItem