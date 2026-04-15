const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MCP Server</title>
</head>
<body>
  <h1>MCP Server</h1>
  <p>This is a minimal MCP server for the <code>githubcopilotcheck</code> workspace.</p>
  <p>POST JSON to <code>/mcp</code> and read the response.</p>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mcp-server' });
});

app.post('/mcp', (req, res) => {
  const payload = req.body || {};
  const { request, context } = payload;

  res.json({
    success: true,
    received: {
      request: request || null,
      context: context || null
    },
    message: 'MCP server received the payload.'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP server is running at http://localhost:${port}`);
});
