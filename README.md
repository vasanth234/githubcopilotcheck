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
- `POST /login` — SQL-backed login using SQLite
- `POST /mcp` — receive a JSON payload and echo it back

### Login example

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

The server uses a local SQLite database file named `users.db` and seeds a default user on first startup.
