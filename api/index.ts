import app from '../server';

export default function handler(req: any, res: any) {
  try {
    // Restore original request path if Vercel rewrite stripped it to /api
    const matchedPath = (req.headers && req.headers['x-matched-path']) as string;
    if (matchedPath && matchedPath.startsWith('/api') && req.url === '/api') {
      req.url = matchedPath;
    }
    return app(req, res);
  } catch (err: any) {
    console.error('Unhandled Vercel serverless function error:', err);
    if (res && typeof res.status === 'function') {
      return res.status(500).json({
        error: 'Error interno en el servidor de autenticación.'
      });
    }
  }
}
