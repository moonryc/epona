import { server } from '../apiAdresses';

export const eponaChat= (data:{message: string})=>fetch(`${server}/epona/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const chatStream = (message:string)=> fetch(`http://localhost:3000/api/epona/streamChat`, {
  method: "POST",
  body: JSON.stringify({ message }),
  headers: {
    'Content-Type': 'application/json' // Corrected content type
  }
});
