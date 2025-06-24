const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mdiRoutes = require('./routes/mdi');
const { errorHandler } = require('./middleware/errorHandler');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('combined'));

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
