import { io } from 'socket.io-client';
import { socketAddress } from './apiAdresses';

// Default socket connection for general messages
export const defaultSocket = io(socketAddress);

// Epona-specific socket connection
export const eponaSocket = io(`${socketAddress}/epona`);

export default defaultSocket;
