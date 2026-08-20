import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 4003;
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'dist', req.url);
  
  // Helper function to check if any JS files exist in dist/static/js
  const isBuildComplete = () => {
    const jsDir = path.join(__dirname, 'dist', 'static', 'js');
    if (!fs.existsSync(jsDir)) return false;
    const files = fs.readdirSync(jsDir);
    return files.some(f => f.endsWith('.js') && !f.startsWith('async'));
  };
  
  // For root path, try to serve index.html
  if (req.url === '/') {
    // Check if the build is complete by looking for any JS bundle
    if (!isBuildComplete()) {
      // Build incomplete, serve loading page
      const loadingPath = path.join(__dirname, 'loading.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(loadingPath));
      return;
    }
    filePath = path.join(__dirname, 'dist', 'index.html');
  }
  
  // If file exists and is a file, serve it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    let contentType = 'text/plain';
    
    if (ext === '.html') contentType = 'text/html';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
    else if (ext === '.json') contentType = 'application/json';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.woff2') contentType = 'font/woff2';
    else if (ext === '.woff') contentType = 'font/woff';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    // If it's a directory, try to serve index.html from that directory
    let indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(indexPath));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } else {
    // For SPA, serve index.html for any unmatched routes
    let indexPath = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(indexPath));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
