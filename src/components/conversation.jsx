import React, { useState } from 'react';
import './conversation.css';

import { Box, TextField, Button, CircularProgress } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import SendIcon from '@mui/icons-material/Send';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import ReferenceIcon from '@mui/icons-material/Plagiarism';
import PptIcon from '@mui/icons-material/Slideshow';
import FileAttachIcon from '@mui/icons-material/FilePresent';

import TextArea from './textarea';
import Preview from './preview';
import NoPreview from './nopreview';

import { Document, Packer, Paragraph } from 'docx';


function Conversation() {
  // const [userInput, setUserInput] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false); 
  // const [assistantResponse, setAssistantResponse] = useState("Enter Claude's response...");
  const [conversation, setConversation] = useState([]);
  const [previewConversations, setPreviewConversations] = useState([
  ]);

  const [preview, setPreview] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const updateQuery = (event) => {
    setQuery(event.target.value);
  };

  const updatePreview = (event) => {
    setPreview(event.target.value)
  };

  const handleQuery = () => {
    const url = 'https://dualnature.xyz/lotus/response/';

    const data = {
      conversation: conversation,
      query: query,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    setLoading(true);

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPreviewConversations([
          ...previewConversations,
          data['output'],
        ]);
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddMessage = (text) => {
    setConversation([
      ...conversation,
      { origin: "user" ,index: 1 + conversation[conversation.length - 1], content: text },
    ]);
  };

  const handleAddToConversation = () => {
    setConversation([...conversation, ...previewConversations.map((text, index) => ({
      origin: "lotus",
      index: conversation.length + index + 1,
      content: text,
    }))]);
    setPreviewConversations([]); 
  };

  const handleDeleteConversation = (index) => {
    const updatedConversation = conversation.filter((_, i) => i !== index);
    setConversation(updatedConversation);
  };

  const downloadConversationAsDocx = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: conversation.flatMap(conv => {
          const contentParts = conv.content.split('\n');
          return contentParts.map(contentPart => new Paragraph(contentPart));
        })
      }]
    });
  
    // Convert the document to a buffer
    Packer.toBlob(doc).then((blob) => {
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
  
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'conversation.docx';
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    });
  };

  return (
    <>
      <div className='conversation-container'>
        <div className='option-bar'>
          <Tooltip placement='right' title='Download Conversation as Docs'>
            <IconButton onClick={downloadConversationAsDocx}>
              <DownloadIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
          <Tooltip placement='right' title='Search for References'>
            <IconButton >
              <ReferenceIcon style={{color: 'white'}} />
            </IconButton>
          </Tooltip>
          <Tooltip placement='right' title='Create Presentation'>
            <IconButton >
              <PptIcon style={{color: 'white'}} />
            </IconButton>
          </Tooltip>
          <Tooltip placement='right' title='Create Presentation'>
            <IconButton >
              <PptIcon style={{color: 'white'}} />
            </IconButton>
          </Tooltip>
        </div>

        <Box className='conversation'>
          <Box sx={{ flex: '1', textAlign: 'left' }}>
            {conversation.map((conv, index) => (
              <TextArea label='LOTUS' key={index} mt={2} value={conv.content} writingEffect={true} 
              index={index}
              handleDeleteConversation={handleDeleteConversation}
              />
            ))}
          </Box>
        </Box>

        <Box className='preview-bar' sx={{ width: '40%', height: "90vh", overflow: 'scroll', backgroundColor: "rgba(235, 229, 232, 0.2)", padding: "1rem" }}>
          
          {
            previewConversations.length === 0 && (
              <div className='loading-section'>
                <NoPreview />

                {loading && <CircularProgress />}
              </div>
            )
          }
          {previewConversations.map((preview, index) => (
            <div key={index}>
               <Preview
                label='Preview'
                mt={2}
                value={preview}
                writingEffect={true}
              />
            </div>
          ))}
          {
            previewConversations.length != 0 && (
              <Button variant='outlined' style={{ backgroundColor: "blue", color: "white", position: 'absolute', bottom: '2rem' }} onClick={handleAddToConversation}>
                Add All to Conversation
              </Button>
            )
          }
        </Box>
      </div>

      <Box className='querywrapper'>
        <Tooltip placement='left' title='Add Messages'>
          <IconButton>
            <PlaylistAddIcon style={{color: 'white'}} onClick={() => handleAddMessage(query)} />
          </IconButton>
        </Tooltip>
        <TextField
          className='query'
          label='Query'  
          id='outlined-size-small'
          color='error'
          multiline
          maxRows={3} 
          style={{ backgroundColor: 'grey'}}
          defaultValue='/'
          size='small'
          sx={{ width: '40vw', borderRadius: "8px" }}
          InputLabelProps={{ style: { color: 'white' } }}
          onChange={updateQuery}
        />
        <Button variant='text' endIcon={<SendIcon />} value={query} onClick={handleQuery}>
          Send
        </Button>
      </Box>
    </>

  );
}

export default Conversation;

