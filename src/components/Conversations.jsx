// Conversations.jsx
import React from 'react';
import { Box } from '@mui/material';
import TextArea from './textarea';

const Conversations = ({ conversations, onDeleteConversation }) => {
  return (
    <div className="ml-2 w-3/5 h-[calc(100vh-80px)] overflow-y-auto p-4">
      <Box className="space-y-4">
        {conversations.map((conv, index) => (
          <TextArea
            key={index}
            label="LOTUS"
            value={conv.content}
            writingEffect={true}
            index={index}
            origin={"lotus"}
            handleDeleteConversation={onDeleteConversation}
          />
        ))}
      </Box>
    </div>
  );
};

export default Conversations