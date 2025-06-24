ARG BUILD_FROM=ghcr.io/hassio-addons/base:14.0.0
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install Node.js and dependencies
RUN apk add --no-cache nodejs npm

# Create app directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy app source
COPY src/ ./src/

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy run script
COPY run.sh /
RUN chmod a+x /run.sh

# Run the application
CMD ["/run.sh"]
