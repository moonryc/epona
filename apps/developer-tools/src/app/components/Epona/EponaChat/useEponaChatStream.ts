import { useState } from 'react';
import { useToggle } from 'react-use';



export const useEponaChatStream = (message:string) => {
  const [response, setResponse] = useState<string | undefined>();
  const [loading, toggleLoading] = useToggle(false)

  const streamResponse = async (resp: Response) => {
    if (!resp.body) {
      console.error('Response body is null.');
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();

    setResponse(undefined); // Clear response initially

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          toggleLoading(false)
          break;
        }
        //trims off the end of each message
        const text = decoder.decode(value, { stream: true }).replace(/\n/, '');
        // console.log('Received chunk:', text, text.split(''));

        setResponse((prev) => {
          if(!prev){
            return text
          }
          return prev + text;
        });
      }
    } catch (error) {
      console.error('Error reading stream:', error);
      toggleLoading(false)
    }
  };

  const sendMessage = async () => {
    try {
      setResponse('');
      toggleLoading(true)

      const response = await fetch(
        `http://localhost:3000/api/epona/streamChat`,
        {
          method: 'POST',
          body: JSON.stringify({ message }),
          headers: {
            'Content-Type': 'application/json', // Corrected content type
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await streamResponse(response);
    } catch (error) {
      console.error('Error sending message:', error);
      toggleLoading(false)
    }
  };

  return { response, sendMessage, loading } as const;
};
