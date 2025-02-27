import { useState, useEffect } from 'react';
import { eponaSocket } from '../api/socket';

interface BroadcastMessage {
  type: string;
  timestamp: string;
  message: string;
}

export const useEponaBroadcast = () => {
  const [isConnected, setIsConnected] = useState(eponaSocket.connected);
  const [broadcastMessages, setBroadcastMessages] = useState<BroadcastMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<BroadcastMessage | null>(null);

  useEffect(() => {
    // Connection status handlers
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // Broadcast message handler
    function onBroadcastMessage(message: BroadcastMessage) {
      setLastMessage(message);
      setBroadcastMessages(prev => [...prev, message]);
      
      // Optional: you might want to limit the number of stored messages
      // to prevent memory issues over time
      setBroadcastMessages(prev => 
        prev.length > 50 ? prev.slice(prev.length - 50) : prev
      );
    }

    // Register event listeners
    eponaSocket.on('connect', onConnect);
    eponaSocket.on('disconnect', onDisconnect);
    eponaSocket.on('broadcast', onBroadcastMessage);

    // Clean up event listeners on unmount
    return () => {
      eponaSocket.off('connect', onConnect);
      eponaSocket.off('disconnect', onDisconnect);
      eponaSocket.off('broadcast', onBroadcastMessage);
    };
  }, []);

  // Function to clear the broadcast message history
  const clearBroadcastMessages = () => {
    setBroadcastMessages([]);
    setLastMessage(null);
  };

  return {
    isConnected,
    broadcastMessages,
    lastMessage,
    clearBroadcastMessages
  };
};

export default useEponaBroadcast; 