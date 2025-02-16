import { server } from '../apiAdresses';

export default ()=>fetch(`${server}/healthCheck`, { method: 'POST' });
