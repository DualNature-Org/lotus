import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './conversation.css'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextArea from './textarea';



function Conversation(){
  const [userInput, setUserInput] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('Enter Claude\'s response...');
  const [conversations, setConversations] = useState([]);

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAddMessage = () => {
    setConversations([
      ...conversations,
      { user: userInput},
    ]);
    setUserInput('');
    setAssistantResponse('Enter Lotus\'s response...');
  };

  return (
    <Box>
      <TextArea label='LOTUS' value={"Hi, I'm LOTUS."}/>
      {conversations.map((conv, index) => (
        <Box key={index} mt={2}>
        <TextArea label="LOTUS"/>
        </Box>
      ))}
      <Box className='querywrapper'>
      <Tooltip placement='left' title='Add Messages'>
        <IconButton>
          <PlaylistAddIcon onClick={handleAddMessage}/>
        </IconButton>
      </Tooltip>
      <TextField 
          className='query'
          label="Query"
          id="outlined-size-small"
          defaultValue="/"
          size="small"
          sx={{ width: '40vw' }}
        />
        <Button variant="text" endIcon={<SendIcon />}>
          Send
        </Button>
      
      </Box>
    </Box>
  );
};

export default Conversation;