import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT) || 3000;
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(currentDir, '../dist');
const projectsFile = path.resolve(currentDir, '../client/public/api/projects.json');

app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'okoume-digital' });
});

app.get('/api/projects', (_request, response) => {
  response.sendFile(projectsFile);
});

app.use(express.static(distDir));
app.get('*splat', (_request, response) => {
  response.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`OKOUME DIGITAL API listening on http://localhost:${port}`);
});
