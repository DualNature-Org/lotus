import React, { useEffect, useRef, useState } from 'react';

const TextArea = ({ value, origin, index, handleDeleteConversation }) => {
  const textAreaRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typing effect for Lotus messages
  useEffect(() => {
    if (origin === 'lotus') {
      setDisplayedText('');
      setIsTypingComplete(false);
      let currentIndex = 0;
      const text = value;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(prev => prev + text[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText(value);
      setIsTypingComplete(true);
    }
  }, [value, origin]);

  // Auto-resize textarea
  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textAreaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };
    adjustHeight();
  }, [displayedText]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value);
  };

  const handleRetryClick = () => {
    // Implement retry logic
    console.log('Retry message');
  };

  const handleHideClick = () => {
    handleDeleteConversation(index);
  };

  return (
    <div className="mb-6 max-w-4xl">
      <div className={`relative group ${origin === 'user' ? 'ml-auto' : 'mr-auto'} max-w-2xl`}>
        {/* Message Container */}
        <div
          className={`relative rounded-lg p-4 mb-2 ${
            origin === 'user'
              ? 'bg-teal-950 ml-auto'
              : 'bg-teal-900/50 mr-auto'
          }`}
        >
          {/* Origin Label */}
          {/* <div className="absolute -top-5 left-4 text-xs text-gray-400 font-medium">
            {origin === 'user' ? 'You' : 'Lotus'}
          </div> */}

          {/* Textarea */}
          <textarea
            ref={textAreaRef}
            value={displayedText}
            readOnly
            className={`w-full bg-transparent text-white resize-none focus:outline-none ${
              origin === 'lotus' ? 'min-h-[2rem]' : ''
            }`}
            style={{
              overflow: 'hidden',
            }}
          />

          {/* Typing indicator for Lotus */}
          {origin === 'lotus' && !isTypingComplete && (
            <div className="absolute bottom-2 right-2 flex gap-1">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></div>
            </div>
          )}
        </div>

        {/* Action Buttons - Now always on right side */}
        <div className={`flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out`}>
          {origin === 'lotus' ? (
            // Lotus message actions
            <>
              <button
                onClick={handleRetryClick}
                className="p-1.5 hover:bg-teal-900 rounded-md text-gray-400 hover:text-white transition-colors"
                title="Retry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <button
                onClick={handleCopyClick}
                className="p-1.5 hover:bg-teal-900 rounded-md text-gray-400 hover:text-white transition-colors"
                title="Copy response"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
              </button>
              <button
                onClick={handleHideClick}
                className="p-1.5 hover:bg-teal-900 rounded-md text-gray-400 hover:text-white transition-colors"
                title="Hide in chain"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </>
          ) : (
            // User message actions
            <button
              onClick={handleHideClick}
              className="p-1.5 hover:bg-teal-900 rounded-md text-gray-400 hover:text-white transition-colors"
              title="Delete message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextArea;