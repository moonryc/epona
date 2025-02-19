import { useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { server } from '../api/apiAdresses';

const socket = io(server)

export const useChat = () => {
  const queryClient = useQueryClient();

  // Fetch initial messages (Mock API, replace with actual fetch if needed)
  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: () => [], // Replace with API call if messages need to be preloaded
  });

  // Listen for new messages
  useEffect(() => {
    socket.on('message', (newMessage) => {
      queryClient.setQueryData(['messages'], (old: any) => [...(old || []), newMessage]);
    });

    return () => {
      socket.off('message'); // Cleanup on unmount
    };
  }, [queryClient]);

  // Mutation to send a message
  const sendMessage = useMutation({
    mutationFn: (message: { sender: string; text: string }) => {
      socket.emit('message', message);
    },
  });

  return { messages, sendMessage };
};
