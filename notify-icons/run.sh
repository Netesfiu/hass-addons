#!/usr/bin/with-contenv bashio

# Print Home Assistant add-on banner
bashio::log.info "Starting Notify Icons..."

# Change to app directory
cd /app || bashio::exit.nok "Failed to change directory to /app"

# Run the application
bashio::log.info "Starting Notify Icons service..."
node src/index.js
