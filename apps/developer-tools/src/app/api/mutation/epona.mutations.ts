import { server } from '../apiAdresses';

export const eponaChat= (data:{message: string})=>fetch(`${server}/epona/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
