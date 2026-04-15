# githubcopilotcheck MCP Server

This workspace now includes a minimal MCP server implementation.

## Files added

- `package.json` — Node.js package manifest
- `server.js` — Express-based MCP server
- `.gitignore` — ignores `node_modules`

## Run the server

```bash
npm install
npm start
```

## Endpoints

- `GET /` — basic landing page
- `GET /health` — health check
- `POST /mcp` — receive a JSON payload and echo it back

Example request:

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"request":"Hello","context":{"source":"test"}}'
```
