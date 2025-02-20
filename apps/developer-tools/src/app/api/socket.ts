import { io } from 'socket.io-client';
import { socketAddress } from './apiAdresses';

export default io(socketAddress);
