import { serverAddress } from '../apiAdresses';

export default ()=>fetch(`${serverAddress}/healthCheck`, { method: 'POST' });
