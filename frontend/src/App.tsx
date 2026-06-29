import { useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    // opens the socket when the app mounts so the backend sees this browser tab as one client
    socket.connect();

    return () => {
      // closes the socket on cleanup so reloads and unmounts do not leave stale connections
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Hide and Seek</h1>
    </div>
  );
}

export default App;
