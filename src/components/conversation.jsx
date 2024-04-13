import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Conversation = () => {
  const [systemPrompt, setSystemPrompt] = useState('Set a System Prompt (Optional)');
  const [userInput, setUserInput] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('Enter Claude\'s response...');
  const [conversations, setConversations] = useState([]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleAssistantResponse = (event) => {
    setAssistantResponse(event.target.value);
  };

  const handleAddMessage = () => {
    setConversations([
      ...conversations,
      { user: userInput, assistant: assistantResponse },
    ]);
    setUserInput('');
    setAssistantResponse('Enter Claude\'s response...');
  };

  return (
    <Box>
      <Box className="system-prompt">
        <TextField label="SYSTEM PROMPT" value={systemPrompt} InputProps={{ readOnly: true }} />
      </Box>
      <Box className="user-input">
        <TextField label="USER" value={userInput} onChange={handleUserInput} />
      </Box>
      <Box className="assistant-response">
        <TextField label="ASSISTANT" value={assistantResponse} onChange={handleAssistantResponse} multiline />
      </Box>
      <Box mt={2}>
        <Button variant="contained" onClick={handleAddMessage}>
          Add Messages
        </Button>
      </Box>
      {conversations.map((conv, index) => (
        <Box key={index} mt={2}>
          <Box>
            <TextField label="USER" value={conv.user} InputProps={{ readOnly: true }} />
          </Box>
          <Box mt={1}>
            <TextField label="ASSISTANT" value={conv.assistant} InputProps={{ readOnly: true }} multiline />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Conversation;