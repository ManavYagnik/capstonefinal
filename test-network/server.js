const express = require('express');
const shell = require('shelljs');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/execute-command-0', (req, res) => {
  const command = './network.sh down';

  shell.exec(command, (code, stdout, stderr) => {
    
if (code !== 0) {
      return res.status(500).json({ error: 'Command execution failed', stderr });
    }
    res.json({ command, output: stdout });
 
 });
});


app.post('/execute-command-1', (req, res) => {
  const command = './network.sh up createChannel -c mychannel -ca';
  

  shell.exec(command, (code, stdout, stderr) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Command execution failed', stderr });
    }
    res.json({ command, output: stdout });
  });
});

app.post('/execute-command-2', (req, res) => {
  const command = './network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript';

  shell.exec(command, (code, stdout, stderr) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Command execution failed', stderr });
    }
    res.json({ command, output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
