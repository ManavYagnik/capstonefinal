import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [response, setResponse] = useState('');

  const sendCommand = async () => {
    try {
      const res = await axios.post('http://localhost:3001/execute-command-0');
      setResponse(`Output: ${res.data.output}`);
    } catch (error) {
      console.error(error);
      setResponse('Error executing command');
    }
  };
  
  const sendCommand1 = async () => {
    try {
      const res = await axios.post('http://localhost:3001/execute-command-1');
      setResponse(`Output: ${res.data.output}`);
    } catch (error) {
      console.error(error);
      setResponse('Error executing command');
    }
  };

  const sendCommand2 = async () => {
    try {
      const res = await axios.post('http://localhost:3001/execute-command-2');
      setResponse(`Output: ${res.data.output}`);
    } catch (error) {
      console.error(error);
      setResponse('Error executing command');
    }
  };

  return (
    <div>
    <div>
      <button onClick={sendCommand}>Send Command</button>
      <p>{response}</p>
    </div>
    <div>
    <button onClick={sendCommand1}>Send Command</button>
    <p>{response}</p>
  </div>
  <div>
  <button onClick={sendCommand2}>Send Command</button>
  <p>{response}</p>
</div>
</div>
  );
};

export default App;
