import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Query from '../components/Query';
import Conversations from '../components/Conversations';
import Preview from '../components/preview';
import ChatHeader from '../components/ChatHeader';
import { Document, Paragraph, Packer, Table, TableCell, TableRow } from 'docx';

export default function Home(){
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [chatTitle, setChatTitle] = useState('New Chat');
  const [isStarred, setIsStarred] = useState(false);
  const [previewConversations, setPreviewConversations] = useState([]);

  const handleStarChat = () => {
    setIsStarred(!isStarred);
    // Add any additional star functionality here
  };
  
  const handleViewContext = () => {
    // Add context viewing functionality here
  };

  const handleQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/lotus/response/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation,
          query,
        }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setPreviewConversations([...previewConversations, data.output]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  const handleAI = () => {
    const url = 'http://127.0.0.1:8000/lotus/ai/';
    const data = {
      conversation: conversation,
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
        setConversation(
          data['output']
        );
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleAddMessage = (text) => {
    setConversation([
      ...conversation,
      { origin: "lotus" ,index: 1 + conversation[conversation.length - 1], content: text },
    ]);
    setQuery('')
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

  const handleDeletePreview = (index) => {
    const updatedPreview = previewConversations.filter((_, i) => i !== index);
    setPreviewConversations(updatedPreview);
  };

  const downloadConversationAsDocx = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: conversation.flatMap(conv => {
          // Check if the conversation part resembles a table
          const isTable = conv.content.includes('|') && conv.content.includes('---');
          if (isTable) {
            // Split the table into rows
            const rows = conv.content.split('\n');
            // Remove in rows
            const validRows = rows.filter(row => row.trim() !== '' && !row.includes('---'));
            // Create table cells from the rows
            const tableCells = validRows.map(row => {
              const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
              return new TableRow({
                children: cells.map(cell => new TableCell({
                  children: [new Paragraph(cell)]
                }))
              });
            });
            // Create a table with the extracted cells
            return [new Table({
              rows: tableCells
            })];
          } else {
            // If not a table, create paragraphs
            const contentParts = conv.content.split('\n');
            return contentParts.map(contentPart => new Paragraph(contentPart));
          }
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
    <div className="h-screen bg-teal-950 text-white overflow-hidden ml-20">
      <ChatHeader 
        title={chatTitle}
        onDownload={downloadConversationAsDocx}
        onStarChat={handleStarChat}
        onViewContext={handleViewContext}
      />
      <div className="flex">
        <Conversations
          conversations={conversation}
          onDeleteConversation={handleDeleteConversation}
        />
        <Preview
          previewConversations={previewConversations}
          loading={loading}
          onDeletePreview={handleDeletePreview}
          onAddToConversation={handleAddToConversation}
        />
      </div>
      <Query
        query={query}
        onQueryChange={(e) => setQuery(e.target.value)}
        onSend={handleQuery}
        onAddMessage={handleAddMessage}
      />
    </div>
  );
};