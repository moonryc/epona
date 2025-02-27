import React, { useState } from 'react';
import useEponaChat from '../hooks/useEponaChat';

const EponaChatExample: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { 
    isConnected, 
    responseStream, 
    isLoading, 
    error, 
    fullResponse, 
    sendMessage, 
    resetChat 
  } = useEponaChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4 flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg min-h-[300px] mb-4">
        {responseStream.length > 0 ? (
          <div>
            {responseStream.map((response, index) => (
              <span key={index}>{response}</span>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            {isLoading ? 'Waiting for response...' : 'No messages yet'}
          </div>
        )}

        {error && (
          <div className="text-red-500 mt-2">{error}</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
          disabled={isLoading || !inputMessage.trim()}
        >
          Send
        </button>
        <button
          type="button"
          onClick={resetChat}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default EponaChatExample; 