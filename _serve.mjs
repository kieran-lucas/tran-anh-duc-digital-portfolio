import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const types = {
  '.html':'text/html',
  '.css':'text/css',
  '.js':'application/javascript',
  '.png':'image/png',
  '.webp':'image/webp',
  '.svg':'image/svg+xml',
  '.ttf':'font/ttf',
  '.json':'application/json',
};

const root = 'dist';
const server = createServer(async (req, res) => {
  try {
    let url = req.url.split('?')[0];
    if (url === '/') url = '/index.html';
    const p = join(root, url);
    const data = await readFile(p);
    res.writeHead(200, { 'Content-Type': types[extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end(String(e));
  }
});
server.on('error', (e) => { console.error('SERVER ERR', e.message); process.exit(1); });
server.listen(5180, '127.0.0.1', () => console.log('listening 5180'));
