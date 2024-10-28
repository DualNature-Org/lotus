import React, { useState } from 'react';

const Query = ({ query, onQueryChange, onSend, onAddMessage }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="sticky bottom-0 w-full flex justify-start">
      <div className="w-[60%] bg-[rgb(5,61,60)] rounded-t-xl shadow-lg">
        <div className="relative flex items-center p-4">
          {/* Left side icons inside input */}
          <div className="absolute left-6 flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors" onClick={() => onAddMessage(query)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
            </button>
          </div>

          {/* Textarea */}
          <div className={`relative flex-grow mx-12 ${isFocused ? 'ring-0' : ''}`}>
            <textarea
              value={query}
              onChange={onQueryChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message..."
              rows={1}
              className="w-full bg-transparent text-white placeholder-gray-400 border-none focus:outline-none focus:ring-0 resize-none py-2 px-2"
              style={{ minHeight: '20px', maxHeight: '80px' }}
            />
          </div>

          {/* Right side icons - Only show when there's content */}
          <div className="absolute right-6 flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
              </svg>
            </button>
            {query && (
              <button
                onClick={onSend}
                className="p-2 bg-green-600 hover:bg-green-700 rounded-full text-white transition-all duration-200 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Query;