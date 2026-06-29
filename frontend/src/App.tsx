import { useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  useEffect(() => {
      // sends the first client event only after socket.io confirms the connection exists
      const handleConnect = () => {
        console.log("client connected:", socket.id);
        socket.emit("ping", "hello from client");
      };

      // receives the server reply so we can prove the event path works in both directions
      const handlePong = (message: string) => {
        console.log("pong from server:", message);
      };

      socket.on("connect", handleConnect);
      socket.on("pong", handlePong);
      socket.connect();

      return () => {
        // removes listeners before disconnecting so reloads do not duplicate event handlers
        socket.off("connect", handleConnect);
        socket.off("pong", handlePong);
        socket.disconnect();
      };
    }, []);

export default App;
