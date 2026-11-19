const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mdiRoutes = require('./routes/mdi');
const { errorHandler } = require('./middleware/errorHandler');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Home Assistant ingress forwards requests with the full
// /api/hassio_ingress/<token> prefix (it does not strip it), so strip it here
// to keep the same routes reachable directly and through the ingress panel.
const INGRESS_PREFIX = /^\/api\/hassio_ingress\/[^/]+/;
app.use((req, res, next) => {
  const match = req.url.match(INGRESS_PREFIX);
  if (match) {
    req.url = req.url.slice(match[0].length) || '/';
  }
  next();
});

// Middleware
app.use(cors());
app.use(morgan('combined'));

// Routes
app.use('/', mdiRoutes);

// Landing page (shown in the Home Assistant ingress panel)
app.get('/', (req, res) => {
  const base = req.headers['x-ingress-path'] || '';
  res
    .status(200)
    .type('html')
    .send(
      `<!doctype html><html><head><meta charset="utf-8">` +
        `<title>Notify Icons</title></head><body ` +
        `style="font-family:sans-serif;padding:1rem 1.5rem;line-height:1.5">` +
        `<h2>Notify Icons</h2>` +
        `<p>Endpoint: <code>GET ${base}/mdi.png?icon=mdi:icon-name&amp;size=96</code></p>` +
        `<p><img alt="example" src="${base}/mdi.png?icon=mdi:weather-sunny&amp;size=128&amp;iconColor=black&amp;bgColor=rgba(255,191,0,1)&amp;bgShape=circle&amp;padding=15"></p>` +
        `<p><a href="${base}/health">health</a> · <a href="${base}/cache/stats">cache/stats</a></p>` +
        `</body></html>`
    );
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handler middleware (must be after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`MDI to PNG service available at http://0.0.0.0:${PORT}/mdi.png?icon=mdi:icon-name&size=96`);
});

module.exports = app;
