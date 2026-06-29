import { io, Socket } from "socket.io-client";

// creates one socket instance so the app reuses the same connection instead of opening duplicates
export const socket: Socket = io("http://localhost:3000", {
  // waits for react to connect manually so setup and cleanup stay inside the component lifecycle
  autoConnect: false,
});
