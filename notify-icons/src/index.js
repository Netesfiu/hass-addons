const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
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

// Playground UI (also served through the ingress panel)
app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }));

// Icon names for the playground's picker, fetched once and cached for a day
const ICON_META_URL = 'https://cdn.jsdelivr.net/npm/@mdi/svg/meta.json';
const ICON_CACHE_MS = 24 * 60 * 60 * 1000;
let iconNames = null;
let iconNamesAt = 0;

app.get('/icons', async (req, res, next) => {
  try {
    if (iconNames && Date.now() - iconNamesAt < ICON_CACHE_MS) {
      return res.json(iconNames);
    }
    const { data } = await axios.get(ICON_META_URL, { timeout: 20000 });
    iconNames = (Array.isArray(data) ? data : [])
      .filter((icon) => icon && icon.name && !icon.deprecated)
      .map((icon) => icon.name);
    iconNamesAt = Date.now();
    res.json(iconNames);
  } catch (err) {
    next(err);
  }
});

// Routes
app.use('/', mdiRoutes);

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
