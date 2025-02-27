import { useState, useCallback, useEffect } from 'react';
import { eponaSocket } from '../api/socket';

interface ChatResponse {
  content: string;
}

interface ChatCompleteResponse {
  success: boolean;
  fullResponse: string;
}

interface ChatErrorResponse {
  success: boolean;
  message: string;
}

export const useEponaChat = () => {
  const [isConnected, setIsConnected] = useState(eponaSocket.connected);
  const [message, setMessage] = useState('');
  const [responseStream, setResponseStream] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullResponse, setFullResponse] = useState<string | null>(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatResponse(response: ChatResponse) {
      setResponseStream(prev => [...prev, response.content]);
    }

    function onChatComplete(response: ChatCompleteResponse) {
      setFullResponse(response.fullResponse);
      setIsLoading(false);
    }

    function onChatError(err: ChatErrorResponse) {
      setError(err.message);
      setIsLoading(false);
    }

    eponaSocket.on('connect', onConnect);
    eponaSocket.on('disconnect', onDisconnect);
    eponaSocket.on('chatResponse', onChatResponse);
    eponaSocket.on('chatComplete', onChatComplete);
    eponaSocket.on('chatError', onChatError);

    return () => {
      eponaSocket.off('connect', onConnect);
      eponaSocket.off('disconnect', onDisconnect);
      eponaSocket.off('chatResponse', onChatResponse);
      eponaSocket.off('chatComplete', onChatComplete);
      eponaSocket.off('chatError', onChatError);
    };
  }, []);

  const sendMessage = useCallback((messageText: string) => {
    setIsLoading(true);
    setError(null);
    setResponseStream([]);
    setFullResponse(null);
    setMessage(messageText);

    // Emit the chat message to the server
    eponaSocket.emit('chat', { message: messageText });
  }, []);

  const resetChat = useCallback(() => {
    setResponseStream([]);
    setFullResponse(null);
    setError(null);
    setMessage('');
  }, []);

  return {
    isConnected,
    message,
    responseStream,
    isLoading,
    error,
    fullResponse,
    sendMessage,
    resetChat
  };
};

export default useEponaChat; 