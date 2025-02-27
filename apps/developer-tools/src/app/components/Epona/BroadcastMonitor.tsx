import React from 'react';
import useEponaBroadcast from '../../hooks/useEponaBroadcast';

// Custom function to format relative time
const getRelativeTimeString = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 5) {
    return 'just now';
  }
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  const days = Math.floor(diffInSeconds / 86400);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};

interface BroadcastMonitorProps {
  maxDisplayMessages?: number; // Optional prop to control how many messages to show
}

export const BroadcastMonitor: React.FC<BroadcastMonitorProps> = ({ 
  maxDisplayMessages = 5 // Default to showing the 5 most recent messages
}) => {
  const { 
    isConnected, 
    broadcastMessages, 
    lastMessage, 
    clearBroadcastMessages 
  } = useEponaBroadcast();

  // Get the most recent messages, limited by maxDisplayMessages
  const recentMessages = broadcastMessages
    .slice(-maxDisplayMessages)
    .reverse(); // Show newest first

  return (
    <div className="broadcast-monitor p-4 border rounded-lg shadow-sm bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Epona Broadcast Monitor</h3>
        <div className="flex items-center">
          <span className="mr-2">Status:</span>
          {isConnected ? (
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
              Connected
            </span>
          ) : (
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
              Disconnected
            </span>
          )}
        </div>
      </div>

      {broadcastMessages.length > 0 ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">
                {broadcastMessages.length} total messages received
              </div>
              <button 
                onClick={clearBroadcastMessages}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="broadcast-messages">
            {recentMessages.map((msg, index) => (
              <div 
                key={`${msg.timestamp}-${index}`} 
                className="message-item mb-3 p-3 bg-white rounded border"
              >
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span className="font-medium">{msg.type}</span>
                  <span title={new Date(msg.timestamp).toLocaleString()}>
                    {getRelativeTimeString(msg.timestamp)}
                  </span>
                </div>
                <div className="message-content">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-gray-500 text-center py-8">
          No broadcast messages received yet
        </div>
      )}
    </div>
  );
};

export default BroadcastMonitor; 