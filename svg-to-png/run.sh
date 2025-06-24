#!/usr/bin/with-contenv bashio

# Print Home Assistant add-on banner
bashio::log.info "Starting SVG to PNG Converter add-on..."

# Change to app directory
cd /app || bashio::exit.nok "Failed to change directory to /app"

# Run the application
bashio::log.info "Starting SVG to PNG converter service..."
node src/index.js
