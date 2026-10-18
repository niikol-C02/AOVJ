import app from '../server';

export default function handler(req: any, res: any) {
  // Restore original request path if Vercel rewrite stripped it to /api
  const matchedPath = (req.headers && req.headers['x-matched-path']) as string;
  if (matchedPath && matchedPath.startsWith('/api') && req.url === '/api') {
    req.url = matchedPath;
  }
  return app(req, res);
}
